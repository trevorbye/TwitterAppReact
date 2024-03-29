﻿import React, { Component } from 'react';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import { validateTweetBody } from './utils/twitter-text-util.js';
import { TweetImageBlock } from './tweet-components/TweetImageBlock';
import { CalendarModal } from './CalendarModal.js';
import { fileToBase64 } from './utils/file-util';
import * as timeUtils from './utils/time-util';
import { ScheduledDateAndTime } from './tweet-components/ScheduledDateAndTime'
import axios from 'axios';
import { AppConfig } from "../config";

export class Compose extends Component {
    
    componentNow = new Date();
    
    defaultState = {
        selectedHandle: "",
        bodyState: {
            text: "",
            isValid: false,
            bodyLenText: validateTweetBody("").textReturn
        },
        dateInput: timeUtils.inputDateFormat(this.componentNow),
        timeInput: timeUtils.inputTimeFormat(this.componentNow),
        imageFileList: [],
        errorMessage: undefined,
        processingTweet: false
    };
    
    constructor(props) {
        super(props);

        this.state = {
            globalHandles: [],
            publicHandleEvents: [],
            calendarOpen: false,
            now: this.componentNow,
            ...this.defaultState
        }
    }
    
    initializeState() {
        this.setState(this.defaultState);
    }

    async componentDidMount() {
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let handles = await axios.get(AppConfig.APP_SERVER_BASE_URL + "api/get-distinct-handles", authHeaders);
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

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        try {
            const url = AppConfig.APP_SERVER_BASE_URL + "api/post-new-tweet";
            
            let response = await axios.post(url, tweetPostObject, authHeaders);
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
            this.initializeState();
        } catch (error) {
            console.log(error);
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

    async dropdownChange(event) {
        event.persist();

        this.setState({
            selectedHandle: event.target.value,
            publicHandleEvents: []
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let res = await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/get-public-schedule?handle=${event.target.value}`, authHeaders);
        let publicQueue = res.data;

        let eventList = [];
        let id = 0;
        publicQueue.forEach(function(tweet, idx) {
            let datetime = new Date(tweet.ScheduledStatusTime)
            let event = {
                id: id,
                title: null,
                start: datetime,
                end: datetime,
                tweetQueueId: tweet.Id,
                approved: tweet.IsApprovedByHandle,
                handle: tweet.TwitterHandle,
                posted: tweet.IsPostedByWebJob
            }
            eventList.push(event)
            id += 1;
        });

        this.setState({
            publicHandleEvents: eventList
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

    toggleCalendarModal() {
        this.setState({
            calendarOpen: !this.state.calendarOpen
        });
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="d-flex w-100 justify-content-between mb-3">
                    <span>
                        <h2>Compose and schedule</h2>
                    </span>
                </div>
                
                <p className="mb-3">
                    Select a handle, compose a tweet, and choose a time when the status will be posted to the account. The
                    request will be routed to the handle owner for approval. If the handle owner has made their tweet schedule public,
                    click the calendar to view it. <br></br><br></br>Your tweet must follow <a href="https://microsoft.sharepoint.com/sites/CELAWeb-Marketing/SitePages/social-media-social-media-guidelines.aspx">Microsoft Global Readiness guidelines</a>.
                </p>
                

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" for="handleSelect">Twitter handle</label>
                        {
                            this.state.publicHandleEvents.length > 0 ?
                            <span className="input-group-text">
                                <i className="far fa-calendar-alt fa-lg public-calendar" onClick={() => this.toggleCalendarModal()}></i><sup className="ml-1"> <b className="new-text">NEW</b></sup>
                            </span> 
                            :
                            <span className="input-group-text">
                                <i className="far fa-calendar-alt fa-lg public-calender-disabled" disabled></i><sup className="ml-1"> <b className="new-text">NEW</b></sup>
                            </span>
                        }
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

                <ScheduledDateAndTime
                    edit={false}
                    time={this.state.timeInput}
                    date={this.state.dateInput}
                    dateChange={(e) => this.dateChange(e)}
                    timeChange={(e) => this.timeChange(e)}
                    now={this.state.now}
                />
                
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

                <CalendarModal 
                    events={this.state.publicHandleEvents} 
                    toggleCalendarModal={() => this.toggleCalendarModal()} 
                    calendarModalOpen={this.state.calendarOpen}
                    canApprove={false}
                    key={"public"}
                    modalTitle={this.state.selectedHandle + " tweet calendar"}
                />
            </div>
        );
    }

}
