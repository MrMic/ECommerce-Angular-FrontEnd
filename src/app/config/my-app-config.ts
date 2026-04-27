import { environment } from '../../environments/environment';

export default {
  oidc: {
    clientId: environment.oidcClientId,
    issuer: environment.oidcIssuer,
    redirectUri: environment.oidcRedirectUri,
    scopes: ['openid', 'profile', 'email'],
  },
};
