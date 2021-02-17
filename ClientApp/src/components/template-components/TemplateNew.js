import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';

const baseUrl = "http://localhost:52937/";

const addTemplate = baseUrl + "api/tweet-template";

export class TemplateNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isValidTemplate: true,
            template: {}
        }
    }
    componentDidMount() {
    }
    templateDetailChange(e, name) {

        const templateTemp = Object.assign({}, this.state.template)
        templateTemp[name] = e.target.value;

        this.setState({
            template: templateTemp
        });
    }
    async templateFormSave() {
        
        const template = {
            TwitterHandle: "@Tdfberry"
        }
        
        const template1 = {
            
            TwitterHandle: "@Tdfberry",
            TweetUser: "",
            HandleUser:"",
            ChangedThresholdPercentage: 90,
            CodeChanges: 1,
            External: 1,
            NewFiles: 1,
            IgnoreMetadataOnly: 1,
            Title: "1",
            Channel: "1",
            MsServer: "1",
            GlobPath: "1",
            ForceNotifyTag: "1",
            QueryString: "1",
            Rss: "1"
        }
        
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let res = await axios.post(addTemplate, template, authHeaders);
        console.log(JSON.stringify(res));
    }
    render() {
        return (
            <div data-testid="new-pane">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Title
                        </span>
                    </div>
                    <input id="template-title" type="text" className="form-control"
                        value={this.state.title}
                        onChange={(e) => this.templateDetailChange(e, "title")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Changed Threshold Percentage
                        </span>
                    </div>
                    <input id="template-changedThresholdPercentage" type="number" max="100" min="0" className="form-control"
                        value={this.state.changedThresholdPercentage}
                        onChange={(e) => this.templateDetailChange(e, "changedThresholdPercentage")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Code Changes
                        </span>
                    </div>
                    <input id="template-codeChanges" type="text" className="form-control"
                        value={this.state.codeChanges}
                        onChange={(e) => this.templateDetailChange(e, "codeChanges")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            External
                        </span>
                    </div>
                    <input id="template-external" type="text" className="form-control"
                        value={this.state.external}
                        onChange={(e) => this.templateDetailChange(e, "external")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            New files
                        </span>
                    </div>
                    <input id="template-newFiles" type="text" className="form-control"
                        value={this.state.newFiles}
                        onChange={(e) => this.templateDetailChange(e, "newFiles")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Ignore Metadata Only
                        </span>
                    </div>
                    <input id="template-ignoreMetadataOnly" type="text" className="form-control"
                        value={this.state.ignoreMetadataOnly}
                        onChange={(e) => this.templateDetailChange(e, "ignoreMetadataOnly")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Channel
                        </span>
                    </div>
                    <input id="template-channel" type="text" className="form-control"
                        value={this.state.channel}
                        onChange={(e) => this.templateDetailChange(e, "channel")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            MS Service
                        </span>
                    </div>
                    <input id="template-msServer" type="text" className="form-control"
                        value={this.state.msServer}
                        onChange={(e) => this.templateDetailChange(e, "msServer")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Glob path
                        </span>
                    </div>
                    <input id="template-globPath" type="text" className="form-control"
                        value={this.state.globPath}
                        onChange={(e) => this.templateDetailChange(e, "globPath")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Force Notify Tag
                        </span>
                    </div>
                    <input id="template-forceNotifyTag" type="text" className="form-control"
                        value={this.state.forceNotifyTag}
                        onChange={(e) => this.templateDetailChange(e, "forceNotifyTag")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            QueryString
                        </span>
                    </div>
                    <input id="template-queryString" type="text" className="form-control"
                        value={this.state.queryString}
                        onChange={(e) => this.templateDetailChange(e, "queryString")}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            RSS
                        </span>
                    </div>
                    <input id="template-rss" type="text" className="form-control"
                        value={this.state.rss}
                        onChange={(e) => this.templateDetailChange(e, "rss")}
                    />
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <span>
                        <button
                            type="button"

                            className="btn btn-primary btn-sm" onClick={() => this.saveTemplate(this.state)}>Save</button>
                    </span>
                </div>
            </div>
        )
    }
}