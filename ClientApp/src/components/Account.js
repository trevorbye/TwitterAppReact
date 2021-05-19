import React, { Component } from 'react';
import { AccountPane } from './AccountPane';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';
import { AppConfig } from "../config";
import { getUserDataAsText } from './utils/database-utils'
import { Link } from 'react-router-dom';
import { DownloadButton } from "./utils/DownloadButton";

export class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingHandles: true,
            handles: [],
            redirectUrl: null
        }
        
        // pass in msal config through this context
        this.getUserData = this.getUserData.bind(this);
    }

    
    
    async componentDidMount() {
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let res = await axios.get(AppConfig.APP_SERVER_BASE_URL + "api/get-user-twitter-accounts", authHeaders);

        this.setState({
            isLoadingHandles: false,
            handles: res.data
        });
    }

    loadingQueueDiv() {
        return (
            <div className="d-flex p-3 align-items-center border border-common rounded">
                <strong>Loading twitter accounts...</strong>
                <div className="spinner-border text-success ml-auto" role="status" aria-hidden="true"></div>
            </div>
        );
    }

    async disableAutoTweets(handle, idx) {
        let handlesCopy = Object.assign([], this.state.handles);
        handlesCopy[idx].IsAutoRetweetEnabled = false;
        this.setState({
            handles: handlesCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/disable-auto-tweets?handle=${handle.TwitterHandle}`, authHeaders);
    }

    async enableAutoTweets(handle, idx) {
        let handlesCopy = Object.assign([], this.state.handles);
        handlesCopy[idx].IsAutoRetweetEnabled = true;
        this.setState({
            handles: handlesCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/enable-auto-tweets?handle=${handle.TwitterHandle}`, authHeaders);
    }

    async togglePrivateAccount(handle, idx, isPrivate) {
        let handlesCopy = Object.assign([], this.state.handles);
        handlesCopy[idx].IsPrivateAccount = isPrivate;
        this.setState({
            handles: handlesCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/toggle-private-account?handle=${handle.TwitterHandle}&isPrivate=${isPrivate}`, authHeaders);
    }

    async toggleMakeSchedulePublic(handle, idx, isPublic) {
        let handlesCopy = Object.assign([], this.state.handles);
        handlesCopy[idx].IsTweetSchedulePublic = isPublic;
        this.setState({
            handles: handlesCopy
        });

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/toggle-public-schedule?handle=${handle.TwitterHandle}&isPublic=${isPublic}`, authHeaders);
    }

    async deleteAccount(handle, idx) {
        let handlesCopy = Object.assign([], this.state.handles);
        handlesCopy.splice(idx, 1);
        this.setState({
            handles: handlesCopy
        });


        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        await axios.delete(AppConfig.APP_SERVER_BASE_URL + `api/delete-twitter-account?handle=${handle.TwitterHandle}`, authHeaders);
    }

    async twitterSignIn() {

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let response = await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/twitter-auth-token`, authHeaders);
        window.location.replace(`https://api.twitter.com/oauth/authenticate?oauth_token=${response.data}`);
    }
    
    async getUserData() {
        return await getUserDataAsText(this.props.msalConfig);
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6 mb-3">
                    <h2 className="mb-3">Add new account</h2>
                    <p className="mb-3">
                        Add a new Twitter account to allow other users to request to post to the account, pending your approval.
                        Nothing will be posted to this account without your consent, and you can remove the
                        account at any time either in this app or via your Twitter application permissions. If you are
                        currently logged into Twitter, that account will automatically be authenticated.
                        Log out of Twitter or sign into a different account to add a different handle.
                    </p>

                    <button className="btn btn-dark" onClick={() => this.twitterSignIn()}>
                        <i className="fab fa-twitter fa-md twitter"></i> Sign in with Twitter
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <h2 className="mb-3">Your Twitter accounts</h2>
                    <p className="mb-3">
                        These are your current Twitter accounts registered within this application. Click <b>Settings</b> next to
                        each handle to edit account settings. Configurable settings include enabling private account status, and account deletion.
                        If you designate an account as private, it only appears in <b>your</b> list of handles when composing a tweet.
                    </p>
                    
                    {(!this.state.isLoadingHandles && this.state.handles.length > 0) &&
                        <DownloadButton
                        asyncGetData={this.getUserData}
                        fileName={"twitterapp-userdata.txt"}
                        contentType={'text/txt'}
                        buttonName={"Export my data"}
                        />
                    }
                    
                
                
                    {this.state.isLoadingHandles && this.loadingQueueDiv()}
                    <div className="list-group">
                        {
                            this.state.handles.map((handle, idx) => <AccountPane
                                handle={handle}
                                idx={idx}
                                disableAutoTweets={(handle, idx) => this.disableAutoTweets(handle, idx)}
                                enableAutoTweets={(handle, idx) => this.enableAutoTweets(handle, idx)}
                                togglePrivateAccount={(handle, idx, isPrivate) => this.togglePrivateAccount(handle, idx, isPrivate)}
                                deleteAccount={(handle, idx) => this.deleteAccount(handle, idx)}
                                togglePublicSchedule={(handle, idx, isPublic) => this.toggleMakeSchedulePublic(handle, idx, isPublic)}
                            />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}