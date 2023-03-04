export interface OAuthApiManager {
  requestAccessToken(code: string): Promise<string>;
  requestUserData(accessToken: string): Promise<OAuthApiUserDataDto>;
}
