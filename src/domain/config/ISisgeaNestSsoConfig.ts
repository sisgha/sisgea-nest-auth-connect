import { ISisgeaNestSsoConfigKeycloak } from './ISisgeaNestSsoConfigKeycloak';
import { ISisgeaNestSsoConfigOidcClient } from './ISisgeaNestSsoConfigOidcClient';

export interface ISisgeaNestSsoConfig extends ISisgeaNestSsoConfigOidcClient, ISisgeaNestSsoConfigKeycloak {}
