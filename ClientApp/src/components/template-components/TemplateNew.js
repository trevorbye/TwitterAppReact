import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';
import { getTwitterHandlesByUser, saveTemplate } from '../utils/database-utils';
import { DDLTwitterHandleByUser } from '../utils/component-utils';

const baseUrl = "http://localhost:52937/";

const addTemplate = baseUrl + "api/tweet-template";

export class TemplateNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isValidTemplate: true,
            template: props.template,
            msalConfig: props.msalConfig,
            setList: props.setList,
            collapse: props.collapse
        }
    }
    templateDetailChange(e, name) {

        const templateTemp = Object.assign({}, this.state.template)
        templateTemp[name] = e.target.value;

        this.setState({
            template: templateTemp
        });
    }
    async onSubmit(e) {
        e.preventDefault();
        const newList = await saveTemplate(this.state.msalConfig, this.state.template);
        this.state.setList(newList, true);
        this.state.collapse();
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
    
    render() {
        return (
            <div data-testid="template-new">
                <form onSubmit={(e) => this.onSubmit(e)}>
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
                <div className="d-flex w-100 justify-content-between">
                    <span>
                        <button
                            type="submit"

                            className="btn btn-primary btn-sm">Save</button>
                    </span>
                    </div>
                    </form>
            </div>
        )
    }
}