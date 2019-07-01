

export const instagramAuthRedirect = (clientId, redirectUri) =>
  `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
