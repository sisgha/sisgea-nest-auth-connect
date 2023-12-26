export interface ISisgeaNestAuthConnectConfigOidcClientCredentials {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

export interface ISisgeaNestAuthConnectConfigOidcClient {
  getOidcClientCredentials(): ISisgeaNestAuthConnectConfigOidcClientCredentials;
}
