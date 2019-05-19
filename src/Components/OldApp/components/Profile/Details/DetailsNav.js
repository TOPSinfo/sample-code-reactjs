import React from 'react';
// Tools
import { connect } from 'react-redux';
import { profileActions } from '../../../actions';
import "./Details.css"

const DetailsNav = ({ togglePageView, activeTab, projects, followers }) => {
    return (
        <div className="details_nav navDetails">
            <div className="links">
                <p
                    className={activeTab === 'projects' ? 'active' : 'inactive'}
                    onClick={() => {
                        togglePageView('projects');
                    }}
                >
                    Projects{' '}
                </p>
                <p
                    className={activeTab === 'profile' ? 'active' : 'inactive'}
                    onClick={() => {
                        togglePageView('profile');
                    }}
                >
                    Profile{' '}
                </p>
                <p
                    className={activeTab === 'documents' ? 'active' : 'inactive'}
                    onClick={() => {
                        togglePageView('documents');
                    }}
                >
                    Storage{' '}
                </p>
                {/* <p
                    className={activeTab === 'followers' ? 'active' : 'inactive'}
                    onClick={() => {
                        togglePageView('followers');
                    }}
                >
                    Followers{' '}
                </p> */}
                {/* <p
                    className={activeTab === 'collabs' ? 'active' : 'inactive'}
                    onClick={() => {
                        togglePageView('collabs');
                    }}
                >
                    Collaborations{' '}
                </p> */}
            </div>
        </div>
    );
};

function mapStateToProps({ profile, projects, followers }) {
    return {
        activeTab: profile.pageView,
        projects,
        followers
    };
}

export default connect(mapStateToProps, {
    togglePageView: profileActions.togglePageView
})(DetailsNav);
