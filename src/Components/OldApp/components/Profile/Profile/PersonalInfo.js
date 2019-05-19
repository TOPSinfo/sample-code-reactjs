import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class PersonalInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: ''
        }
    }

    componentDidMount() {
        console.log("this.props", this.props);
        // Check whether the profile object has any property
        if (Object.keys(this.props.profile).length) {
            this.setState({
                username: this.props.profile.username,
                email: this.props.profile.email,
                createdAt: new Date(this.props.profile.createdAt).toDateString()
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // Set username and email if they are not set yet
        if (!this.state.username) {
            if (Object.keys(nextProps.profile).length) {
                this.setState({
                    username: nextProps.profile.username,
                    email: nextProps.profile.email,
                    createdAt: new Date(this.props.profile.createdAt).toDateString()
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    Username: {this.state.username}
                </div>
                <div>
                    Email: {this.state.email}
                </div>
                <div>
                    Member Since: <Moment format="MM/DD/YYYY" date={this.state.createdAt} />
                </div>

            </div>

        )
    }
}

function mapStateToProps({ profile }) {
    return {
        profile: profile.profile
    };
}

export default connect(mapStateToProps, null)(PersonalInfo);