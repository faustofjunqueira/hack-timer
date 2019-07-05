"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
async function twitterAuth(consumerKey, consumerSecret) {
    return new Promise((resolve, reject) => {
        const options = {
            url: "https://api.twitter.com/oauth2/token",
            method: "POST",
            auth: {
                user: consumerKey,
                pass: consumerSecret
            },
            form: {
                grant_type: 'client_credentials'
            }
        };
        request(options, (err, httpResponse, body) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.twitterAuth = twitterAuth;
async function twitterSearch(twitter, params) {
    return twitter.get('/search/tweets.json', params);
}
exports.twitterSearch = twitterSearch;
