import React, { Component, Link } from 'react';
import { getTweetUrl } from '../utils/twitter-tweet-util';

export class WebjobPostedBlock extends Component {

    constructor(props) {
        super(props);

        this.openNewTabOnClick = this.openNewTabOnClick.bind(this);

        this.state = {
            tweetUrl: null,
            linkEnabled: false
        }
    }

    async componentDidMount() {
        const tweetId = (this.props.tweet && this.props.tweet.TweetId && this.props.tweet.TweetId.length > 0)
            ? this.props.tweet.TweetId
            : null;
        
        const tweetUrl = (tweetId != null)
            ? getTweetUrl(this.props.tweet)
            : null;
        
        const linkEnabled = (this.props.tweet && this.props.tweet.TweetId && this.props.tweet.TweetId.length>0)
            ? true
            : false;

        this.setState({
            tweetUrl,
            linkEnabled
        });
    }

    openNewTabOnClick() {
        window.open(this.state.tweetUrl, "_blank", 'noopener,noreferrer')
    }

    // If internal record has a value for external TweetId, 
    // then convert icon to a link that opens a new tab using 
    // the external twitter id
    //
    // Styling follows pattern of "Create Tweet" button on Compose
    tweetIconWithLink() {

        const buttonStyle = this.state.linkEnabled
            ? { border: 0, padding: 0 }
            : { border: 0, padding: 0, opacity: .65, cursor: 'not-allowed' };

        return (

            <button
                id={`button`}
                data-testid={`button`}
                onClick={this.openNewTabOnClick}
                disabled={!this.state.linkEnabled} style={buttonStyle}>
                
                <i className="fab fa-twitter-square fa-lg twitter" ></i>
            </button>
        )
    }

    render() {
        if (this.props.tweet.IsPostedByWebJob && !this.props.editPaneExpanded) {
            if (this.props.canEdit) {
                return (
                    <div className="d-flex w-100 justify-content-between mt-2" data-testid="webjob-pane">
                        <span>
                            {
                                this.props.tweet.RetweetNum === 0 ?
                                    this.tweetIconWithLink() :
                                    <i className="fas fa-retweet fa-lg twitter"></i>
                            }
                        </span>
                        <span>
                            <i className="fas fa-trash-alt trash-hover" onClick={() => this.props.deleteTweet()}></i>
                        </span>
                    </div>
                );
            } else {
                return (
                    this.tweetIconWithLink()
                );
            }
        } else {
            return (<></>);
        }
    }
}