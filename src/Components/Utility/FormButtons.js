import React, { Component } from 'react';

class FormButtons extends Component {
    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-icon" onClick={this.props.cancel} >
                    <span className="icon-moon icon-close"></span>
                </button>
                <button disabled={this.props.disabled} type="button" className="btn btn-icon" onClick={this.props.save} >
                    <span className="icon-moon icon-check"></span>
                </button>
            </React.Fragment>
        )
    }
}

export default FormButtons;