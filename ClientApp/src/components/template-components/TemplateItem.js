import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';
import { getTwitterHandlesByUser, saveTemplate } from '../utils/database-utils';
import { DDLTwitterHandleByUser } from '../utils/component-utils';
import { DISPLAY_TYPE_ENUM } from '../utils/enums'

const baseUrl = "http://localhost:52937/";

const addTemplate = baseUrl + "api/tweet-template";

export class TemplateItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDirty: false,
            isValidTemplate: true,
            template: props.template,
            formDisabled: props.displayType == DISPLAY_TYPE_ENUM.DISPLAY ? true : false
        }
    }
    templateDetailChange(e, name) {

        const templateTemp = Object.assign({}, this.state.template)
        templateTemp[name] = e.target.value;

        this.setState({
            template: templateTemp,
            isDirty: true
        });
    }
    async onSubmit(e) {
        e.preventDefault();
        this.props.saveTemplate(this.props.msalConfig, this.state.template)
        this.props.collapseRow();
    }
    async onDelete(e) {
        e.preventDefault();
        this.props.deleteTemplate(this.props.msalConfig, this.props.template.Id, this.props.template.TwitterHandle)
        this.props.collapseRow();
    }

    async dropdownChange(event) {
        event.persist();

        this.setState({
            selectedHandle: event.target.value,
            publicHandleEvents: []
        });
    }

    async toggle(key, value) {

        const val = value === "true" ? 1 : 0;

        this.setState({
            [key]: val
        });
    }

    renderSaveButton() {
        return (
            <>
                <span className="save-button">
                    <button
                        disabled={this.state.isDirty ? false : true}
                        type="submit"
                        className="btn btn-primary btn-sm">Save</button>
                </span>

            </>
        )
    }
    renderDeleteButton() {
        return (
            <span className="delete-button">
                <button
                    type="button"
                    className="btn btn-danger my-auto template-delete"
                    onClick={(e) => this.onDelete(e)} data-testid="template-del-btn">
                    Delete &nbsp; <i className="fas fa-trash-alt"></i>
                </button>
            </span>
        )
    }
    renderCancelButton() {
        return (
            <span className="cancel-button">
                <button className="btn btn-secondary" onClick={() => this.props.collapseRow()}>
                    Cancel &nbsp; <i className="fas fa-chevron-up"></i>
                </button>
            </span>
        )
    }

    render() {
        return (
            <div data-testid="template-new">
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <fieldset disabled={this.state.formDisabled} style={this.state.formDisabled ? { pointerEvents: "none", opacity: "0.4"} : {}}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Title
                                 </span>
                            </div>
                            <input id="template-title" type="text" className="form-control"
                                value={this.state.template.Title}
                                onChange={(e) => this.templateDetailChange(e, "Title")}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Changed Threshold Percentage (0-100)
                        </span>
                            </div>
                            <input id="template-changedThresholdPercentage" type="number" max="100" min="0" className="form-control"
                                value={this.state.template.ChangedThresholdPercentage}
                                onChange={(e) => this.templateDetailChange(e, "ChangedThresholdPercentage")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Code Changes (Y/N)
                        </span>
                            </div>
                            <input id="template-codeChange" type="text" className="form-control"
                                value={this.state.template.CodeChanges}
                                onChange={(e) => this.templateDetailChange(e, "CodeChanges")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    External (Y/N)
                        </span>
                            </div>
                            <input id="template-external" type="text" className="form-control"
                                value={this.state.template.External}
                                onChange={(e) => this.templateDetailChange(e, "External")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    New files (Y/N)
                        </span>
                            </div>
                            <input id="template-newFiles" type="text" className="form-control"
                                value={this.state.template.NewFiles}
                                onChange={(e) => this.templateDetailChange(e, "NewFiles")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Ignore Metadata Only (Y/N)
                        </span>
                            </div>
                            <input id="template-ignoreMetadataOnly" type="text" className="form-control"
                                value={this.state.template.IgnoreMetadataOnly}
                                onChange={(e) => this.templateDetailChange(e, "IgnoreMetadataOnly")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Channel ()
                        </span>
                            </div>
                            <input id="template-channel" type="text" className="form-control"
                                value={this.state.template.Channel}
                                onChange={(e) => this.templateDetailChange(e, "Channel")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    MS.Service (app-service)
                        </span>
                            </div>
                            <input id="template-msServer" type="text" className="form-control"
                                value={this.state.template.MsServer}
                                onChange={(e) => this.templateDetailChange(e, "MsServer")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Glob path (**/app-service or ms.service - only care about 1 file or path)
                        </span>
                            </div>
                            <input id="template-globPath" type="text" className="form-control"
                                value={this.state.template.GlobPath}
                                onChange={(e) => this.templateDetailChange(e, "GlobPath")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Force Notify Tag (#notify - not meet threshold but is important)
                        </span>
                            </div>
                            <input id="template-forceNotifyTag" type="text" className="form-control"
                                value={this.state.template.ForceNotifyTag}
                                onChange={(e) => this.templateDetailChange(e, "ForceNotifyTag")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    QueryString (WT.mc_id=doc-feeds-initiative)
                        </span>
                            </div>
                            <input id="template-queryString" type="text" className="form-control"
                                value={this.state.template.QueryString}
                                onChange={(e) => this.templateDetailChange(e, "QueryString")}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    RSS (not relvant for twitter)
                        </span>
                            </div>
                            <input id="template-rss" type="text" className="form-control"
                                value={this.state.template.Rss}
                                onChange={(e) => this.templateDetailChange(e, "Rss")}
                            />
                        </div>
                        <div className="d-flex w-100 justify-content-between align-items-right">
                            
                            {(this.props.displayType == DISPLAY_TYPE_ENUM.EDIT || this.props.displayType == DISPLAY_TYPE_ENUM.NEW) && this.renderSaveButton()}
                            
                            {this.props.displayType == DISPLAY_TYPE_ENUM.EDIT &&
                                this.renderDeleteButton()}
                            
                            {this.renderCancelButton()}
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}