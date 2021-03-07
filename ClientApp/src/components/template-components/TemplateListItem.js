import React, { Component } from 'react';
import { getHumanReadableTime, localeStatusTime } from '../utils/time-util';

/**
 * Displays list of templates with a few details and edit/delete buttons
 */
export class TemplateListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsExpanded: false,
            toggleModal: props.toggleModal,
            deleteModalOpen: false,
            name: "templateList",
        }
    }
    openModal() {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }
    
    onClickEdit() {
        this.props.renderModal(this.props.template)
    }

    onClickDelete() {
        this.props.deleteTemplate(this.props.template.Id, this.props.template.TwitterHandle);
    }
    
    render() {
        return (
            <div className="templatePane-debug">
                <div className="list-group-item list-group-item-action flex-column align-items-start collapsed">
                    <div className="d-flex w-100 justify-content-between align-items-left collapsed">
                        <div id="left-column">
                            <div><h5 className="handles"> {this.props.template.Title}</h5>
                               
                            </div>

                            <div>
                                <small className="my-auto">{this.props.template.SearchBy}</small>
                            </div>
                            <div>
                                <i className="far fa-clock fa-sm"></i>
                                <small className="my-auto ml-1">{localeStatusTime(this.props.template.Modified)}</small>
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={() => this.onClickEdit()}
                                data-testid="account-template-edit">Edit
                            </button>
                            <i
                                className="fas fa-trash-alt ml-1 trash-hover"
                                onClick={() => this.onClickDelete()}></i></div>

                    </div>
                </div>
            </div>
        )
    }
}