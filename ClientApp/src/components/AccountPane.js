import React, { Component } from 'react';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';

export class AccountPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsExpanded: false
        }
    }

    expandSettings() {
        this.setState({
            settingsExpanded: true
        });
    }

    render() {
        if (this.state.settingsExpanded) {
            return (
                null
            );
        } else {
            return (
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h5 className="my-auto handles">{this.props.handle.TwitterHandle}</h5>
                        <button className="btn btn-primary my-auto" onClick={() => this.expandSettings()}>
                            Settings &nbsp; <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
            );
        }
    }
}