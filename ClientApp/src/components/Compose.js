import React, { Component } from 'react';

export class Compose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="col-md-6">
                <h2 className="mb-3">Compose and schedule</h2>
                <p className="mb-3">
                    Select a handle, compose a tweet, and choose a time when the status will be posted to the account. The
                    request will be routed to the handle owner for approval.
                </p>
            </div>
        );
    }

}
