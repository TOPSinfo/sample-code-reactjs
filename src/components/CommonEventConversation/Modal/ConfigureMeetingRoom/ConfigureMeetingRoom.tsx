import React, { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Session from "./Session";
import Attendees from "./Attendees";
import Content1 from "./Content1";

export const ConfigureMeetingRoom = ({
  externalRTMPCheck,
  activeKey,
  changeActiveKey
}: any) => {
  useEffect(() => changeActiveKey("0"), [changeActiveKey]);
  return (
    <div className='configuration-tab'>
      <Tabs
        defaultActiveKey={"0"}
        activeKey={activeKey || "0"}
        id='controlled-tab-example'
        onSelect={(eventKey) => changeActiveKey(eventKey)}
      >
        <Tab eventKey={"0"} title='Session'>
          <Session externalRTMPCheck={externalRTMPCheck} />
        </Tab>
        <Tab eventKey={"1"} title='Attendees'>
          <Attendees />
        </Tab>
        <Tab eventKey={"2"} title='Content'>
          <Content1 />
        </Tab>
      </Tabs>
    </div>
  );
};
export default ConfigureMeetingRoom;
