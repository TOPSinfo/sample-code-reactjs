import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import info from "assets/img/icons/ic-info.svg";

export const ToolTip = ({ infoText }: any) => {
  const renderTooltip = (props: any) => (
    <Tooltip {...props}>{infoText}</Tooltip>
  );

  return (
    <div className='ToolTip'>
      <OverlayTrigger placement='bottom' overlay={renderTooltip}>
        <img src={info} alt='info' />
      </OverlayTrigger>
    </div>
  );
};

export default Tooltip;
