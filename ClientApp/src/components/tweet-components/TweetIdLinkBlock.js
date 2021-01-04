import React, { Component } from 'react';
import { getTweetUrl } from '../utils/twitter-tweet-util';

// Given an internal Id, update or display posted Tweet Id
export class TweetIdLinkBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweet: props.tweet,
            update: (props.tweet.Id && !props.tweet.IsPostedByWebJob && props.tweet.TwitterHandle) ? true : false,
            internalId: props.tweet.Id,
            isReadOnly: (props.isReadOnly === false || props.isReadOnly === "false") ? false : true,
        }

    }
    componentDidMount() {
        console.log(JSON.stringify(this.state));
    }
    onChangeTweetId(event) {

        let tweet = this.state.tweet;
        tweet.TweetId = event.target.value

        this.setState({
            tweet
        });

    }

    render() {
        return (
            <div>

                <div data-testid="edit-pane">
                    <div className="input-group mb-3">
                        <input
                            id="tweet-id"
                            type="text"
                            className="form-control"
                            placeholder="Posted Tweet Id"
                            value={this.state.tweet.TweetId}
                            readOnly={this.state.isReadOnly}
                            onChange={(e) => this.onChangeTweetId(e)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary mt-3" onClick={() => this.props.onPosted(this.state.tweet)}>
                        Update
                    </button>
                </div>

                { getTweetUrl(this.state.tweet)}
            </div>
        )
    }
}
