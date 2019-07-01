import * as request from "request";

export const instagramAuthRedirect = (clientId, redirectUri) =>
  `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

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

/*
    curl -F 'client_id=34b24aa0326d47528d59253540f671d5' \
    -F 'client_secret=dbf6500c9f444faaa41fc05683912aef' \
    -F 'grant_type=authorization_code' \
    -F 'code=39af878c21a047f58d3d11639c0e24bc' \
    -F 'redirect_uri=http://localhost:10000/instagram/junda' \
    https://api.instagram.com/oauth/access_token
*/