import React, { Component } from 'react';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import { validateTweetBody } from './utils/twitter-text-util.js';
import { TweetImageBlock } from './tweet-components/TweetImageBlock';
import { fileToBase64 } from './utils/file-util';
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
            timeInput: "",
            imageFileList: [],
            errorMessage: undefined,
            processingTweet: false
        }
    }

    async componentDidMount() {
        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let handles = await axios.get(baseUrl + "api/get-distinct-handles", authHeaders);
        handles.data.unshift("");

        this.setState({
            globalHandles: handles.data,
            selectedHandle: handles.data[0]
        });
    }

    async createTweet() {
        // create dummy loading tweet and add to queue
        this.setState({processingTweet: true});

        let date;
        if (this.state.dateInput === "" || this.state.timeInput === "") {
            date = new Date(Date.now());
        } else {
            date = new Date(this.state.dateInput + "T" + this.state.timeInput);   
        }

        let tweetPostObject = {
            "TwitterHandle": this.state.selectedHandle,
            "ScheduledStatusTime": date,
            "StatusBody": this.state.bodyState.text,
            "ImageBase64Strings": this.state.imageFileList
        };

        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        try {
            let response = await axios.post(baseUrl + "api/post-new-tweet", tweetPostObject, authHeaders);
            let queueObject = {
                "Id": response.data.Id,
                "TwitterUser": response.data.TweetUser,
                "CreatedTime": "Just now",
                "ScheduledStatusTime": date.toLocaleString(),
                "TwitterHandle": this.state.selectedHandle,
                "StatusBody": this.state.bodyState.text,
                "IsApprovedByHandle": false,
                "IsPostedByWebJob": false,
                "ImageBase64Strings": this.state.imageFileList
            };

            this.props.addNewTweet(queueObject);
            this.setState({
                selectedHandle: "",
                bodyState: {
                    text: "",
                    isValid: false,
                    bodyLenText: validateTweetBody("").textReturn
                },
                dateInput: "",
                timeInput: "",
                imageFileList: [],
                errorMessage: undefined,
                processingTweet: false
            });
        } catch (error) {
            if (error.response.status === 400) {
                this.setState({
                    errorMessage: error.response.data,
                    processingTweet: false
                });
            } else {
                this.setState({
                    errorMessage: "One of your images exceeds the size limit for requests within this application (22mb). Additionally, individual images must be <=5mb in size.",
                    processingTweet: false
                
                });
            }
        }
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
                isValid: result.isValid && event.target.value !== "",
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

    async fileChange(event) {
        let files = event.target.files;
        let promises = [];

        Array.from(files).forEach(function (file) {
            promises.push(fileToBase64(file))
        });
        
        let base64Strings = await Promise.all(promises);
        this.setState({
            imageFileList: base64Strings
        });
    }

    clearImages() {
        this.setState({
            imageFileList: []
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
                
                {
                    this.state.imageFileList.length <= 3 &&
                    <div className="input-group mb-3" ng-hide="imageFileList.length >= 4">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="images-file-input" accept=".png, .PNG, .jpg, .jpeg" 
                                onChange={(e) => this.fileChange(e)} multiple 
                            />
                            <label className="custom-file-label" for="images-file-input">Add images</label>
                        </div>
                    </div>
                }

                {
                    this.state.imageFileList.length > 0 &&
                    <div className="mb-3">
                        <button className="btn btn-warning" onClick={() => this.clearImages()}>Clear images</button>
                    </div>
                }
                
                <ul className="list-group list-group-horizontal mb-3">
                    {
                        this.state.imageFileList.map((base64, index) => <TweetImageBlock
                            base64={base64}
                            idx={index}
                            editPaneExpanded={false}
                        />)
                    }
                </ul>

                {
                    this.state.bodyState.isValid &&
                    this.state.selectedHandle !== "" &&
                    this.state.imageFileList.length <= 4 ?
                    <div className="mb-3">
                        <button type="button" className="btn btn-success tweet" onClick={() => this.createTweet()}> 
                            Create Tweet
                        </button>
                        {
                            this.state.processingTweet &&
                            <span>
                                <div className="spinner-border text-success ml-2" id="wait-tweet" role="status" aria-hidden="true"></div>
                            </span>
                        }
                    </div>
                    :
                    <button type="button" className="btn btn-success mb-3 tweet" disabled>
                        Create Tweet
                    </button>
                }

                {
                    this.state.errorMessage && 
                    <div className="alert alert-danger" role="alert">
                        <strong>Oops!</strong> {this.state.errorMessage}
                    </div>
                }

                {
                    this.state.imageFileList.length > 4 && 
                    <div className="alert alert-danger" role="alert">
                        <strong>Oops!</strong> You exceeded the maximum of <strong>4</strong> images.
                    </div>
                }
                
            </div>
        );
    }

}
