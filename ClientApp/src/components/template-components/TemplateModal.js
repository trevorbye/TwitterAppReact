import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TemplateItem } from './TemplateItem';
import 'react-big-calendar/lib/css/react-big-calendar.css';



export class TemplateModal extends Component {

    constructor(props) {
        super(props);
        
        if(!props.template) throw Error("no template passed")
        
        this.state = {
            stringProps: JSON.stringify(props),
            template: props.template,
            name: "TemplateModal",
        }
    }
    async componentDidMount() {
        console.log("TemplateList componentDidMount " + new Date())
    }
    saveOrCancel(idx, type, id) {
        //this.props.approveOrCancel(idx, type, id);
    }

    getTitle() {
        if (this.props.canApprove) {
            return "Queue calendar";
        } else {
            return "Requests calendar";
        }
    }

    onClickCancelModal() {
        this.props.toggleModal()
    }
    

    render() {
        return (
            <Modal id="templateModal" isOpen={this.props.modalIsOpen} toggle={() => this.onClickCancelModal()} tabIndex="-1" size="xl">
                <ModalHeader id="templateModalHeader" toggle={() =>this.onClickCancelModal()}>{this.props.modalTitle}</ModalHeader>
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