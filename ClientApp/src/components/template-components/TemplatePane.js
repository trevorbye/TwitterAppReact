import React, { Component } from 'react';
import { Tooltip, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { SlideDown } from 'react-slidedown';
import { TemplateDisplay } from './TemplateDisplay.js.old';
import { TemplateItem } from './TemplateItem';
import { DISPLAY_TYPE_ENUM } from '../utils/enums'

import { getHumanReadableTime, localeStatusTime } from '../utils/time-util';

export class TemplatePane extends Component {
    constructor(props) {
        super(props);

        this.collapseRow = this.collapseRow.bind(this);

        this.state = {
            settingsExpanded: false,
            deleteModalOpen: false,
            refresh: props.refresh,
            name: "templatePane",
        }
    }
    async componentDidMount() {
        console.log("TemplatePane componentDidMount " + new Date())
    }
    expandRow() {
        this.setState({
            settingsExpanded: true
        });
    }

    collapseRow() {
        this.setState({
            settingsExpanded: false
        });
    }

    toggleModal() {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    deleteTemplate() {
        this.setState({
            deleteModalOpen: false
        });
        //this.props.deleteTemplate(this.props.handle, this.props.idx);
    }

    renderExpanded() {
        return (
            <SlideDown className={"settings-slidedown expanded"}>
                <div className="list-group-item list-group-item-action flex-column align-items-start expanded">
                    <div className="settings-pane mt-3 expanded">

                        <TemplateItem
                        refresh={this.props.refresh}
                        msalConfig={this.props.msalConfig}
                        template={this.props.template}
                        saveTemplate={this.props.saveTemplate}
                        deleteTemplate={this.props.deleteTemplate}
                        displayType={this.props.displayType}
                        collapseRow={() => this.collapseRow()}
                        />

                        <div className="card-footer">
                            <div className="d-flex justify-content-end collapse">
                                { this.state.displayType == DISPLAY_TYPE_ENUM.NOOP &&
                                    <button className="btn btn-secondary" onClick={() => this.collapseRow()}>
                                        Done &nbsp; <i className="fas fa-chevron-up"></i>
                                    </button>
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <Modal isOpen={this.state.deleteModalOpen} toggle={() => this.toggleModal()} tabIndex="-1">
                    <ModalHeader toggle={() => this.toggleModal()}>Delete confirmation</ModalHeader>
                    <ModalBody>
                        Modal Body Text
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={() => this.deleteTemplate()}>Yes</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal()}>No</button>
                    </ModalFooter>
                </Modal>

            </SlideDown>
        );
    }

    renderRowButtonsCollapsed() {

        if (this.props.displayType == DISPLAY_TYPE_ENUM.EDIT) {
            // edit pane
            return (
                <button className="btn btn-primary my-auto collapsed" onClick={() => this.expandRow()} data-testid="expand-account-settings">Settings&nbsp; <i className="fas fa-chevron-down"></i></button>)
        } else if (this.props.displayType == DISPLAY_TYPE_ENUM.NEW){
            // new 
            return (
                <button className="btn btn-success my-auto collapsed" onClick={() => this.expandRow()} data-testid="expand-account-settings">New &nbsp; <i className="fas fa-chevron-down"></i></button>)
        } else {
            // display pane 
            return (
                <span className="display-pane"></span>
            )
        }
    }

    renderRowTextCollapsed() {
        if (this.props.displayType == DISPLAY_TYPE_ENUM.EDIT) {
            return (<span className="collapsed" ><h5>{this.props.template.Title}</h5>
                <div>{this.props.template.MsServer
                    ? `ms.service: ${this.props.template.MsServer}`
                    : this.props.template.GlobPath ? `glob path: ${this.props.template.GlobPath}` : ""}
                    <div>{localeStatusTime(this.props.template.Modified)}</div>
                </div>
            </span>)

        } else {
            // push button to right with span
            return (<span className="collapsed"></span>)
        }
    }

    renderCollapsed() {
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start collapsed">
                <div className="d-flex w-100 justify-content-between align-items-left collapsed">
                    {this.renderRowTextCollapsed()}
                    {this.renderRowButtonsCollapsed()}

                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="templatePane-debug">
                { this.state.settingsExpanded
                    ? this.renderExpanded()
                    : this.renderCollapsed()
                }
            </div>
        )
    }
}