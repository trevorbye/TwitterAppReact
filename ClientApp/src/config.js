const API_BASE_URL = () => {
    const baseApiUrl = (process.env.NODE_ENV === 'production') ? 'https://mstwitterbot.azurewebsites.net/' : 'http://localhost:52937/';
    
    return baseApiUrl;
}

const NAV_CSS = () => {
    return (process.env.NODE_ENV === 'production') ? 'nav-background-dev' : 'nav-background-dev';
}

export {
    NAV_CSS,
    API_BASE_URL
}