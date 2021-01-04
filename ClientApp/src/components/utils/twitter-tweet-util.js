import axios from 'axios';
import { getHumanReadableTime, localeStatusTime } from './time-util';
import { API_BASE_URL } from '../../config';
import { pollStringToObj, pollObjToString, pollInit } from './twitter-poll-util';
import { getAuthHeadersSilent } from "../auth-utils/auth-config";

const baseUrl = API_BASE_URL();

export const getTweetUrl = (tweet) => {

    if (tweet.TwitterHandle
        && tweet.Id
        && tweet.TweetId) {

        return `https://twitter.com/${tweet.TwitterHandle}/status/${tweet.TweetId}`;

    }

}

export const getTweetById = async (msalConfig, tweetInternalId) => {
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    const tweetRes = await axios.get(`${baseUrl}api/tweet?id=${tweetInternalId}`, authHeaders);
    return tweetRes.data;
}

export const updateTweetId = async (msalConfig, tweet) => {

    const tweetUpdate = {
        Id: tweet.Id,
        TweetId: tweet.TweetId
    };
    
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    const editResponse = await axios.post(`${baseUrl}api/update-tweet-id`, tweetUpdate, authHeaders);
}

export const getHandles = async (msalConfig) => {
    const authHeaders = await getAuthHeadersSilent(msalConfig);
    return await axios.get(`${baseUrl}api/get-distinct-handles`, authHeaders);
}

export const prepTweet = async (tweet) => {
    
    let utcRes = await axios.get(`${baseUrl}api/get-utc-now`);
    let utcServerTimestamp = utcRes.data;
    
    tweet.CreatedTime = getHumanReadableTime(utcServerTimestamp, tweet.CreatedTime);
    tweet.ScheduledStatusTime = localeStatusTime(tweet.ScheduledStatusTime);

    const poll = prepPoll(tweet.Poll);
    delete tweet.Poll;
    tweet.Poll = poll;
    return tweet;
}

// convert delimited string to obj of properties
export const prepPoll = (poll) => {
    
   
    if (poll) {
        return pollStringToObj(poll)
    } else {
        return pollInit();
    }
}
