import React, { Component, Fragment } from 'react';
import 'react-slidedown/lib/slidedown.css';
import { getAuthHeadersSilent } from './auth-utils/auth-config';
import axios from 'axios';
import { TemplatePane } from './template-components/TemplatePane'

const baseUrl = "http://localhost:52937/";

const listTemplates = baseUrl + "api/tweet-templates-by-handle";

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
            isLoading: true,
            list: [],
            newTemplate: {}
        }

    }
    async componentDidMount() {
        
        const list = await this.getListTemplates();
        this.setState({
            list: list,
            isLoading: false,
            newTemplate: {
                Id: null,
                TwitterHandle: this.state.twitterHandle,
                TweetUser: "",
                HandleUser: "",
                ChangedThresholdPercentage: 100,
                CodeChanges: 1,
                External: 1, 
                NewFiles: 1,
                IgnoreMetadataOnly: 1,
                Title: "",
                Channel: "",
                MsServer: "",
                GlobPath: "",
                ForceNotifyTag: "",
                QueryString: "",
                Rss:""
            }
        });


    }
    async getListTemplates() {

        let authHeaders = await getAuthHeadersSilent(this.props.msalConfig);
        let res = await axios.get(listTemplates, authHeaders);

        return res.data;

    }


    loadingTemplateDiv() {
        return (
            <div className="d-flex p-3 align-items-center border border-common rounded">
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
                    template={this.state.newTemplate}
                    />
                    {
                    this.state.list.map((template, index) => <TemplatePane
                        template={template}
                        idx={index}
                        key={index}
                        canEdit={true}
                    />)
                    }
                    </div>
                }

            </div>


        )
    }
}