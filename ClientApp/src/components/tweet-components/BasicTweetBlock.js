import React, { Component} from 'react';
import { TweetImageBlock } from './TweetImageBlock';
import { TweetApproveCancelBlock } from './TweetApproveCancelBlock';
import { WebjobPostedBlock } from './WebjobPostedBlock';
import { EditPaneBlock } from './EditPaneBlock';
import axios from 'axios';

export class BasicTweetBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editPaneExpanded: false
        }
    }

    expandEditPane() {
        this.setState({
            editPaneExpanded: true
        });
    }

    collapseEditPane() {
        this.setState({
            editPaneExpanded: false
        });
    }

    deleteTweet() {
        this.props.deleteTweetByIndex(this.props.idx, this.props.tweet.Id);
    }

    deleteImage(idx) {
        this.props.deleteImageByIndex(idx, this.props.idx);
    }

    approveOrCancelTweet(type) {
        this.props.approveOrCancelAndRemove(this.props.idx, type, this.props.tweet.Id);
    }

    render() {
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="d-flex w-100 justify-content-between align-items-center">
                    <h5 className="handles">{this.props.tweet.TwitterHandle}</h5>
                    <small>{this.props.tweet.CreatedTime}</small>
                </div>

                <p className="mb-1 wrapped">{this.props.tweet.StatusBody}</p>

                {
                    this.props.tweet.ImageBase64Strings != null &&
                    <ul className="list-group list-group-horizontal">
                        {
                            this.props.tweet.ImageBase64Strings.map((base64, index) => <TweetImageBlock
                                base64={base64}
                                idx={index}
                                editPaneExpanded={this.state.editPaneExpanded}
                                deleteImage={(idx) => this.deleteImage(idx)}
                            />)
                        }
                    </ul>
                }
                
                <div className="d-flex w-100 justify-content-between mt-2 mb-3">
                    <span>
                        <i className="far fa-clock fa-sm"></i>
                        <small className="my-auto ml-1">{this.props.tweet.ScheduledStatusTime}</small>
                    </span>
                    <span>
                        <i className="fas fa-user fa-sm mr-1"></i>
                        <small className="my-auto">{this.props.tweet.TweetUser}</small>
                    </span>
                </div>

                <TweetApproveCancelBlock
                    tweet={this.props.tweet}
                    canEdit={this.props.canEdit}
                    expandEditPane={() => this.expandEditPane()}
                    deleteTweet={() => this.deleteTweet()}
                    approveOrCancelTweet={(type) => this.approveOrCancelTweet(type)}
                    editPaneExpanded={this.state.editPaneExpanded}
                />

                <EditPaneBlock editPaneExpanded={this.state.editPaneExpanded}
                    collapseEditPane={() => this.collapseEditPane()}
                    tweet={this.props.tweet}
                />

                <WebjobPostedBlock tweet={this.props.tweet}
                    editPaneExpanded={this.state.editPaneExpanded}
                    deleteTweet={() => this.deleteTweet()}
                />
                
            </div>
        );
    }
}
