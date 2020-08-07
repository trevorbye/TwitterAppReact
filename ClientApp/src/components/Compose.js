import React, { Component } from 'react';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import { validateTweetBody } from './utils/twitter-text-util.js';
import axios from 'axios';

export class Compose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            globalHandles: [],
            selectedHandle: "",
            bodyState: {
                text: "",
                isValid: false,
                bodyLenText: validateTweetBody("").textReturn
            },
            dateInput: "",
            timeInput: ""
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

    bodyChangeHandler(event) {
        let result = validateTweetBody(event.target.value);
        this.setState({
            bodyState: {
                text: event.target.value,
                isValid: result.isValid,
                bodyLenText: result.textReturn
            }
        });
    }

    dateChange(event) {
        this.setState({
            dateInput: event.target.value
        });
    }

    timeChange(event) {
        this.setState({
            timeInput: event.target.value
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

                <div className="input-group mb-3">
                    <label className="sr-only" for="body-text">Tweet text</label>
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-twitter fa-lg twitter"></i>
                        </span>
                    </div>
                    <textarea className="form-control" 
                        rows="5" 
                        id="body-text"
                        value={this.state.bodyState.text}
                        onChange={(e) => this.bodyChangeHandler(e)}
                    >
                    </textarea>
                </div>

                <div className="input-group mb-3">
                    <span className="badge">{this.state.bodyState.bodyLenText}</span>
                </div>

                <div className="input-group mb-3">
                    <label>Leave either date <strong>or</strong> time blank to post the tweet as soon as it's approved.</label>
                    <label className="sr-only" for="tweet-date">Schedule tweet date</label>
                    <label className="sr-only" for="tweet-time">Schedule tweet time</label>
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Scheduled date & time
                        </span>
                    </div>
                    <input id="tweet-date" type="date" max="3000-12-31" min="1000-01-01" className="form-control" 
                        value={this.state.dateInput} 
                        onChange={(e) => this.dateChange(e)} 
                    />
                    <input id="tweet-time" type="time" className="form-control" 
                        value={this.state.timeInput} 
                        onChange={(e) => this.timeChange(e)} 
                    />
                </div>
                

            </div>
        );
    }

}
