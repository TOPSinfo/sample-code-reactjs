import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { addDoumetationUrl } from "modules/actions";
import { getDocumentUrlFirebase } from "modules/utils/Firebase/Documentation";

export const fetchDocumentationUrl = function* (): SagaIterator {
  try {
    const url = yield call(getDocumentUrlFirebase);
    yield put(addDoumetationUrl(url));
  } catch (e) {
    console.error(String(e))
  }
};
