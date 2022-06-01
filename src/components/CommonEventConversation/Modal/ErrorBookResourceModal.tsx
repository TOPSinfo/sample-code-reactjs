import React from "react";
import { UIModal, UIButton, UIModalFooter, UILabel } from "@theme";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { setDebugModalState } from "modules/actions";
import map from "lodash/map";
interface DebugModalProps {
  title: string;
}
export const ErrorBookResourceModal = ({ title }: DebugModalProps) => {
  const debugModalState = useSelector(selectors.getDebugModalState);
  const errorEventState = useSelector(selectors.getCreateEventErrorState);

  const dispatch = useDispatch();
  const ActionButton = (
    <UIModalFooter buttonAlignments='center'>
      <UIButton
        label='Close'
        onClick={() => dispatch(setDebugModalState(false))}
      />
    </UIModalFooter>
  );

  return (
    <UIModal
      show={debugModalState}
      onHide={() => dispatch(setDebugModalState(false))}
      footer={ActionButton}
    >
      <h2 className='center text-center mb-4'>{title}</h2>
      <div>
        {map(errorEventState, (value: string, key: string) => {
          return value.length > 0 && <UILabel key={key} value={value} />;
        })}
      </div>
    </UIModal>
  );
};
export default ErrorBookResourceModal;
