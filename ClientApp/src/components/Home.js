import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    render () {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <h5 className="card-title">Account portal</h5>
                                <p className="card-text">Manage Twitter accounts and user settings.</p>
                                <h2>
                                    <Link to="/account">
                                        <i className="fa fa-user fa-3x home-icons"></i>
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <h5 className="card-title">Tweet portal</h5>
                                <p className="card-text">Compose and schedule tweets.</p>
                                <h2>
                                    <Link to="/tweet-portal">
                                        <i className="fab fa-twitter fa-3x home-icons"></i>
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-12">
                        <p>
                            The purpose of this application is to provide Twitter account sharing on a tweet-by-tweet approval basis, rather than granting unlimited permission to another user.
                            You authorize this application with your Twitter account(s), and Microsoft internal users can compose and schedule a tweet to your account. If you approve the tweet, it will be
                            posted by an automated service at the scheduled time.

                            Get started by visiting the <Link to="/account">account portal</Link> to add a Twitter account, or visit the <Link to="/tweet-portal">tweet portal</Link> to compose
                            and schedule a tweet to any configured account.
                        </p>
                        <div className="alert alert-info mt-2" role="alert">
                            <h6 className="alert-heading"><i className="fas fa-info-circle"></i> Note</h6>
                            <br />
                            <p className="mb-0">
                                <a href="https://microsoft.sharepoint.com/teams/Sprinklr/SitePages/Home.aspx" target="_blank">Sprinklr <i className="fas fa-xs fa-external-link-alt"></i></a>​​​​​​ is the platform of record for managing Microsoft's social media accounts, and is required for all publishing and engagement for any social account with more than 1,000 fans/followers.
                            </p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
