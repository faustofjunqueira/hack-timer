import * as request from "request";

export const instagramAuthRedirect = (clientId, redirectUri) =>
  `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public_content`;

export async function instagramGetAccessToken(clientId: string, clientSecret: string, code: string, redirectUri: string) {
  return new Promise((resolve, reject) => {
    const options = {
      url: "https://api.instagram.com/oauth/access_token",
      method: "POST",
      form: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code
      }
    };

    request(options, (err, httpResponse, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });

  });
}

export async function instagramGetData(accessToken: string) {
  return new Promise((resolve, reject) => {
    const options = {
      // url: `https://api.instagram.com/v1/users/self/media/recent`,
      url: `https://api.instagram.com/v1/tags/zwift/media/recent`,
      method: "GET",
      qs: { accessToken }
    };

    request(options, (err, httpResponse, body) => {
      if (err) {
        reject(err);
      } else {
        if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
          resolve(JSON.parse(body));
        } else {
          reject(body);
        }
      }
    });

  });
}
