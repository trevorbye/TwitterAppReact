import React, { Component } from "react";
import { pollInit } from "../utils/twitter-poll-util";

export class PollBlock extends Component {
  constructor(props) {
    super(props);
    
    let poll;
    
    // props.poll = { poll1: "", poll2:"", poll3:"", poll4:""}
    if (props.Poll && props.Poll.poll1) {
      poll = props.Poll;
    } else if (props.poll && props.poll.poll1) {
      poll = props.poll
    } else {
      poll = pollInit();
    }
    
    this.state = {
      poll,
      isReadOnly: (props.isReadOnly === false || props.isReadOnly==="false") ? false : true,
      childOf: props.caller
    }
    
  }
  componentDidMount() {
    
  }
  // valid means less than 25 char for a poll
  pollChange = (event, id) => {
      if (event.target.value.length < 26) {
        const newPoll = { ...this.state.poll, [id]: event.target.value };
        this.setState({ poll: newPoll });
        this.props.onChange(newPoll);
      }
  };
  
  showBlock() {
    // if editable or has at least 1 value
    return (!this.state.isReadOnly || this.state.poll.poll1) ? true : false;  
  }
  
  render() {
    return (
      this.showBlock() && 
      <div className="input-group mb-3" >
        <label className="sr-only" htmlFor="twitter-poll">
          Poll
        </label>
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-poll fa-lg"></i>
          </span>
          <div>
            <div>
              <div>
                <input
                  id="poll1"
                  type="text"
                  size="30"
                  max="25"
                  value={this.state.poll.poll1}
                  readOnly={this.state.isReadOnly}
                  onChange={(e) => this.pollChange(e, "poll1")}
                />
                <span className="badge">{this.state.poll.poll1.length}/25</span>
              </div>
              <div>
                <input
                  id="poll2"
                  type="text"
                  size="30"
                  max="25"
                  value={this.state.poll.poll2}
                  readOnly={this.state.isReadOnly}
                  onChange={(e) => this.pollChange(e, "poll2")}
                />
                <span className="badge">{this.state.poll.poll2.length}/25</span>
              </div>
              <div>
                <input
                  id="poll3"
                  type="text"
                  size="30"
                  max="25"
                  value={this.state.poll.poll3}
                  readOnly={this.state.isReadOnly}
                  onChange={(e) => this.pollChange(e, "poll3")}
                />
                <span className="badge">{this.state.poll.poll3.length}/25</span>
              </div>
              <div>
                <input
                  id="poll4"
                  type="text"
                  size="30"
                  max="25"
                  value={this.state.poll.poll4}
                  readOnly={this.state.isReadOnly}
                  onChange={(e) => this.pollChange(e, "poll4")}
                />
                <span className="badge">{this.state.poll.poll4.length}/25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
