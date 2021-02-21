import React, { Component } from 'react';
import { Tooltip, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { SlideDown } from 'react-slidedown';
import { Link } from 'react-router-dom';
import { TemplateBlock } from './TemplateBlock';
import { TemplateNew } from './TemplateNew';

export class TemplatePane extends Component {
    constructor(props) {
        super(props);

        this.hideSettings = this.hideSettings.bind(this);
        
        this.state = {
            settingsExpanded: false,
            deleteModalOpen: false,
            template: props.template,
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

    render() {
        if (this.state.settingsExpanded) {
            return (
                <SlideDown className={"settings-slidedown"}>
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="settings-pane mt-3">

                            {this.state.template && this.state.template.Id &&
                                <TemplateBlock
                                canEdit={false}
                                msalConfig={this.props.msalConfig}
                                template={this.state.template}
                                setList={this.props.setList}
                                />
                            }
                            
                            {this.state.template && !this.state.template.Id &&
                                <TemplateNew
                                msalConfig={this.props.msalConfig}
                                template={this.state.template}
                                type="new"
                                setList={this.props.setList}
                                collapse={this.hideSettings}
                                />
                            }


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
                            Modal Body Text
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-danger" onClick={() => this.deleteTemplate()}>Yes</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal()}>No</button>
                        </ModalFooter>
                    </Modal>

                </SlideDown>
            );
        } else {
            return (
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between align-items-left">
                        <span><h5>{this.props.template.Title}</h5><nbsp></nbsp>
                        { !this.props.type &&
                                (this.props.template.MsServer
                                ? `ms.service:${this.props.template.MsServer}`
                                : `glob path:${this.props.template.GlobPath}`)
                            }
                           
                        </span>
                        
                        {this.state.template.Id!=null && <button className="btn btn-primary my-auto" onClick={() => this.expandSettings()} data-testid="expand-account-settings">Settings&nbsp; <i className="fas fa-chevron-down"></i></button>}
                        
                        {this.state.template.Id === null && <button className="btn btn-success my-auto" onClick={() => this.expandSettings()} data-testid="expand-account-settings">New &nbsp; <i className="fas fa-chevron-down"></i></button>}

                    </div>
                </div>
            );
        }
    }
}