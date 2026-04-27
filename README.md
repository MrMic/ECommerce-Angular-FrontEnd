## Angular / Java Spring Boot Project

## Environment Setup

Sensitive config (Okta credentials) is not committed. Use the example file to set up locally.

**Steps:**

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

Then edit `src/environments/environment.ts` and fill in your values:

```typescript
export const environment = {
  production: false,
  oidcClientId: 'YOUR_OKTA_CLIENT_ID',
  oidcIssuer: 'https://YOUR_OKTA_DOMAIN/oauth2/default',
  oidcRedirectUri: 'http://localhost:4200/login/callback',
};
```

> `environment.ts` and `environment.prod.ts` are gitignored — never commit real credentials.
