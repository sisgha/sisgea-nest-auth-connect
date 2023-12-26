import { ISisgeaNestAuthConnectConfigKeycloak } from './ISisgeaNestAuthConnectConfigKeycloak';
import { ISisgeaNestAuthConnectConfigOidcClient } from './ISisgeaNestAuthConnectConfigOidcClient';

export interface ISisgeaNestAuthConnectConfig extends ISisgeaNestAuthConnectConfigOidcClient, ISisgeaNestAuthConnectConfigKeycloak {}
