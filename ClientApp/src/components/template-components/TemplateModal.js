import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TemplateItem } from './TemplateItem';
import 'react-big-calendar/lib/css/react-big-calendar.css';


/**
 * Displays modal behavior and presentation. 
 */
export class TemplateModal extends Component {

    constructor(props) {
        super(props);
        
        if (!props.template) throw Error("no template passed")
        if (!props.displayType) throw Error("no displayType passed")
        if (!props.saveTemplate) throw Error("no saveTemplate passed")
        if (!props.deleteTemplate) throw Error("no deleteTemplate passed")
        
        this.state = {
            template: props.template,
            name: "TemplateModal"
        }
    }
    onClickCancelModal() {
        this.props.toggleModal()
    }

    render() {
        
        let modalTitle = (!this.props.template) ? "" : (this.props.template.Id) ? `Update ${this.props.template.Title}` : `New template`;
        
        return (
            <Modal id="templateModal" isOpen={this.props.modalIsOpen} toggle={() => this.onClickCancelModal()} tabIndex="-1" size="xl">
                <ModalHeader id="templateModalHeader" toggle={() =>this.onClickCancelModal()}>{modalTitle}</ModalHeader>
                <ModalBody id="templateModalBody">
                    <TemplateItem
                        template={this.props.template}
                        displayType={this.props.displayType}
                        saveTemplate={this.props.saveTemplate}
                        deleteTemplate={this.props.deleteTemplate}
                    ></TemplateItem>
                </ModalBody>
            </Modal>
        );
    }
}