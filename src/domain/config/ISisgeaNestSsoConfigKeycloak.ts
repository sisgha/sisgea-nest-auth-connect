export interface ISisgeaNestSsoConfigKeycloakCredentials {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
}

export interface ISisgeaNestSsoConfigKeycloak {
  getKeycloakConfigCredentials(): ISisgeaNestSsoConfigKeycloakCredentials;
}
