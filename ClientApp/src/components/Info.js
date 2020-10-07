import React, { Component } from 'react';

export class Info extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2>Want to contribute?</h2>
                    <p>
                        This project is open-source, and anyone at Microsoft is welcome to contribute. Our front-end is built in React, and you can submit
                        a <a href="https://github.com/trevorbye/TwitterAppReact">pull-request</a> for new features or bug-fixes. The back-end is a decoupled REST API built with .NET Framework Web API with various 
                        webjobs, and custom blob storage for binary media data. The repo for the API is private, but you can contact <b>trbye@microsoft.com</b> if you want to contribute.
                    </p>
                </div>
                <div className="col-md-6">
                    <div className="list-group">
                        <h3>
                            <a className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            target="_blank"
                            href="https://review.docs.microsoft.com/en-us/help/process/twitter-app?branch=master">
                                Documentation
                                <span className="badge badge-primary badge-pill pull-right"><i className="fas fa-book"></i></span>
                            </a>
                        </h3>
                        <h3>
                            <a className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            target="_blank"
                            href="https://mseng.visualstudio.com/TechnicalContent/_dashboards/dashboard/aaede41d-da80-4ef4-9e49-299c2f27a77c">
                                Azure Board
                                <span className="badge badge-primary badge-pill pull-right"><i className="fas fa-clipboard-list"></i></span>
                            </a>
                        </h3>
                        <h3>
                            <a className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            target="_blank"
                            href="https://mseng.visualstudio.com/TechnicalContent/_workitems/create/Feature?templateId=2f50ee01-afd9-4a9f-8bf4-c57dc3f49532&ownerId=29651307-cc5e-4537-adfe-173aae5f9d88">
                                Feedback / Feature request
                                <span className="badge badge-primary badge-pill pull-right"><i className="far fa-comments"></i></span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>   
        );
    }
}