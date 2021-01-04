import React, { Component } from 'react';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { validateTweetBody } from '../utils/twitter-text-util.js';
import { PollBlock } from "./PollBlock";

export class EditPaneBlock extends Component {
    constructor(props) {
        super(props);

        let rawDate = new Date(this.props.tweet.ScheduledStatusTime);
        let origDate = rawDate.toLocaleDateString('sv', { timeZoneName: 'short' }).substr(0, 10);
        let origTime = rawDate.toTimeString().substr(0, 5);

        this.state = {
            editError: false,
            origDate: origDate,
            origTime: origTime,
            body: this.props.tweet.StatusBody,
            bodyLenText: validateTweetBody(this.props.tweet.StatusBody).textReturn,
            isValidBody: true,
            date: origDate,
            time: origTime,
            poll: props.tweet.Poll,
            externalTweetId: props.tweet.TweetId
        }
    }

    collapseEditPane() {
        this.props.collapseEditPane();
        this.setState({
            body: this.props.tweet.StatusBody,
            bodyLenText: validateTweetBody(this.props.tweet.StatusBody).textReturn,
            isValidBody: true,
            date: this.state.origDate,
            time: this.state.origTime,
            poll: this.state.poll
        })
    }

    handleBodyChange(event) {
        let result = validateTweetBody(event.target.value);
        this.setState({
            body: event.target.value,
            bodyLenText: result.textReturn,
            isValidBody: result.isValid
        })
    }
    pollOnChange(newPoll) {
        this.setState({
            poll: newPoll,
        });
        console.log("EditPaneBlock state changed");
    }

    dateChange(event) {
        this.setState({
            date: event.target.value
        });
    }

    timeChange(event) {
        this.setState({
            time: event.target.value
        });
    }

    render() {
        if (this.props.editPaneExpanded) {
            return (
                <SlideDown className={"edit-pane-slidedown"}>
                    <div data-testid="edit-pane">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-twitter fa-lg twitter"></i>
                                </span>
                            </div>
                            <textarea className="form-control"
                                rows="5"
                                id="body-text"
                                value={this.state.body}
                                onChange={(e) => this.handleBodyChange(e)}
                            >
                            </textarea>
                        </div>

                        <div className="input-group mb-3">
                            <span className="badge" data-testid="twttr-chars">{this.state.bodyLenText}</span>
                        </div>

                        <PollBlock
                            caller="EditPanelBlock-false"
                            isReadOnly={false}
                            poll={this.state.poll}
                            onChange={(e) => this.pollOnChange(e)}
                        />

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Scheduled date & time
                                </span>
                            </div>
                            <input id="tweet-date" type="date" max="3000-12-31" min="1000-01-01" className="form-control"
                                value={this.state.date}
                                onChange={(e) => this.dateChange(e)}
                            />
                            <input id="tweet-time" type="time" className="form-control"
                                value={this.state.time}
                                onChange={(e) => this.timeChange(e)}
                            />
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                            <span>
                                {
                                    this.state.isValidBody ?
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.editTweet(this.state)}>Save</button> :
                                        <button type="button" className="btn btn-primary btn-sm" disabled>Save</button>
                                }
                                
                            </span>
                            <span>
                                <i className="fas fa-compress fa-lg" data-testid="collapse-edit-btn" onClick={() => this.collapseEditPane()}></i>
                            </span>
                        </div>
                    </div>
                </SlideDown>
            );
        } else {
            return null;
        }
    }
}
