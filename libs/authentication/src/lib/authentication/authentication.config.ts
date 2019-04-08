import { AuthServiceConfig, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';

export const authServiceConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('49642869369-b99ehhan2p0fopkcra2m0sfr3krkq98s.apps.googleusercontent.com')
  }
]);

export const loginOpt: LoginOpt = {
  prompt: 'consent'
};
