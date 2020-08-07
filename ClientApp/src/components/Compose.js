import React, { Component } from 'react';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';

export class Compose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            globalHandles: [],
            selectedHandle: ""
        }
    }

    async componentDidMount() {
        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let handles = await axios.get(baseUrl + "api/get-distinct-handles", authHeaders);

        this.setState({
            globalHandles: handles.data,
            selectedHandle: handles.data[0]
        });
    }

    dropdownChange(event) {
        this.setState({
            selectedHandle: event.target.value
        });
    }

    render() {
        return (
            <div className="col-md-6">
                <h2 className="mb-3">Compose and schedule</h2>
                <p className="mb-3">
                    Select a handle, compose a tweet, and choose a time when the status will be posted to the account. The
                    request will be routed to the handle owner for approval.
                </p>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" for="handleSelect">Twitter handle</label>
                    </div>
                    <select className="custom-select" id="handleSelect" onChange={(e) => this.dropdownChange(e)} value={this.state.selectedHandle}>
                        {
                            this.state.globalHandles.map((handle, idx) => <option key={idx} value={handle}>{handle}</option>)
                        }
                    </select>
                </div>
            </div>
        );
    }

}
