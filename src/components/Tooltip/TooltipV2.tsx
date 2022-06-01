import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const TooltipV2 = ({ infoText, children }: any) => {
  const renderTooltip = (props: any) => (
    <Tooltip {...props}>{infoText}</Tooltip>
  );

  return (
    <div className='ToolTip'>
      <OverlayTrigger
        placement='bottom'
        overlay={renderTooltip}
        trigger={["hover", "hover"]}
      >
        {children}
      </OverlayTrigger>
    </div>
  );
};

export default TooltipV2;
