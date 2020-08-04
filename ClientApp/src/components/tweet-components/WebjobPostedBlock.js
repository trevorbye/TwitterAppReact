import React, { Component } from 'react';

export class WebjobPostedBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        if (this.props.tweet.IsPostedByWebJob && !this.props.editPaneExpanded) {
            return (
                <div className="d-flex w-100 justify-content-between mt-2">
                    <span>
                        {
                            this.props.tweet.RetweetNum == 0 ?
                                <i className="fab fa-twitter-square fa-lg twitter"></i> :
                                <i className="fas fa-retweet fa-lg twitter"></i>
                        }
                    </span>
                    <span>
                        <i className="fas fa-trash-alt trash-hover" onClick={() => this.props.deleteTweet()}></i>
                    </span>
                </div>
            );
        } else {
            return null;
        }
    }
}