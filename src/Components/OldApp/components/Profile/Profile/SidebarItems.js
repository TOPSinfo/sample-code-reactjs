import React from 'react';
// Tools
import { connect } from 'react-redux';
import { profileActions } from '../../../actions';
import './Profile.css';

const SidebarItems = ({ toggleSidebarView, activeTab }) => {
    return (
        <div className="sidebar-details">
            <div className="links">
                <p
                    className={activeTab === 'profile' ? 'active' : 'inactive'}
                    onClick={() => {
                        toggleSidebarView('profile');
                    }}
                >
                    Profile
                </p>
                <p
                    className={activeTab === 'userInfo' ? 'active' : 'inactive'}
                    onClick={() => {
                        toggleSidebarView('userInfo');
                    }}
                >
                    Personal Information
                </p>
                <p
                    className={activeTab === 'settings' ? 'active' : 'inactive'}
                    onClick={() => {
                        toggleSidebarView('settings');
                    }}
                >
                    Settings
                </p>
                <p
                    className={activeTab === 'socialNetworks' ? 'active' : 'inactive'}
                    onClick={() => {
                        toggleSidebarView('socialNetworks');
                    }}
                >
                    Social Networks
                </p>
            </div>
        </div>
    );
};

function mapStateToProps({ profile }) {
    return {
        activeTab: profile.sidebarView
    };
}

export default connect(mapStateToProps, {
    toggleSidebarView: profileActions.toggleSidebarView
})(SidebarItems);