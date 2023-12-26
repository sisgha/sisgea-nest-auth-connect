export interface ISisgeaNestSsoConfigOidcClientCredentials {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

export interface ISisgeaNestSsoConfigOidcClient {
  getOidcClientCredentials(): ISisgeaNestSsoConfigOidcClientCredentials;
}
