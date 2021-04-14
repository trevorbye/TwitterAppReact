export const AppConfig = {
    APP_SERVER_BASE_URL: process.env["REACT_APP_SERVER_URL"] || "https://mstwitterbot.azurewebsites.net/"
};
console.log(AppConfig);
console.log(process.env);