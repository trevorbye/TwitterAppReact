import { dateFnsLocalizer } from "react-big-calendar";

export function getHumanReadableTime(utcServerTimestamp, utcTweetTimestamp) {
    let utcNow = Date.parse(utcServerTimestamp);
    let utcTweetTime = Date.parse(utcTweetTimestamp + "Z");
    let elapsedTimeSeconds = (utcNow - utcTweetTime) / 1000;

    let humanReadableTime;
    if (elapsedTimeSeconds < 60) {
        humanReadableTime = "Just now";
    } else if (elapsedTimeSeconds < 3600) {
        let elapsedMinRounded = Math.round(elapsedTimeSeconds / 60);
        humanReadableTime = elapsedMinRounded.toString() + " min ago";
    } else if (elapsedTimeSeconds < 86400) {
        let elapsedHoursRounded = Math.round(elapsedTimeSeconds / 3600);
        humanReadableTime = elapsedHoursRounded.toString() + " hours ago";
    } else {
        let elapsedDaysRounded = Math.round(elapsedTimeSeconds / 86400);
        humanReadableTime = elapsedDaysRounded.toString() + " days ago";
    }
    return humanReadableTime;
}

export function localeStatusTime(tweetScheduledStatusTimestamp) {
    let timeUtc = tweetScheduledStatusTimestamp + "Z";
    let timeString = new Date(timeUtc).toLocaleString();
    return timeString;
}
// "Pacific Standard Time"
export const timeZoneName = (date) => {
    
    if (!date) throw Error("param is empty");
    
    const dateAsString = date.toString();
    return dateAsString.match(/\(([^\)]+)\)$/)[1];
}
// timezone, i.e. -0700
export const timeZoneOffset= (date) => {
    
    if (!date) throw Error("param is empty");
    
    return date.toString().split("GMT")[1].split(" (")[0]; 
}
// Use for <input type="date">
export const inputDateFormat = (date) => {
    
    if (!date) throw Error("param is empty");
    
    return date.toISOString().substr(0, 10);
}
// Use for <input type="time">
export const inputTimeFormat = (date) => {
    
    if (!date) throw Error("param is empty");
    
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    // add padding
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    
    return `${hours}:${minutes}`
}