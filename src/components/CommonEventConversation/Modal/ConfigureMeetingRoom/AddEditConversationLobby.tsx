import React, { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import HeaderInfo from "./HeaderInfo";

export const AddEditConversationLobby = ({
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
                <Tab eventKey={"0"} title='Header'>
                    <HeaderInfo />
                </Tab>
            </Tabs>
        </div>
    );
};
export default AddEditConversationLobby;
