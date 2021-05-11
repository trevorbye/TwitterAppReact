import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { DISPLAY_TYPE_ENUM, TEMPLATE_SEARCH_TYPE } from '../utils/enums'

/**
 * Displays template form for insert or update. 
 */
export class TemplateItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDirty: false,
            template: props.template,
            formDisabled: props.displayType == DISPLAY_TYPE_ENUM.DISPLAY ? true : false,
            name: "templateItem"
        }
    }
    componentDidMount() {
        if (!this.state.template ||
            !this.props.template ||
            !this.props.saveTemplate) throw Error("template props not passed in correctly")
    }
    // --------------------------------------------------------
    // External - Save to Database
    async onSubmit(e) {
        e.preventDefault();
        this.props.saveTemplate(this.state.template)
    }
    
    // --------------------------------------------------------
    // Internal controls
    onCheckboxBtnClick = (searchType) => {
        this.setDetailState("SearchType", searchType);
    }
    templateDetailChange(e, name) {

        this.setDetailState(name, e.target.value)
    }
    // Change internal template
    setDetailState(name, value) {
        const templateTemp = Object.assign({}, this.state.template)
        templateTemp[name] = value;

        this.setState({
            template: templateTemp,
            isDirty: true
        });
    }

    render() {
        return (
            <div data-testid="template-new-update">

                <form onSubmit={(e) => this.onSubmit(e)}>
                    <fieldset disabled={this.state.formDisabled} style={this.state.formDisabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                        
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
                                    Full GitHub Repository Url
                                 </span>
                            </div>
                            <input id="template-fullrepourl" type="text" className="form-control"
                                value={this.state.template.FullRepoUrl}
                                onChange={(e) => this.templateDetailChange(e, "FullRepoUrl")}
                            />
                        </div>                        


                        <div className="d-flex w-100 justify-content-between mb-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Code Changes
                                        </span>
                                </div>
                                <input id="template-codeChange" type="checkbox" className="template-input-checkbox checkbox"
                                    aria-label="Enable Code Changes"
                                    value={this.state.template.CodeChanges}
                                    checked={this.state.template.CodeChanges}
                                    onChange={(e) => this.setDetailState("CodeChanges", this.state.template.CodeChanges === true ? false : true)}
                                />

                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        External
                            </span>
                                </div>
                                <input id="template-external" type="checkbox" className="template-input-checkbox checkbox"
                                    aria-label="Enable External"
                                    value={this.state.template.External}
                                    checked={this.state.template.External}
                                    onChange={(e) => this.setDetailState("External", this.state.template.External === true ? false : true)}
                                />
                            </div>
                        </div>



                        <div className="d-flex w-100 justify-content-between mb-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        New files
                                    </span>
                                </div>
                                <input id="template-newFiles" type="checkbox" className="template-input-checkbox checkbox"
                                    aria-label="Enable NewFiles"
                                    value={this.state.template.NewFiles}
                                    checked={this.state.template.NewFiles}
                                    onChange={(e) => this.setDetailState("NewFiles", this.state.template.NewFiles === true ? false : true)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Ignore Metadata Only
                                    </span>
                                </div>
                                <input id="template-ignoreMetadataOnly" type="checkbox" className="template-input-checkbox checkbox"
                                    aria-label="Enable IgnoreMetadataOnly"
                                    value={this.state.template.IgnoreMetadataOnly}
                                    checked={this.state.template.IgnoreMetadataOnly}
                                    onChange={(e) => this.setDetailState("IgnoreMetadataOnly", this.state.template.IgnoreMetadataOnly === true ? false : true)}
                                />

                            </div>
                        </div>


                        <div className="d-flex w-100 justify-content-between mb-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Changed Threshold %
                                    </span>
                                </div>
                                <input id="template-changedThresholdPercentage" type="number" max="100" min="0" className="template-input w-25"
                                    value={this.state.template.ChangedThresholdPercentage}
                                    onChange={(e) => this.templateDetailChange(e, "ChangedThresholdPercentage")}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Force Notify Tag (#notify)
                        </span>
                                </div>
                                <input id="template-forceNotifyTag" type="text" className="form-control"
                                    value={this.state.template.ForceNotifyTag}
                                    onChange={(e) => this.templateDetailChange(e, "ForceNotifyTag")}
                                />
                            </div>

                        </div>

                        <div className="d-flex w-100 justify-content-between mb-3">
                            <div className="input-group mb-3">
                                
                                
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Search Type
                                    </span>
                                </div>
                                <div className="template-input">
                                    <ButtonGroup >
                                        <Button color={this.state.template.SearchType === TEMPLATE_SEARCH_TYPE.SERVICE_SLUG ? "primary" : "secondary"} onClick={() => this.onCheckboxBtnClick(TEMPLATE_SEARCH_TYPE.SERVICE_SLUG)} active={this.state.template.SearchType === TEMPLATE_SEARCH_TYPE.SERVICE_SLUG}>Service slug</Button>
                                        <Button color={this.state.template.SearchType === TEMPLATE_SEARCH_TYPE.GLOB_PATH ? "primary" : "secondary"} onClick={() => this.onCheckboxBtnClick(TEMPLATE_SEARCH_TYPE.GLOB_PATH)} active={this.state.template.SearchType === TEMPLATE_SEARCH_TYPE.GLOB_PATH}>Glob path</Button>
                                    </ButtonGroup>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Search Text
                                    </span>
                                </div>
                                <input id="template-search" type="text" className="form-control"
                                    value={this.state.template.SearchBy}
                                    onChange={(e) => this.templateDetailChange(e, "SearchBy")}
                                />
                            </div>
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
                                    Template text (boilerplate)
                        </span>
                            </div>

                            <textarea className="form-control"
                                rows="5"
                                id="body-text"
                                value={this.state.template.TemplateText}
                                onChange={(e) => this.templateDetailChange(e, "TemplateText")}
                            >
                            </textarea>


                        </div>
                        <div className="d-flex w-100 justify-content-between align-items-right">

                            {(this.props.displayType == DISPLAY_TYPE_ENUM.EDIT || this.props.displayType == DISPLAY_TYPE_ENUM.NEW) && 
                            
                            <span className="save-button">
                            <button
                                disabled={this.state.isDirty ? false : true}
                                type="submit"
                                className="btn btn-primary btn-sm">Save</button>
                            </span>
                            
                            }

                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}