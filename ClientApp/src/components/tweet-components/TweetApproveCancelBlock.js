import React, { Component } from 'react';

export class TweetApproveCancelBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonClassName: null
        }
    }

    componentDidMount() {
        let className;
        this.props.tweet.RetweetNum == 0 ? className = 'btn btn-primary btn-sm mr-1' : className = 'btn btn-warning btn-sm mr-1';
        this.setState({
            buttonClassName: className
        });
    }

    buildButtonPane() {
        return (
            <span>
                {
                    !this.props.tweet.IsPostedByWebJob &&
                    this.props.tweet.RetweetNum == 0 &&
                    this.props.canEdit &&
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.expandEditPane()}>Edit</button>
                }
                <i className="fas fa-trash-alt ml-1 trash-hover" onClick={() => this.props.deleteTweet()}></i>
            </span>
        );
    }

    render() {
        if (!this.props.editPaneExpanded && !this.props.tweet.IsPostedByWebJob) {
            if (this.props.tweet.IsApprovedByHandle) {
                return (
                    <div className="d-flex w-100 justify-content-between mt-3">
                        <span>
                            <button type="button" className="btn btn-primary btn-sm mr-1" onClick={() => this.props.approveOrCancelTweet('cancel')}>Cancel</button>
                            <i className="fas fa-check fa-lg"></i>
                        </span>
                        {this.buildButtonPane()}
                    </div>
                );
            } else {
                return (
                    <div className="d-flex w-100 justify-content-between mt-3">
                        <span>
                            <button type="button" className={this.state.buttonClassName} onClick={() => this.props.approveOrCancelTweet('approve')}>{this.props.tweet.RetweetNum == 0 ? 'Approve' : 'Approve and retweet'}</button>
                            <i className="fas fa-times-circle fa-lg"></i>
                        </span>
                        {this.buildButtonPane()}
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}