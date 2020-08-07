import React, { Component } from 'react';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { validateTweetBody } from '../utils/twitter-text-util.js';

export class EditPaneBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editError: false,
            temporaryEditState: {
                body: this.props.tweet.StatusBody,
                bodyLenText: validateTweetBody(this.props.tweet.StatusBody).textReturn,
                isValidBody: true
            }
        }
    }

    collapseEditPane() {
        this.props.collapseEditPane();
        this.setState({
            temporaryEditState: { body: this.props.tweet.StatusBody }
        })
    }

    handleBodyChange(event) {
        let result = validateTweetBody(event.target.value);
        this.setState({
            temporaryEditState: {
                body: event.target.value,
                bodyLenText: result.textReturn,
                isValidBody: result.isValid
            }
        })
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
                                value={this.state.temporaryEditState.body}
                                onChange={(e) => this.handleBodyChange(e)}
                            >
                            </textarea>
                        </div>

                        <div className="input-group mb-3">
                            <span className="badge" data-testid="twttr-chars">{this.state.temporaryEditState.bodyLenText}</span>
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                            <span>
                                {
                                    this.state.temporaryEditState.isValidBody && this.state.temporaryEditState.body != this.props.tweet.StatusBody ?
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.editTweet(this.state.temporaryEditState)}>Save</button> :
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
