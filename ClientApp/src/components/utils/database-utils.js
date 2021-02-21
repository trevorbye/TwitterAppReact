import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';

const baseUrl = "http://localhost:52937/";


export const getTwitterHandlesByUser = async (props)=>{
    let authHeaders = await getAuthHeadersSilent(props.msalConfig);
    let handles = await axios.get(baseUrl + "api/get-distinct-handles", authHeaders);
    handles.data.unshift("");
    return handles;
}

export const getTemplatesByHandleByUser = async (msalConfig, twitterHandle) => {
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    
    const templates = await axios.get(baseUrl + `api/tweet-templates-by-handle?twitterHandle=${twitterHandle}`, authHeaders);
    return templates.data;
}

export const saveTemplate = async (msalConfig, template) => {
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    const savedTemplate = await axios.post(baseUrl + `api/tweet-template`, template, authHeaders);
    
    const newList = await getTemplatesByHandleByUser(msalConfig, template.TwitterHandle);
    
    return newList;
}