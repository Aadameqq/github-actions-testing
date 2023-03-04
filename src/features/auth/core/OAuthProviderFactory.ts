interface OAuthProviderFactory {
  create(providerType: string): OAuthProvider;
}
