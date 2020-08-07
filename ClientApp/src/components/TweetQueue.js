import React, { Component } from 'react';
import { BasicTweetBlock } from './tweet-components/BasicTweetBlock';

import axios from 'axios';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import { getHumanReadableTime, localeStatusTime } from './utils/time-util';

export class TweetQueue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingQueue: true,
            tweetQueue: [],
            imageDeleteInProg: false
        }
    }

    async componentDidMount() {
        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        
        let utcRes = await axios.get(baseUrl + "api/get-utc-now");
        let tweetRes = await axios.get(baseUrl + "api/get-handles-tweet-queue", authHeaders);
        let utcServerTimestamp = utcRes.data;
        let tweetQueue = tweetRes.data;

        tweetQueue.forEach(function (tweet) {
            tweet.CreatedTime = getHumanReadableTime(utcServerTimestamp, tweet.CreatedTime);
            tweet.ScheduledStatusTime = localeStatusTime(tweet.ScheduledStatusTime);
        });
        console.log(tweetQueue);

        this.setState({
            isLoadingQueue: false,
            tweetQueue: tweetQueue
        });
    }

    async deleteTweetByIndex(idx, id) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        tweetQueueCopy.splice(idx, 1);
        this.setState({
            tweetQueue: tweetQueueCopy
        });

        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.delete(baseUrl + `api/delete-tweet?id=${id}`, authHeaders);
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

        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.delete(baseUrl + `api/delete-tweet-image?tweetId=${tweetQueueCopy[tweetIdx].Id}&imageIdx=${imageIdx}`, authHeaders);

        this.setState({
            imageDeleteInProg: false
        });
    }

    async editTweet(tweetId, editState, idx) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        tweetQueueCopy[idx].StatusBody = editState.body;
        this.setState({
            tweetQueue: tweetQueueCopy
        });

        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.post(baseUrl + "api/edit-tweet-attributes", { Id: tweetId, StatusBody: editState.body }, authHeaders);
    }

    async approveOrCancelAndRemove(idx, type, id) {
        let tweetQueueCopy = Object.assign([], this.state.tweetQueue);
        type == 'approve' ? tweetQueueCopy[idx].IsApprovedByHandle = true : tweetQueueCopy[idx].IsApprovedByHandle = false;
        this.setState({
            tweetQueue: tweetQueueCopy
        });

        const baseUrl = "https://mstwitterbot.azurewebsites.net/";
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        type == 'approve' ?
            await axios.get(baseUrl + `api/approve-or-cancel?approveById=${id}&cancelById=0`, authHeaders) :
            await axios.get(baseUrl + `api/approve-or-cancel?cancelById=${id}&approveById=0`, authHeaders);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h2 className="mb-3">Your Tweet queue</h2>
                    <p className="mb-3">
                        These are all current Tweets that users have requested to post to any of your configured Twitter accounts.
                        Approve the request to post the Tweet at the scheduled time. You can edit the content of a tweet, and cancel your approval
                        up until the scheduled post time. <i className="fab fa-twitter-square fa-lg twitter"></i> means
                        the Tweet has been posted as a status, and <i className="fas fa-retweet fa-lg twitter"></i> means it has been re-tweeted.
                    </p>

                    {
                        this.state.isLoadingQueue &&

                        <div className="d-flex p-3 align-items-center border border-common rounded">
                            <strong>Loading tweet queue...</strong>
                            <div className="spinner-border text-success ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    }
                    
                    <div className="list-group scroll-group" style={{maxHeight: (this.props.viewportHeight - 400) + "px"}}>
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
            </div>
        );
    }
}