import React from 'react';
import SidebarItems from './SidebarItems';
import SidebarDetails from './SidebarDetails';

const Sidebar = () => (
    <div className="profile-tab-container">
        <div className="profile-left" >
            <SidebarItems />
        </div>
        <div className="profile-right" >
            <SidebarDetails />
        </div>
    </div>
)

export default Sidebar;