import React, { Component } from 'react';

export class TimeAndApprovalBlock extends Component {

    render() {
        return (
            <div className="d-flex w-100 justify-content-between mt-3" data-testid="compose-variant">
                <span>
                    <i className="far fa-clock fa-sm"></i>
                    <small className="my-auto ml-1">{this.props.tweet.ScheduledStatusTime}</small>
                </span>
                <span>
                    <i className="fas fa-trash-alt mr-1 trash-hover" onClick={() => this.props.deleteTweet()}></i>
                    {
                        this.props.tweet.IsApprovedByHandle ?
                            <i className="fas fa-check fa-lg" data-testid="approved"></i> :
                            <i className="fas fa-times-circle fa-lg" data-testid="not-approved"></i>
                    }
                </span>
            </div>
        );
    }
}