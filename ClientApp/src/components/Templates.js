import React, { Component } from 'react';
import 'react-slidedown/lib/slidedown.css';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';
import {TemplateBlock} from './template-components/TemplateBlock'

const baseUrl = "http://localhost:52937/";
const addTemplate = baseUrl + "api/tweet-template";

export class Templates extends Component {
    constructor(props) {
        super(props);

        let twitterHandle = "";
        
        if (props && props.location && props.location.state && props.location.state.twitterHandle) {
            twitterHandle = props.location.state.twitterHandle;
        }
        
        // props from Link in AccountPane
        this.state = {
            twitterHandle: twitterHandle,
            list: []
        }

    }
    async componentDidMount() {
        
        const list = await this.getListTemplates();
        this.setState({
            list: list
        });
        

    }
    async getListTemplates() {
        let api = "api/tweet-templates";
        
        // if twitterHandle has value, get templates for that handle only
        if (this.state.twitterHandle) {
            api = "api/tweet-template";
        }
        
        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let res = await axios.get(baseUrl + api, authHeaders);

        return res.data;

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
    
    showNewTemplateForm() {
        return (
            <TemplateBlock
                templateFormSave="templateFormSame"
                twitterHandle={this.state.twitterHandle}
                edit={false}
                id="newTemplate"
            />
                
        )
    }

    render() {
        return (
            <div className="templates">
                <div>Templates for {this.state.twitterHandle}</div>

                <button type="button" onClick={() => this.showNewTemplateForm()}>New template</button>
                

            </div>


        )
    }
}