import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';

const baseUrl = "https://mstwitterbot.azurewebsites.net/";
if (!baseUrl) throw Error("baseUrl is empty");


export const getTwitterHandlesByUser = async (props) => {
    
    if (!props.msalConfig) throw Error("missing parameters");
    
    let authHeaders = await getAuthHeadersSilent(props.msalConfig);
    let handles = await axios.get(baseUrl + "api/get-distinct-handles", authHeaders);
    handles.data.unshift("");
    return handles;
}

export const getTemplatesByHandleByUser = async (msalConfig, twitterHandle) => {
    
    if (!msalConfig || !twitterHandle) throw Error("missing parameters");
    
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    
    const templates = await axios.get(baseUrl + `api/tweet-templates-by-handle?twitterHandle=${twitterHandle}`, authHeaders);
    return templates.data;
}

export const saveTemplate = async (msalConfig, template) => {
    
    if (!msalConfig || !template) throw Error("missing parameters");
    
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    
    // do not pass in HandleUser or TweetUser
    // these are set/overwritten by backend
    
    // new 
    const savedTemplate = await axios.post(baseUrl + `api/tweet-template`, template, authHeaders);
    
    // get updated list
    const updatedList = await getTemplatesByHandleByUser(msalConfig, template.TwitterHandle);
    
    return updatedList;
}

export const updateTemplate = async (msalConfig, template) => {
    
    if (!msalConfig || !template) throw Error("missing parameters");
    
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    
    // do not pass in HandleUser or TweetUser
    // these are set/overwritten by backend
    
    // update
    const updatedTemplate = await axios.patch(baseUrl + `api/tweet-template`, template, authHeaders);
    
    // get updated list
    const updatedList = await getTemplatesByHandleByUser(msalConfig, template.TwitterHandle);
    
    return updatedList;
}

export const deleteTemplate = async (msalConfig, Id, TwitterHandle) => {
    
    if (!msalConfig || !Id || !TwitterHandle) throw Error("missing parameters");
    
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    
    // delete
    await axios.delete(baseUrl + `api/tweet-template?Id=${Id}`, authHeaders);
    
    // get updated list
    const updatedList = await getTemplatesByHandleByUser(msalConfig, TwitterHandle);
    
    return updatedList;
}