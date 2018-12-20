import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
class ApplicationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { appSearch: '' };
    }
    handleChange = e => {
        this.setState({ appSearch : e.target.value });
    }
    render() {
        return (
            <React.Fragment>
                <FormGroup controlId="appSearch">
                    <FormControl type="text" placeholder="Search" onChange={this.handleChange} value={this.state.appSearch}/>
                    <span className="icon-moon icon-search"></span>
                </FormGroup>
            </React.Fragment>
        )
    }
}

export default ApplicationSearch;