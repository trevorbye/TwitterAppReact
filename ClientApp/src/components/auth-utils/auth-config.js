﻿import { UserAgentApplication } from 'msal'

let clientIdString = "f3031107-74e2-4be0-ae9a-e015c90c42c2";
let authorityUri = "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47";

export const msalApp = new UserAgentApplication({
    auth: {
        clientId: clientIdString,
        authority: authorityUri
    },
    cache: {
        cacheLocation: "localStorage"
    }
});

export async function login(msalUserAgentApp) {
    try {
        await msalUserAgentApp.loginPopup();
    } catch (e) {
        window.location.replace("/");
    }
    return msalUserAgentApp.getAccount();
}

export function logout(msalUserAgentApp) {
    msalUserAgentApp.logout();
    return null;
}

export async function initialCachedAuthCheck(msalUserAgentApp) {
    let requestParams = {
        scopes: [clientIdString]
    };

    let token;
    try {
        token = await msalUserAgentApp.acquireTokenSilent(requestParams);
    } catch (e) {
        return null;
    }
    return token;
}

export async function getAuthHeadersSilent(msalUserAgentApp) {
    let requestParams = {
        scopes: [clientIdString]
    };
    let token = null;
    try {
        token = await msalUserAgentApp.acquireTokenSilent(requestParams);
    } catch (e) {}

    if (token == null) {
        window.location.replace("/");
    } else {
        let headers = {
            headers: {
                "Content-type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "Pragma": "no-cache",
                "Authorization": "Bearer " + token.accessToken
            }
        }
        return headers;
    }
}