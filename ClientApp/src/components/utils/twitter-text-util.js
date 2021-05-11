import twttr from 'twitter-text';
import React, { Fragment } from 'react';
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

export function TweetWithLines ({ tweet }) {
   return tweet.split("\n").map(line => (
    <Fragment >
      {line}
      <br />
    </Fragment>
  ));

}