import React, { Component } from 'react';
import { TweetImageBlock } from './TweetImageBlock';
import axios from 'axios';

export class BasicTweetBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editPaneExpanded: false
        }
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
                                key={index}
                                editPaneExpanded={this.state.editPaneExpanded} />)
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
                
            </div>
        );
    }
}
