import axios from 'axios';
import { getAuthHeadersSilent } from '../auth-utils/auth-config';
import { AppConfig } from "../../config";
import { parse } from 'json2csv';

export const getTwitterHandlesByUser = async (props) => {

    if (!props.msalConfig) throw Error("missing parameters");
    const url = AppConfig.APP_SERVER_BASE_URL + "api/get-distinct-handles";

    let authHeaders = await getAuthHeadersSilent(props.msalConfig);
    let handles = await axios.get(url, authHeaders);
    handles.data.unshift("");
    return handles;
}

export const getUserData = async (msalConfig) => {

    if (!msalConfig) throw Error("missing parameters");

    const url = AppConfig.APP_SERVER_BASE_URL + "api/get-user-data";
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    const userData = await axios.get(url, authHeaders);

    const returnData = (userData && userData.data) ? userData.data : null;

    return returnData;
}

export const getUserDataAsText = async (msalConfig) => {
    
    const userDataMultiPropertyJson = await getUserData(msalConfig);
    const dataSetNames = Object.getOwnPropertyNames(userDataMultiPropertyJson);
    
    let dataAsText = "";
    
    dataSetNames.map(name => {
        const opts = {};
        const csv = parse(userDataMultiPropertyJson[name], opts);

        dataAsText += `${name}\n\r\n\r${csv}\n\r------------------------------------------------------------\n\r`;
    })
    
    return dataAsText;
}

export const getTemplatesByHandleByUser = async (msalConfig, twitterHandle) => {

    if (!msalConfig || !twitterHandle) throw Error("missing parameters");

    const url = AppConfig.APP_SERVER_BASE_URL + `api/tweet-templates-by-handle?twitterHandle=${twitterHandle}`;

    const authHeaders = await getAuthHeadersSilent(msalConfig);

    const templates = await axios.get(url, authHeaders);
    return templates.data;
}

export const saveTemplate = async (msalConfig, template) => {
    try {
        if (!msalConfig || !template) throw Error("missing parameters");

        const authHeaders = await getAuthHeadersSilent(msalConfig);
        const url = AppConfig.APP_SERVER_BASE_URL + `api/tweet-template`;
        // do not pass in HandleUser or TweetUser
        // these are set/overwritten by backend

        // new 
        const savedTemplate = await axios.post(url, template, authHeaders);

        return;
    } catch (err) {
        console.log(`saveTemplate = ${err}`);
    }
}

export const updateTemplate = async (msalConfig, template) => {

    try {

        if (!msalConfig || !template) throw Error("missing parameters");
        const url = AppConfig.APP_SERVER_BASE_URL + `api/tweet-template`;

        const authHeaders = await getAuthHeadersSilent(msalConfig);

        // do not pass in HandleUser or TweetUser
        // these are set/overwritten by backend

        // update
        const updatedTemplate = await axios.patch(url, template, authHeaders);
        return;
    } catch (err) {
        console.log(`updateTemplate = ${err}`);
    }
}

export const deleteTemplate = async (msalConfig, Id, TwitterHandle) => {
    try {

        if (!msalConfig || !Id || !TwitterHandle) throw Error("missing parameters");
        const url = AppConfig.APP_SERVER_BASE_URL + `api/tweet-template?Id=${Id}`;
        const authHeaders = await getAuthHeadersSilent(msalConfig);

        // delete
        await axios.delete(url, authHeaders);


        return;
    } catch (err) {
        console.log(`deleteTemplate = ${err}`);
    }
}