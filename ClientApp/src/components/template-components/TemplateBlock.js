import React, { Component, Fragment } from 'react';
import { localeStatusTime } from '../utils/time-util';
import axios from 'axios';


export class TemplateBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canEdit: props.canEdit, // edit=true or new=false
            isValidTemplate: true,
            onSave: props.templateFormSave,
            template: props.template,
            createdPretty: "",
            settingsExpanded: false
        }
    }
    async componentDidMount() {

        const created = localeStatusTime(this.props.template.Created);
        console.log("TemplateBlock");
        this.setState({
            createdPretty: created
        });

    }

    renderEditTemplateForm() {

    }
    expandSettings() {
        this.setState({
            settingsExpanded: true
        });
    }
    renderRowSettings() {
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <h5 className="my-auto handles">{this.props.template.Title}</h5>
                    <button className="btn btn-primary my-auto" onClick={() => this.expandSettings()} data-testid="expand-template-settings">
                        Settings &nbsp; <i className="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="d-flex w-100 justify-content-between align-items-center">
                    <h5 className="handles">{this.state.template.Title}</h5>
                    <small>{this.state.createdPretty}</small>
                </div>

            </div>
        )
    }
}