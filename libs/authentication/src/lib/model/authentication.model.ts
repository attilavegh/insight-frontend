export interface OneTimeAuthCode {
  code: string;
}

export interface AuthToken {
  idToken: string;
  refreshToken: string;
}

export const tokenPrefix = 'Bearer ';
export const authTokenName = 'insightAuthToken';
export const refreshTokenName = 'insightRefreshToken';
