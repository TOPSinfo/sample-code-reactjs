import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import PersonalInfo from './PersonalInfo';
import Settings from './Settings';
import SocialNetworks from './SocialNetworks';

const SidebarDetails = ({ sidebarView }) => (
    <div className="inner-scroll">
        {sidebarView === 'profile' && <Profile />}
        {sidebarView === 'userInfo' && <PersonalInfo />}
        {sidebarView === 'settings' && <Settings />}
        {sidebarView === 'socialNetworks' && <SocialNetworks />}
    </div>
)

function mapStateToProps({ profile }) {
    return { sidebarView: profile.sidebarView };
}

export default connect(mapStateToProps)(SidebarDetails);