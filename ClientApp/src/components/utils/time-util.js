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
    return new Date(timeUtc).toLocaleString();
}