import React, { Component } from 'react';
import { BasicTweetBlock } from './tweet-components/BasicTweetBlock';
import { Compose } from './Compose.js';
import { CalendarModal } from './CalendarModal.js';

import axios from 'axios';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import { getHumanReadableTime, localeStatusTime } from './utils/time-util';
import { AppConfig } from "../config";

export class TweetQueue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingQueue: true,
            tweetQueue: [],
            imageDeleteInProg: false,
            calendarModalOpen: false,
            eventList: []
        }
    }

    async componentDidMount() {
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        
        let utcRes = await axios.get(AppConfig.APP_SERVER_BASE_URL + "api/get-utc-now");

        let queueUrl = this.props.compose ? "user" : "handles";
        let tweetRes = await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/get-${queueUrl}-tweet-queue`, authHeaders);
        let utcServerTimestamp = utcRes.data;
        let tweetQueue = tweetRes.data;

        tweetQueue.forEach(function (tweet) {
            tweet.CreatedTime = getHumanReadableTime(utcServerTimestamp, tweet.CreatedTime);
            tweet.ScheduledStatusTime = localeStatusTime(tweet.ScheduledStatusTime);
        });

        this.setState({
            isLoadingQueue: false,
            tweetQueue: tweetQueue
        });

        // build event list for calendar
        let eventList = [];
        let id = 0;
        this.state.tweetQueue.forEach(function(tweet, idx) {
            let datetime = new Date(tweet.ScheduledStatusTime)
            let event = {
                id: id,
                title: tweet.StatusBody,
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
            eventList: eventList
        })
    }

    toggleCalendarModal() {
        this.setState({
            calendarModalOpen: !this.state.calendarModalOpen
        })
    }

    addNewTweet(tweetQueue) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        let eventListCopy = Object.assign([], this.state.eventList);
        let eventTime = new Date(tweetQueue.ScheduledStatusTime)
        let event = {
            id: eventListCopy[eventListCopy.length - 1].id + 1,
            title: tweetQueue.StatusBody,
            start: eventTime,
            end: eventTime,
            tweetQueueId: tweetQueue.Id,
            approved: false,
            handle: tweetQueue.TwitterHandle,
            posted: tweetQueue.IsPostedByWebJob
        }
        eventListCopy.push(event)
        tweetQueueCopy.unshift(tweetQueue);
        this.setState({
            tweetQueue: tweetQueueCopy,
            eventList: eventListCopy
        })
    }

    async deleteTweetByIndex(idx, id) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        tweetQueueCopy.splice(idx, 1);
        this.setState({
            tweetQueue: tweetQueueCopy
        });

        let eventListCopy = Object.assign([], this.state.eventList);
        let spliceIdx;
        for (spliceIdx = 0; spliceIdx < eventListCopy.length; spliceIdx++) {
            if (eventListCopy[spliceIdx].tweetQueueId === id) {
                eventListCopy.splice(spliceIdx, 1);
                break;
            }
        }
        this.setState({
            eventList: eventListCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.delete(AppConfig.APP_SERVER_BASE_URL + `api/delete-tweet?id=${id}`, authHeaders);
    }

    async deleteImageByIndex(imageIdx, tweetIdx) {
        if (this.state.imageDeleteInProg) {
            return;
        }
        this.setState({
            imageDeleteInProg: true
        });

        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        tweetQueueCopy[tweetIdx].ImageBase64Strings.splice(imageIdx, 1);
        this.setState({
            tweetQueue: tweetQueueCopy,
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.delete(AppConfig.APP_SERVER_BASE_URL + `api/delete-tweet-image?tweetId=${tweetQueueCopy[tweetIdx].Id}&imageIdx=${imageIdx}`, authHeaders);

        this.setState({
            imageDeleteInProg: false
        });
    }

    async editTweet(tweetId, editState, idx) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        let datetime;
        if (editState.date === "" || editState.time === "") {
            datetime = new Date(Date.now());
        } else {
            datetime = new Date(editState.date + "T" + editState.time);
        }

        tweetQueueCopy[idx].StatusBody = editState.body;
        tweetQueueCopy[idx].ScheduledStatusTime = datetime.toLocaleString();
        this.setState({
            tweetQueue: tweetQueueCopy
        });

        let eventListCopy = Object.assign([], this.state.eventList);
        let spliceIdx;
        for (spliceIdx = 0; spliceIdx < eventListCopy.length; spliceIdx++) {
            if (eventListCopy[spliceIdx].tweetQueueId === tweetId) {
                let time = new Date(datetime)
                eventListCopy[spliceIdx].start = time
                eventListCopy[spliceIdx].end = time
                eventListCopy[spliceIdx].title = editState.body
                break;
            }
        }
        this.setState({
            eventList: eventListCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.post(AppConfig.APP_SERVER_BASE_URL + "api/edit-tweet-attributes", { Id: tweetId, StatusBody: editState.body, ScheduledStatusTime: datetime }, authHeaders);
    }

    async approveOrCancelAndRemove(idx, type, id) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        // if idx==-1, request is coming from inside calendar, so we need to find the idx in the tweetqueue first from the id
        if (idx === -1){
            var searchIdx = 0;
            while (searchIdx < tweetQueueCopy.length) {
                if (tweetQueueCopy[searchIdx].Id === id) {
                    break;
                }
                searchIdx++;
            }
        }
        
        let tmpIdx = idx === -1 ? searchIdx : idx;
        type === 'approve' ? tweetQueueCopy[tmpIdx].IsApprovedByHandle = true : tweetQueueCopy[tmpIdx].IsApprovedByHandle = false;
        this.setState({
            tweetQueue: tweetQueueCopy
        });

        let eventListCopy = Object.assign([], this.state.eventList);
        let spliceIdx;
        for (spliceIdx = 0; spliceIdx < eventListCopy.length; spliceIdx++) {
            if (eventListCopy[spliceIdx].tweetQueueId === id) {
                type === 'approve' ? eventListCopy[spliceIdx].approved = true : eventListCopy[spliceIdx].approved = false;
                break;
            }
        }
        this.setState({
            eventList: eventListCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        type === 'approve' ?
            await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/approve-or-cancel?approveById=${id}&cancelById=0`, authHeaders) :
            await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/approve-or-cancel?cancelById=${id}&approveById=0`, authHeaders);
    }

    loadingQueueDiv() {
        return (
            <div className="d-flex p-3 align-items-center border border-common rounded">
                <strong>Loading tweet queue...</strong>
                <div className="spinner-border text-success ml-auto" role="status" aria-hidden="true"></div>
            </div>
        );
    }

    render() {
        if (this.props.compose) {
            return (
                <div className="row">

                    <Compose 
                        msalConfig={this.props.msalConfig} 
                        addNewTweet={(tweet) => this.addNewTweet(tweet)}
                    />

                    <div className="col-md-6 mb-3">
                        <div className="d-flex w-100 justify-content-between mb-3">
                            <span>
                                <h2>Requested tweets</h2>
                            </span>
                            <span>
                                <i class="far fa-calendar-alt fa-2x" onClick={() => this.toggleCalendarModal()}></i><sup> <b className="new-text">NEW</b></sup>
                            </span>
                        </div>

                        <p className="mb-3">
                            View your active requested Tweets. The icons indicate whether or not the handle owner has approved your request.
                            You can <b>Delete</b> both approved and unapproved Tweets. The <i className="fab fa-twitter-square fa-lg twitter"></i> indicates
                            that the Tweet has been posted and is safe to delete from your queue.
                        </p>
                        {this.state.isLoadingQueue && this.loadingQueueDiv()}

                        <div className="list-group scroll-group" style={{ maxHeight: (this.props.viewportHeight - 400) + "px" }}>
                            {
                                this.state.tweetQueue.map((tweet, index) => <BasicTweetBlock
                                    tweet={tweet}
                                    idx={index}
                                    canEdit={false}
                                    deleteTweetByIndex={(idx, id) => this.deleteTweetByIndex(idx, id)}
                                    approveOrCancelAndRemove={(idx, type, id) => this.approveOrCancelAndRemove(idx, type, id)}
                                    deleteImageByIndex={(imageIdx, tweetIdx) => this.deleteImageByIndex(imageIdx, tweetIdx)}
                                    editTweet={(tweetId, editState, idx) => this.editTweet(tweetId, editState, idx)}
                                />)
                            }
                        </div>
                    </div>
                    <CalendarModal 
                        events={this.state.eventList} 
                        toggleCalendarModal={() => this.toggleCalendarModal()} 
                        calendarModalOpen={this.state.calendarModalOpen}
                        approveOrCancel={(idx, type, id) => this.approveOrCancelAndRemove(idx, type, id)}
                        canApprove={false}
                        modalTitle={"Requests calendar"}
                    />
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="d-flex w-100 justify-content-between mb-3">
                            <span>
                                <h2>Your Tweet queue</h2>
                            </span>
                            <span>
                                <i className="far fa-calendar-alt fa-2x" onClick={() => this.toggleCalendarModal()}></i><sup> <b className="new-text">NEW</b></sup>
                            </span>
                        </div>
                        
                        <p className="mb-3">
                            These are all current Tweets that users have requested to post to any of your configured Twitter accounts.
                            Approve the request to post the Tweet at the scheduled time. You can edit the content of a tweet, and cancel your approval
                            up until the scheduled post time. <i className="fab fa-twitter-square fa-lg twitter"></i> means
                            the Tweet has been posted as a status, and <i className="fas fa-retweet fa-lg twitter"></i> means it has been re-tweeted.
                        </p>
                        {this.state.isLoadingQueue && this.loadingQueueDiv()}
                            
                        <div className="list-group scroll-group" style={{ maxHeight: (this.props.viewportHeight - 400) + "px" }}>
                            {
                                this.state.tweetQueue.map((tweet, index) => <BasicTweetBlock
                                    tweet={tweet}
                                    idx={index}
                                    canEdit={true}
                                    deleteTweetByIndex={(idx, id) => this.deleteTweetByIndex(idx, id)}
                                    approveOrCancelAndRemove={(idx, type, id) => this.approveOrCancelAndRemove(idx, type, id)}
                                    deleteImageByIndex={(imageIdx, tweetIdx) => this.deleteImageByIndex(imageIdx, tweetIdx)}
                                    editTweet={(tweetId, editState, idx) => this.editTweet(tweetId, editState, idx)}
                                />)
                            }
                        </div>
                    </div>

                    <CalendarModal 
                        events={this.state.eventList} 
                        toggleCalendarModal={() => this.toggleCalendarModal()} 
                        calendarModalOpen={this.state.calendarModalOpen}
                        approveOrCancel={(idx, type, id) => this.approveOrCancelAndRemove(idx, type, id)} 
                        canApprove={true}
                        modalTitle={"Queue calendar"}
                    />
                </div>
            );
        }
    }
}