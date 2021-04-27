import React, { Component, Link } from "react";
import * as timeUtils from '../utils/time-util';

export class ScheduledDateAndTime extends Component {

  renderTimeComponent() {
    return (
      <input
        id="tweet-time"
        type="time"
        className="form-control"
        value={this.props.time}
        onChange={(e) => this.props.timeChange(e)}
      />
    );
  }
  renderDateComponent() {
    return (
      <input
        id="tweet-date"
        type="date"
        max="3000-12-31"
        min="1000-01-01"
        className="form-control"
        value={this.props.date}
        onChange={(e) => this.props.dateChange(e)}
      />
    );
  }

  renderTextForEntry() {
    return (
      <div>
        <label>
          Leave either date <strong>or</strong> time blank to post the tweet as
          soon as it's approved.
        </label>
        <label className="sr-only" for="tweet-date">
          Schedule tweet date
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="scheduledDateAndTime">
        <div className="input-group mb-3">
          {!this.props.edit && this.renderTextForEntry()}
          <div className="input-group-prepend">
            <span className="input-group-text">Scheduled date & time</span>
          </div>
          {this.renderDateComponent()}
          {this.renderTimeComponent()}
        </div>
        <div className="input-group mb-3">
                <span className="badge">{timeUtils.timeZoneName(this.props.now)}/{timeUtils.timeZoneOffset(this.props.now)} </span>
        </div>
      </div>
    );
  }
}
