import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { parse } from 'query-string';
import { TweetIdLinkBlock } from './tweet-components/TweetIdLinkBlock'
import { PollBlock } from './tweet-components/PollBlock';
import { TweetImageBlock } from './tweet-components/TweetImageBlock';
import { prepTweet, getTweetById, updateTweetId } from './utils/twitter-tweet-util';

export class Tweet extends Component {
    constructor(props) {
        super(props);

        const params = parse(window.location.search);

        this.readOnlyStyle = {
            'border': '10px',
            'padding': "10px",
            'border-color': '#404040',
            'border-style': 'solid'
        };
        
        this.readWriteStyle = {
            'border': '10px',
            'padding': "10px",
            'border-color': '#ffffff',
            'border-style': 'solid'
        };
        
        this.state = {
            params: params,
            tweet: null,
            tweetIsReady: false,
            handles: null,
            redirect: null
        }
    }

    async componentDidMount() {

        if (this.state.params.id) {

            // tweet
            const tweet = await prepTweet(await getTweetById(this.props.msalConfig, this.state.params.id));
            const tweetIsReady = (tweet.Id.toString() === this.state.params.id) ? true : false;

            this.setState({
                tweet,
                tweetIsReady,
                selectedHandle: "",
            });
        }

    }

    async onSubmitUpdateTweet(msalConfig, tweet) {
                
        await updateTweetId(msalConfig, tweet);
        this.setState(
            {
                redirect: '/tweet-queue'
            }
        )
        
    }

    async onSelectedHandleChange(event) {
        event.persist();
        
        let tweet = this.state.tweet;
        tweet.TwitterHandle = event.target.value;

        this.setState({
            selectedHandle: event.target.value,
            tweet
        });
    }

    DisplayTwitterHandle() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="handleSelect">Twitter handle</label>
                    <input
                        value={this.state.tweet.TwitterHandle}
                        readOnly={true}
                    />
                </div>
            </div>
        )
    }
    
    DisplayRequestedPostDateAndTime() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="handleSelect">Requested Post Schedule</label>
                    <input
                        value={this.state.tweet.ScheduledStatusTime}
                        readOnly={true}
                    />
                </div>
            </div>
        )
    }

    DisplayTwitterTextBox() {
        return (
            <div className="input-group mb-3">
                <label className="sr-only" htmlFor="body-text">
                    Tweet text
          </label>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fab fa-twitter fa-lg twitter"></i>
                    </span>
                </div>
                <textarea
                    className="form-control"
                    rows="5"
                    id="body-text"
                    value={this.state.tweet.StatusBody}
                    readOnly
                ></textarea>
                <div className="input-group mb-3">
                    <span className="badge">{this.state.tweet.StatusBody.length}/255</span>
                </div>
            </div>
        )
    }

    DisplayScheduledDateAndTime() {
        return (
            this.state.tweet.ScheduledStatusTime &&
            <div className="d-flex w-100 justify-content-between mt-2 mb-3" data-test-id="edit-variant">
                <span>
                    <i className="far fa-clock fa-sm"></i>
                    <small className="my-auto ml-1">{this.state.tweet.ScheduledStatusTime}</small>
                </span>
                <span>
                    <i className="fas fa-user fa-sm mr-1"></i>
                    <small className="my-auto">{this.state.tweet.TweetUser}</small>
                </span>
            </div>
        )
    }

    DisplayImages() {

        let index = 0;

        return (
            this.state.tweet.ImageBase64Strings &&
            <ul className="list-group list-group-horizontal mb-3">
                {this.state.tweet.ImageBase64Strings.map((base64, index) => (
                    <TweetImageBlock
                        base64={base64}
                        idx={index++}
                        editPaneExpanded={false}
                    />
                ))}
            </ul>
        )
    }
    DisplayPoll() {
        return (

            <PollBlock
                caller="Tweet"
                isReadOnly={true}
                poll={this.state.tweet.Poll}
            />
        )
    }

    DisplayPostManualTweetId() {
        return (
            <TweetIdLinkBlock
                tweet={this.state.tweet}
                isReadOnly={false}
                onPosted={(tweet) => {
                    this.onSubmitUpdateTweet(this.props.msalConfig, tweet)
                }}
            />
        )
    }
    
    RedirectAfterUpdate() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
    }

    render() {

        JSON.stringify(this.state);

        return (
            <div>
                {this.RedirectAfterUpdate()}
                {
                    this.state.tweetIsReady
                        ? (
                            <div>
                                <div style={this.readOnlyStyle}>
                                    {this.DisplayTwitterHandle()}
                                    {this.DisplayRequestedPostDateAndTime()}
                                    {this.DisplayTwitterTextBox()}
                                    {this.DisplayScheduledDateAndTime()}
                                    {this.DisplayImages()}
                                    {this.DisplayPoll()}
                                </div>
                                <div style={this.readWriteStyle}>
                                    
                                    {this.DisplayPostManualTweetId()}
                                </div>
                            </div>
                            
                        )
                        : (<span>Tweet not found.</span>)
                }
            </div>
        )

    }
}