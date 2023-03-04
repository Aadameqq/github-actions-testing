import { OAuthApiManager } from './OAuthApiManager';
import { OAuthProvider } from './OAuthProvider';

export interface OAuthApiManagerFactory {
  create(provider: OAuthProvider): OAuthApiManager;
}
