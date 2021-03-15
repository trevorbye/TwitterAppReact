import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import { parse } from 'query-string';
import axios from 'axios';
import { AppConfig } from "../config";

export class AccountRedirect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: true,
            success: false,
            handle: ""
        }
    }

    async componentDidMount() {
        let params = parse(this.props.location.search);
        let token = params.oauth_token;
        let verifier = params.oauth_verifier;

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        try {
            let res = await axios.get(AppConfig.APP_SERVER_BASE_URL + `api/convert-to-access-token?token=${token}&verifier=${verifier}`, authHeaders);
            this.setState({
                waiting: false,
                success: true,
                handle: res.data
            });
        } catch (error) {
            this.setState({
                waiting: false,
                handle: error.response.data.Message
            });
        }
    }

    render () {
        if (this.state.waiting) {
            return (
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-center" id="redirect-card">
                            <div className="card-body">
                                <i className="fas fa-spinner fa-pulse fa-4x"></i>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-center" id="redirect-card">
                            <div className="card-body">
                                {
                                    this.state.success ?
                                    <Fragment>
                                        <i className="far fa-check-circle fa-4x mb-3"></i>
                                        <h4 className="mt-3">{this.state.handle} successfully added.</h4>
                                    </Fragment> :
                                    <Fragment>
                                        <i className="fas fa-exclamation-triangle fa-4x mb-3"></i>
                                        <h4 className="mt-3">{this.state.handle} already exists.</h4>
                                    </Fragment>
                                }
                                <Link to="/account" className="btn btn-primary mt-3">Return to accounts</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}