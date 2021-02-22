import React, { Component, Fragment } from 'react';
import 'react-slidedown/lib/slidedown.css';
import { TemplatePane } from './template-components/TemplatePane'
import { getTemplatesByHandleByUser, saveTemplate, updateTemplate, deleteTemplate } from './utils/database-utils'
import { DISPLAY_TYPE_ENUM } from './utils/enums'

const baseUrl = "http://localhost:52937/";

const listTemplates = baseUrl + "api/tweet-templates-by-handle";




export class Templates extends Component {
    constructor(props) {
        super(props);

        this.setList = this.setList.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        
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
            MsServer: "", // ms.service
            GlobPath: "",
            ForceNotifyTag: "#Notify",
            QueryString: "WT.mc_id=YOUR-ID-HERE",
            Rss: ""
        };
        
        
        // props from Link in AccountPane
        this.state = {
            name: "template",
            msalConfig: props.msalConfig,
            twitterHandle: twitterHandle,
            isLoading: true,
            list: [],
            newTemplate: newTemplate
        }

    }
    async componentDidMount() {
        this.loadTemplates(this.state.msalConfig, this.state.twitterHandle)
        console.log("Template componentDidMount " + new Date())
    }
    
    // new and update
    async saveTemplate(msalConfig, template) {
        
        let newList = [];
        
        if (template.Id != null) {
            newList = await updateTemplate(msalConfig, template);
        } else {
            newList = await saveTemplate(msalConfig, template);
        }
        this.setList(newList);
    }
    
    // delete
    async deleteTemplate(msalConfig, id, twitterHandle) {
        const updatedList = await deleteTemplate(msalConfig, id, twitterHandle);
        this.setList(updatedList);
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
    
    loadingTemplateDiv() {
        return (
            <div className="d-flex p-3 align-items-left border border-common rounded">
                <strong>Loading templates...</strong>
                <div className="spinner-border text-success ml-auto" role="status" aria-hidden="true"></div>
            </div>
        );
    }

    render() {
        return (
            <div className="templates">
                <h4>Templates for {this.state.twitterHandle}</h4>

                {this.state.isLoading && this.loadingTemplateDiv()}

                { !this.state.isLoading  &&
                <div className="list-group templates">
                
                    <TemplatePane
                        msalConfig={this.props.msalConfig}
                        template={this.state.newTemplate}
                        displayType={DISPLAY_TYPE_ENUM.NEW}
                        setList={this.setList}
                        refresh={this.state.refresh}
                        saveTemplate={this.saveTemplate}
                        deleteTemplate={null}
                        
                    />
                    { this.state.list && this.state.list.length > 0 ? 
                        this.state.list.map((template, index) => <TemplatePane
                        displayType={DISPLAY_TYPE_ENUM.EDIT}
                        msalConfig={this.props.msalConfig}
                            template={template}
                        
                        idx={index}
                        key={index}
                            canEdit={true}
                            setList={this.setList}
                            deleteTemplate={this.deleteTemplate}
                            saveTemplate={this.saveTemplate}
                        />)
                        : <span></span>
                    }
                    </div>
                }
            </div>
        )
    }
}