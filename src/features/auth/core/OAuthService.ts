import { OAuthApiManagerFactory } from './OAuthApiManagerFactory';
import { AuthorizationService } from './AuthorizationService';

class OAuthCredentials {
  private type = 'o-auth-credentials';

  constructor(public readonly oAuthId: string) {}
}

class Account {
  private type = 'account';

  constructor(
    public readonly username: string,
    public readonly avatarURL: string,
  ) {}
}
interface CreateOauthCredentialsRepository {
  //perhaps OauthUserRepo
  create(oAuthCredentials: OAuthCredentials, account: Account): void;
}

interface CheckIfExistsOAuthCredentialsRepository {
  exists(oAuthId: string): Promise<boolean>;
}

class OAuthService {
  constructor(
    private oAuthCredentialsRepository: CreateOauthCredentialsRepository &
      CheckIfExistsOAuthCredentialsRepository,
    private authorizationService: AuthorizationService,
    private providerFactory: OAuthProviderFactory,
    private apiManagerFactory: OAuthApiManagerFactory,
  ) {}

  async handleAuthentication(code: string, providerType: string) {
    const provider = this.providerFactory.create(providerType);

    const apiManager = this.apiManagerFactory.create(provider);

    const accessToken = await apiManager.requestAccessToken(code);
    const userData = await apiManager.requestUserData(accessToken);

    const userCredentials = new OAuthCredentials(userData.oAuthId);
    const userAccount = new Account(userData.username, userData.avatarURL);

    if (await this.oAuthCredentialsRepository.exists(userCredentials.oAuthId)) {
      await this.oAuthCredentialsRepository.create(
        userCredentials,
        userAccount,
      );
    }
    this.authorizationService.setAuthorizationData(userAccount); //set Authorization Data
  }
}
