import React, { Component, Fragment } from 'react';
import 'react-slidedown/lib/slidedown.css';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';
import { TemplatePane } from './template-components/TemplatePane'
import { getTemplatesByHandleByUser, saveTemplate } from './utils/database-utils'

const baseUrl = "http://localhost:52937/";

const listTemplates = baseUrl + "api/tweet-templates-by-handle";




export class Templates extends Component {
    constructor(props) {
        super(props);

        this.setList = this.setList.bind(this);
        
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
            msalConfig: props.msalConfig,
            twitterHandle: twitterHandle,
            isLoading: true,
            list: [],
            newTemplate: newTemplate
        }

    }
    async componentDidMount() {
        this.loadTemplates(this.state.msalConfig, this.state.twitterHandle)
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
                <div>Templates for {this.state.twitterHandle}</div>

                {this.state.isLoading && this.loadingTemplateDiv()}

                { !this.state.isLoading && this.state.list && this.state.list.length > 0 &&
                <div className="list-group">
                
                    <TemplatePane
                        msalConfig={this.props.msalConfig}
                        template={this.state.newTemplate}
                        type={'new'}
                        setList={this.setList}
                        refresh={new Date()}
                    />
                    {
                        this.state.list.map((template, index) => <TemplatePane
                        msalConfig={this.props.msalConfig}
                        template={template}
                        idx={index}
                        key={index}
                            canEdit={true}
                            setList={this.setList}
                    />)
                    }
                    </div>
                }

            </div>


        )
    }
}