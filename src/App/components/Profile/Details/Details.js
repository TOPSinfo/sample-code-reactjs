import React from 'react';
// Tools
import { connect } from 'react-redux';
// Components
import Projects from '../Projects/Projects';
// import Profile from '../Profile/NewProfile';
import Storage from '../Storage/Storage';
import Sidebar from '../Profile/Sidebar';

const Details = ({ pageView, socket }) =>

    <div className="details">
        {pageView === 'projects' && <Projects socket={socket} />}
        {pageView === 'documents' && <Storage />}
        {pageView === 'profile' && <Sidebar />}
    </div>

function mapStateToProps({ profile }) {
    return { pageView: profile.pageView };
}

export default connect(mapStateToProps)(Details);