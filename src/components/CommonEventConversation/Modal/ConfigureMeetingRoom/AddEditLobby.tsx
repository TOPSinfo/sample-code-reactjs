import React, { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import HeaderInfo from "./HeaderInfo";
import Keynotes from "./Keynotes";
import SocialTags from "./SocialTags";
import GeneralLobby from "./GeneralLobby";
import SponsorsHall from "./SponsorsHall";
export const AddEditLobby = ({
  currentEvent,
  activeKey,
  changeActiveKey
}: any) => {
  useEffect(() => changeActiveKey("0"), [changeActiveKey]);
  return (
    <div className='configuration-tab'>
      <Tabs
        defaultActiveKey={"0"}
        activeKey={activeKey || "0"}
        onSelect={(key) => changeActiveKey(key)}
        id='controlled-tab-example'
      >
        <Tab eventKey={"0"} title='General'>
          <GeneralLobby />
        </Tab>
        <Tab eventKey={"1"} title='Header'>
          <HeaderInfo />
        </Tab>
        <Tab eventKey={"2"} title='Keynotes'>
          <Keynotes currentEvent={currentEvent} />
        </Tab>
        <Tab eventKey={"3"} title='Social'>
          <SocialTags />
        </Tab>
        <Tab eventKey={"4"} title='Sponsors Hall'>
          <SponsorsHall />
        </Tab>
      </Tabs>
    </div>
  );
};
export default AddEditLobby;
