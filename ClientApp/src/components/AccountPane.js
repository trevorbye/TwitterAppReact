import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';

export class AccountPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsExpanded: false,
            mentionTooltipOpen: false
        }
    }

    expandSettings() {
        this.setState({
            settingsExpanded: true
        });
    }

    hideSettings() {
        this.setState({
            settingsExpanded: false
        });
    }

    toggleMentionTooltip() {
        this.setState({
            mentionTooltipOpen: !this.state.mentionTooltipOpen
        });
    }

    render() {
        if (this.state.settingsExpanded) {
            return (
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="settings-pane mt-3">
                        <div className="card-body">
                            <div className="card-title">
                                <h5 className="my-auto handles">{this.props.handle.TwitterHandle}</h5>
                            </div>
                            <div className="d-flex w-100 justify-content-between mb-3">
                                <p className="my-auto">Delete account</p>
                                <button type="button" className="btn btn-danger my-auto">
                                    Delete &nbsp; <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>

                            <div className="d-flex w-100 justify-content-between mb-3">
                                <p className="my-auto">
                                    Enable automatic <span className="twitter">@mention</span> retweets <i className="fas fa-info-circle" id="retweet-tip"></i>
                                </p>
                                <Tooltip placement="top" target="retweet-tip" isOpen={this.state.mentionTooltipOpen} toggle={() => this.toggleMentionTooltip()}>
                                    When toggled on, any tweet mentioning <span class='twitter'>{this.props.handle.TwitterHandle}</span> will be added to your queue. Approving will automatically retweet the mention.
                                </Tooltip>
                                {
                                    this.props.handle.IsAutoRetweetEnabled ?
                                    <i class="fas fa-toggle-on fa-2x" onClick={() => this.props.disableAutoTweets(this.props.handle, this.props.idx)}></i> :
                                    <i class="fas fa-toggle-off fa-2x" onClick={() => this.props.enableAutoTweets(this.props.handle, this.props.idx)}></i>
                                }
                            </div>

                        </div>

                        <div className="card-footer">
                            <div className="d-flex justify-content-end collapse">
                                <button className="btn btn-secondary" onClick={() => this.hideSettings()}>
                                    Done &nbsp; <i class="fas fa-chevron-up"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div> 
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