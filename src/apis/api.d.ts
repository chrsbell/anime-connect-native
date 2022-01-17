declare interface OAuthRedirectResponse {
  codeVerifier: string;
  oaState: string;
  redirectURL: string;
}

declare interface OAuthTokenResponse extends Response {
  accessToken: string;
  refreshToken: string;
}
