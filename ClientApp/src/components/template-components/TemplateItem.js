import React, { Component, Fragment } from 'react';
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
            formDisabled: props.displayType == DISPLAY_TYPE_ENUM.DISPLAY ? true : false,
            name: "templateItem",
            refresh: props.refresh
        }
    }
    async componentDidMount() {
        console.log("TemplateItem componentDidMount " + new Date())
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
    templateDetailChange(e, name) {

        this.setDetailState(name, e.target.value)
    }
    setDetailState(name, value) {
        const templateTemp = Object.assign({}, this.state.template)
        templateTemp[name] = value;
        
        this.setState({
            template: templateTemp,
            isDirty: true
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
                                    Code Changes (Y/N)
                        </span>
                            </div>
                            <input id="template-codeChange" type="checkbox" className="template-input checkbox"
                                aria-label="Enable Code Changes"
                                value={this.state.template.CodeChanges}
                                checked={this.state.template.CodeChanges === 1 ? true : false}
                                onChange={(e) => this.setDetailState("CodeChanges", this.state.template.CodeChanges === 1 ? 0 : 1)}
                            />
                            
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    External (Y/N)
                        </span>
                            </div>
                            <input id="template-external" type="checkbox" className="template-input checkbox"
                                aria-label="Enable External"
                                value={this.state.template.External}
                                checked={this.state.template.External === 1 ? true : false}
                                onChange={(e) => this.setDetailState("External", this.state.template.External === 1 ? 0 : 1)}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    New files (Y/N)
                        </span>
                            </div>
                            <input id="template-newFiles" type="checkbox" className="template-input checkbox"
                                aria-label="Enable NewFiles"
                                value={this.state.template.NewFiles}
                                checked={this.state.template.NewFiles === 1 ? true : false}
                                onChange={(e) => this.setDetailState("NewFiles", this.state.template.NewFiles === 1 ? 0 : 1)}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Ignore Metadata Only (Y/N)
                        </span>
                            </div>
                            <input id="template-ignoreMetadataOnly" type="checkbox" className="template-input checkbox"
                                aria-label="Enable IgnoreMetadataOnly"
                                value={this.state.template.IgnoreMetadataOnly}
                                checked={this.state.template.IgnoreMetadataOnly === 1 ? true : false}
                                onChange={(e) => this.setDetailState("IgnoreMetadataOnly", this.state.template.IgnoreMetadataOnly === 1 ? 0 : 1)}
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
                                    Search for
                                </span>
                            </div>
                            <div>
                                <input id="template-msServer" type="radio" className="form-control"
                                value={this.state.template.MsServer}
                                onChange={(e) => this.templateDetailChange(e, "MsServer")}
                                />
                                <input id="template-msServer" type="radio" className="form-control"
                                value={this.state.template.GlobPath}
                                onChange={(e) => this.templateDetailChange(e, "GlobPath")}
                                />
                                <input id="template-service-path" type="text" className="form-control"
                                value={this.state.template.searchType === 'service'? this.state.templage.MsService : this.state.template.GlobPath}
                                onChange={(e) => this.templateDetailChange(e, "GlobPath")}
                                />
                            </div>
                                
                            
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
                {JSON.stringify(this.state.template)}
            </div>
        )
    }
}