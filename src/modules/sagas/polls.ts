import { SagaIterator } from "redux-saga";
import { call, put, select, take, all, cancel, fork } from "redux-saga/effects";
import {
  setPollsList,
  setPollsCreatedForm,
  togglePollModalLoading,
  handleEditPollFormModal,
  closeDeleteModal,
  fetchPolls,
  resetOrganizationData,
  removePollListner
} from "modules/actions";
import { toast } from "react-toastify";
import * as selectors from "modules/selectors";
import { getPollsList } from "modules/utils/Firebase/Polls/polls";
import { ISagaAction } from "modules/types";
import set from "lodash/set";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import firebase from "firebase/app";

export const fetchPollListListner = function* (): SagaIterator {
  while (yield take(fetchPolls)) {
    const connectionTask = yield fork(fetchPollsSaga);

    yield take([removePollListner, resetOrganizationData]);
    yield cancel(connectionTask);
  }
};
export const fetchPollsSaga = function* (): SagaIterator {
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const channel = yield call(getPollsList, organizationId);
    while (true) {
      const result = yield take(channel);
      if (result && typeof result === "object") {
        yield put(setPollsList(result));
      } else {
        yield put(setPollsList([]));
      }
    }
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const createPollFormSaga = function* (): SagaIterator {
  try {
    try {
      const currentForm = yield select(selectors.getInitialTypeFormData);
      const organizationId = yield select(selectors.getOrganizationId);
      // firebase.functions().useFunctionsEmulator("http://localhost:5001");
      const createTypeform = firebase
        .functions()
        .httpsCallable(currentForm.id ? "editTypeform" : "createTypeform");
      try {
        yield put(togglePollModalLoading(true));
        const response = yield call(createTypeform, {
          form: currentForm,
          organizationId
        });
        if (response && response.data && response.data.error) {
          yield put(togglePollModalLoading(false));
          toast.error(response.data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
        }
        // else if (response && response.data && response.data.message) {
        //   yield put(togglePollModalLoading(false));
        //   toast.success(response.data.message, {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 3000
        //   });
        // } 
        else {
          toast.success("Polls Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
          yield all([
            put(togglePollModalLoading(false)),
            put(handleEditPollFormModal(false))
          ]);
        }
      } catch (e) {
        yield put(togglePollModalLoading(false));
        console.log(e);
        toast.error(e.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
      }
    } catch (e) {
      console.warn(e);
    }
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const deletePollFormSaga = function* (): SagaIterator {
  try {
    try {
      const currentForm = yield select(selectors.getSelectedRow);
      const organizationId = yield select(selectors.getOrganizationId);
      // firebase.functions().useFunctionsEmulator("http://localhost:5001");
      const deleteTypeForm = firebase
        .functions()
        .httpsCallable("deleteTypeform");
      try {
        yield put(togglePollModalLoading(true));
        const response = yield call(deleteTypeForm, {
          form: currentForm,
          organizationId
        });
        yield put(closeDeleteModal());
        if (response && response.data && response.data.error) {
          yield put(togglePollModalLoading(false));
          toast.error(response.data.error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
        } else if (response && response.data && response.data.message) {
          yield put(togglePollModalLoading(false));
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
        } else {
          yield all([
            put(togglePollModalLoading(false)),
            put(handleEditPollFormModal(false))
          ]);
        }
      } catch (e) {
        yield put(togglePollModalLoading(false));
        toast.error(e.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
      }
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      console.warn(e);
    }
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const initializeNewForm = function* (
  action: ISagaAction<any>
): SagaIterator {
  if (action.payload) {
    yield put(
      setPollsCreatedForm({
        title: "",
        type: "form",
        fields: []
      })
    );
  }
};
export const handleFieldValueSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  if (action.payload) {
    const currentForm = yield select(selectors.getInitialTypeFormData);
    const form = cloneDeep(currentForm);
    set(form, action.payload.fieldPath, action.payload.value);
    yield put(setPollsCreatedForm(form));
  }
};
export const removeMultipleChoiceSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  if (action.payload) {
    try {
      const currentForm = yield select(selectors.getInitialTypeFormData);
      const form = cloneDeep(currentForm);
      get(form, action.payload.fieldPath, []).splice(
        action.payload.choiceIndex,
        1
      );
      yield put(setPollsCreatedForm(form));
    } catch (e) {
      console.error(String(e));
    }
  }
};
export const addNewQuestionSaga = function* (): SagaIterator {
  const currentForm = yield select(selectors.getInitialTypeFormData);
  const form = cloneDeep(currentForm);
  if (!form.fields) {
    form.fields = [];
  }
  form.fields.push({
    title: "",
    type: "opinion_scale",
    properties: {
      description: "",
      labels: {
        center: "",
        left: "",
        right: ""
      },
      start_at_one: false,
      steps: 10
    },
    validations: {
      required: false
    }
  });
  yield put(setPollsCreatedForm(form));
};
export const changeQuestionSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  const currentForm = yield select(selectors.getInitialTypeFormData);
  const form = cloneDeep(currentForm);
  if (action.payload.data.value === "opinion_scale") {
    form.fields[action.payload.index] = {
      title: "",
      type: "opinion_scale",
      properties: {
        description: "",
        labels: {
          center: "",
          left: "",
          right: ""
        },
        start_at_one: false,
        steps: 10
      },
      validations: {
        required: false
      }
    };
  } else if (action.payload.data.value === "multiple_choice") {
    form.fields[action.payload.index] = {
      title: "",
      type: "multiple_choice",
      properties: {
        description: "",
        allow_multiple_selection: true,
        allow_other_choice: false,
        choices: [
          {
            label: ""
          }
        ],
        randomize: true,
        vertical_alignment: true
      },
      validations: {
        required: false
      }
    };
  } else if (action.payload.data.value === "ranking") {
    form.fields[action.payload.index] = {
      title: "",
      type: "ranking",
      properties: {
        description: "",
        allow_multiple_selection: false,
        choices: [
          {
            label: ""
          }
        ],
        randomize: true
      },
      validations: {
        required: false
      }
    };
  }
  yield put(setPollsCreatedForm(form));
};
