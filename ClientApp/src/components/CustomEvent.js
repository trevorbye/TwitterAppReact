/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export class CustomEvent extends Component {

    render() {
        const postedBadge = this.props.event.posted ? 
        <span className="badge badge-success cal-badge mr-1"><i className="fab fa-twitter-square fa-sm twitter cal-twitter"></i></span> : null;

        const approvedBadge = this.props.event.approved ?
        <span className="badge badge-success cal-badge mr-1"><i className="fas fa-check fa-sm"></i></span> :
        <span className="badge badge-success cal-badge mr-1"><i className="fas fa-times-circle fa-sm"></i></span>

        let approveButton = null;
        if (!this.props.event.posted) {
            if (this.props.event.approved) {
                approveButton = <span className="badge badge-warning mr-1 cal-approve" onClick={() => this.props.approveOrCancelFromCal(-1, 'cancel', this.props.event.tweetQueueId)}>Cancel</span>
            } else {
                approveButton = <span className="badge badge-warning mr-1 cal-approve" onClick={() => this.props.approveOrCancelFromCal(-1, 'approve', this.props.event.tweetQueueId)}>Approve</span>
            }
        }

        return (
            <div className="d-flex align-items-center">
                <span className="badge badge-success cal-badge mr-1">{this.props.event.handle}</span> 
                {approveButton}
                {approvedBadge}
                {postedBadge} 
                {this.props.event.title} 
            </div>
        );
    }
}

export class StandardEvent extends Component {

    render() {
        const postedBadge = this.props.event.posted ? 
        <span className="badge badge-success cal-badge mr-1"><i className="fab fa-twitter-square fa-sm twitter cal-twitter"></i></span> : null;

        const approvedBadge = this.props.event.approved ?
        <span className="badge badge-success cal-badge mr-1"><i className="fas fa-check fa-sm"></i></span> :
        <span className="badge badge-success cal-badge mr-1"><i className="fas fa-times-circle fa-sm"></i></span>

        return (
            <div className="d-flex align-items-center">
                <span className="badge badge-success cal-badge mr-1">{this.props.event.handle}</span> 
                {approvedBadge}
                {postedBadge} 
                {this.props.event.title} 
            </div>
        );
    }
}