export interface OAuthProvider {
  getClientId(): string;
  getClientSecret(): string;
  getRedirectUri(): string;
}
