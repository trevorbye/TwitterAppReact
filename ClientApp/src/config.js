const BASE_URL = () => {
    return (process.env.NODE_ENV === 'production') ? 'https://mstwitterbot.azurewebsites.net/' : 'https://localhost:52937/';
}

export {
    BASE_URL
}