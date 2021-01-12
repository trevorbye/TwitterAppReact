// Param - internal Tweet object from database
// Return either:
//     Link to user's public twitter
//     Link to exact tweet using external tweet id 
export const getTweetUrl = (tweet) => {

    if (tweet.TwitterHandle
        && tweet.Id
        && tweet.TweetId) {

        return `https://twitter.com/${tweet.TwitterHandle}/status/${tweet.TweetId}`;

    } else {
        // if tweet isn't posted yet, return link to account
        return `https://twitter.com/${tweet.TwitterHandle}`; 
    }

}