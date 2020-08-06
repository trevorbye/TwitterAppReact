import twttr from 'twitter-text';

export function validateTweetBody(text) {
    const result = twttr.parseTweet(text);
    const maxChars = 280;
    if (result) {
        let textReturn = `${result.weightedLength} / ${maxChars}`;
        let isValid = result.weightedLength <= maxChars ? true : false;
        return {
            textReturn: textReturn,
            isValid: isValid
        }
    }
}