import React, { Component, Fragment } from 'react';
import 'react-slidedown/lib/slidedown.css';
import { TemplateModal } from './template-components/TemplateModal'
import { TemplateListItem } from './template-components/TemplateListItem'
import { getTemplatesByHandleByUser, saveTemplate, updateTemplate, deleteTemplate } from './utils/database-utils'
import { DISPLAY_TYPE_ENUM, TEMPLATE_SEARCH_TYPE } from './utils/enums'
import { Tooltip, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = "http://localhost:52937/";

const listTemplates = baseUrl + "api/tweet-templates-by-handle";

export class Templates extends Component {
    constructor(props) {
        super(props);

        this.setList = this.setList.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        let twitterHandle = "";

        if (props && props.location && props.location.state && props.location.state.twitterHandle) {
            twitterHandle = props.location.state.twitterHandle;
        }

        const newTemplate = {
            Id: null,
            TwitterHandle: twitterHandle, // posted with tweet handle 
            TweetUser: "", // tweet creator
            HandleUser: "", // tweet approver
            Title: "Your new title",
            ChangedThresholdPercentage: 70,
            Channel: "",
            CodeChanges: 0,
            External: 0,
            NewFiles: 1,
            IgnoreMetadataOnly: 1,
            SearchType: TEMPLATE_SEARCH_TYPE.GLOB_PATH,
            SearchBy: "",
            ForceNotifyTag: "#Notify",
            QueryString: "WT.mc_id=YOUR-ID-HERE",
            Rss: "",
            TemplateText: "New updates for {ms.service} [{title}]({filename})"
        };


        // props from Link in AccountPane
        this.state = {
            name: "template",
            msalConfig: props.msalConfig,
            twitterHandle: twitterHandle,
            isLoading: true,
            list: [],
            newTemplate: newTemplate,
            modalIsOpen: false,
            displayType: DISPLAY_TYPE_ENUM.READ_ONLY,
            currentTemplate: newTemplate
        }

    }
    async componentDidMount() {
        this.loadTemplates(this.state.msalConfig, this.state.twitterHandle)
        console.log("Template componentDidMount " + new Date())
    }
    async loadTemplates(msalConfig, twitterHandle) {
        const list = await getTemplatesByHandleByUser(msalConfig, twitterHandle);
        this.setList(list);
    }
    async setList(list) {
        console.log("template.js::setList");
        this.setState({
            list: list,
            isLoading: false,
            refresh: new Date()
        });
    }
    

    // new and update
    async saveTemplate(template) {

        let newList = [];

        if (template.Id != null) {
            newList = await updateTemplate(this.props.msalConfig, template);
        } else {
            newList = await saveTemplate(this.props.msalConfig, template);
        }
        this.setList(newList);
        
        this.setState({
            modalIsOpen: false,
            currentTemplate: null
        })
    }

    // delete
    async deleteTemplate(id, twitterHandle) {
        const updatedList = await deleteTemplate(this.props.msalConfig, id, twitterHandle);
        this.setList(updatedList);
        this.setState({
            modalIsOpen: false,
            currentTemplate: null
        })
    }
    toggleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }
    
    renderModalExistingTemplate(template) {
        
        this.setState({
            currentTemplate: template,
            modalIsOpen: true,
            displayType: DISPLAY_TYPE_ENUM.EDIT
        });
    }
    renderModalNewTemplate() {
        this.setState({
            currentTemplate: this.state.newTemplate,
            modalIsOpen: true,
            displayType: DISPLAY_TYPE_ENUM.NEW 
        });
    }

    renderLoading() {
        return (
            <div className="d-flex p-3 align-items-left border border-common rounded">
                <strong>Loading templates...</strong>
                <div className="spinner-border text-success ml-auto" role="status" aria-hidden="true"></div>
            </div>
        );
    }
    renderTemplates() {

        if (!this.state.list || this.state.list.length == 0) {
            return (<div>Add a new template</div>)
        } else {
            return (

                <div className="templates-list">

                    {this.state.list.map((template, index) => 

                        <TemplateListItem
                                displayType={DISPLAY_TYPE_ENUM.EDIT}
                                renderModal={(index) => this.renderModalExistingTemplate(index)}
                                msalConfig={this.props.msalConfig}
                                template={template}
                                idx={index}
                                key={index}
                                modalTitle={`${this.state.twitterHandle} template ${this.state.twitterHandle.Id}`}
                                deleteTemplate={this.deleteTemplate}
                                saveTemplate={this.saveTemplate}
                            />
                    )}
                </div>
            )
        }
    }

    render() {

        const tableName = `Templates for ${this.state.twitterHandle}`

        return (

            <div>
                <Row >
                    <div className="col-md-12 mb-3">
                        <Col className="text-left">{tableName}</Col>
                        <Col className="text-right"><button className="btn btn-success my-auto" onClick={() => this.renderModalNewTemplate()}>New</button></Col>
                    </div>
                </Row>
                <Row>
                    <div className="col-md-12 mb-3">
                        {this.state.isLoading
                            ? this.renderLoading()
                            : this.renderTemplates()}
                    </div>
                </Row>
                <TemplateModal
                    displayType={this.state.displayType}
                    template={this.state.currentTemplate}
                    key={`templateModal`}
                    deleteTemplate={this.deleteTemplate}
                    saveTemplate={this.saveTemplate}
                    toggleModal={this.toggleModal}
                    modalIsOpen={this.state.modalIsOpen}
                />
               
            </div>

        )
    }
}