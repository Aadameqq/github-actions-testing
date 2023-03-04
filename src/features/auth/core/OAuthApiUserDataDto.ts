export class OAuthApiUserDataDto {
  constructor(
    public readonly oAuthId: string,
    public readonly username: string,
    public readonly avatarURL: string,
  ) {}
}
