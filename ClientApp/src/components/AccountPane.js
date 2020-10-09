import React, { Component } from 'react';
import { Tooltip, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { SlideDown } from 'react-slidedown';

export class AccountPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsExpanded: false,
            mentionTooltipOpen: false,
            privateTooltipOpen: false,
            scheduleTooltipOpen: false,
            deleteModalOpen: false
        }
    }

    expandSettings() {
        this.setState({
            settingsExpanded: true
        });
    }

    hideSettings() {
        this.setState({
            settingsExpanded: false
        });
    }

    toggleMentionTooltip() {
        this.setState({
            mentionTooltipOpen: !this.state.mentionTooltipOpen
        });
    }

    togglePrivateTooltip() {
        this.setState({
            privateTooltipOpen: !this.state.privateTooltipOpen
        });
    }

    toggleScheduleTooltip() {
        this.setState({
            scheduleTooltipOpen: !this.state.scheduleTooltipOpen
        });
    }

    toggleModal() {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    deleteAccount() {
        this.setState({
            deleteModalOpen: false
        });
        this.props.deleteAccount(this.props.handle, this.props.idx);
    }

    render() {
        if (this.state.settingsExpanded) {
            return (
                <SlideDown className={"settings-slidedown"}>
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="settings-pane mt-3">

                            <div className="card-body">
                                <div className="card-title">
                                    <h5 className="my-auto handles">{this.props.handle.TwitterHandle}</h5>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-3">
                                    <p className="my-auto">Delete account</p>
                                    <button type="button" className="btn btn-danger my-auto" onClick={() => this.toggleModal()} data-testid="account-del-btn">
                                        Delete &nbsp; <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>

                                <div className="d-flex w-100 justify-content-between mb-3">
                                    <p className="my-auto">
                                        Enable automatic <span className="twitter">@mention</span> retweets <i className="fas fa-info-circle" id="retweet-tip"></i>
                                    </p>
                                    <Tooltip placement="top" target="retweet-tip" isOpen={this.state.mentionTooltipOpen} toggle={() => this.toggleMentionTooltip()}>
                                        When toggled on, any tweet mentioning <span className='twitter'>{this.props.handle.TwitterHandle}</span> will be added to your queue. Approving will automatically retweet the mention.
                                    </Tooltip>
                                    {
                                        this.props.handle.IsAutoRetweetEnabled ?
                                        <i className="fas fa-toggle-on fa-2x" onClick={() => this.props.disableAutoTweets(this.props.handle, this.props.idx)}></i> :
                                        <i className="fas fa-toggle-off fa-2x" onClick={() => this.props.enableAutoTweets(this.props.handle, this.props.idx)}></i>
                                    }
                                </div>

                                <div className="d-flex w-100 justify-content-between mb-3">
                                    <p className="my-auto">Private account <i className="fas fa-info-circle" id="private-tooltip"></i></p>
                                    <Tooltip placement="top" target="private-tooltip" isOpen={this.state.privateTooltipOpen} toggle={() => this.togglePrivateTooltip()}>
                                        When toggled on, this account is <b>hidden</b> to other users within this application. This is commonly used for <i>personal</i> accounts.
                                    </Tooltip>
                                    {
                                        this.props.handle.IsPrivateAccount ?
                                        <i className="fas fa-toggle-on fa-2x" onClick={() => this.props.togglePrivateAccount(this.props.handle, this.props.idx, false)}></i> :
                                        <i className="fas fa-toggle-off fa-2x" onClick={() => this.props.togglePrivateAccount(this.props.handle, this.props.idx, true)}></i>
                                    }
                                </div>

                                <div className="d-flex w-100 justify-content-between mb-3">
                                    <p className="my-auto">Enable public tweet schedule <i className="fas fa-info-circle" id="schedule-tooltip"></i></p>
                                    <Tooltip placement="top" target="schedule-tooltip" isOpen={this.state.scheduleTooltipOpen} toggle={() => this.toggleScheduleTooltip()}>
                                        When toggled on, this account's scheduled tweets will be <b>visible</b> to <b>all</b> users of this application. Tweet content is not displayed; only scheduled time and approval status are displayed.
                                    </Tooltip>
                                    {
                                        this.props.handle.IsTweetSchedulePublic ?
                                        <i className="fas fa-toggle-on fa-2x" onClick={() => this.props.togglePublicSchedule(this.props.handle, this.props.idx, false)}></i> :
                                        <i className="fas fa-toggle-off fa-2x" onClick={() => this.props.togglePublicSchedule(this.props.handle, this.props.idx, true)}></i>
                                    }
                                </div>

                            </div>

                            <div className="card-footer">
                                <div className="d-flex justify-content-end collapse">
                                    <button className="btn btn-secondary" onClick={() => this.hideSettings()}>
                                        Done &nbsp; <i className="fas fa-chevron-up"></i>
                                    </button>
                                </div>
                            </div>
                        
                        </div>
                    </div> 

                    <Modal isOpen={this.state.deleteModalOpen} toggle={() => this.toggleModal()} tabIndex="-1">
                        <ModalHeader toggle={() => this.toggleModal()}>Delete confirmation</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete your account? If you delete your account, any approved tweets will not be posted.
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-danger" onClick={() => this.deleteAccount()}>Yes</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal()}>No</button>
                        </ModalFooter>
                    </Modal>

                </SlideDown>
            );
        } else {
            return (
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h5 className="my-auto handles">{this.props.handle.TwitterHandle}</h5>
                        <button className="btn btn-primary my-auto" onClick={() => this.expandSettings()} data-testid="expand-account-settings">
                            Settings &nbsp; <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
            );
        }
    }
}