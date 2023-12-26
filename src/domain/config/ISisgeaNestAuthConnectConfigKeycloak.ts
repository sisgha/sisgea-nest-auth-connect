export interface ISisgeaNestAuthConnectConfigKeycloakCredentials {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
}

export interface ISisgeaNestAuthConnectConfigKeycloak {
  getKeycloakConfigCredentials(): ISisgeaNestAuthConnectConfigKeycloakCredentials;
}
