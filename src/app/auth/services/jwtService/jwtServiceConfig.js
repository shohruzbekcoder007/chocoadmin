import { token_url, user_me } from "src/utils/API_urls";

const jwtServiceConfig = {
  signIn: token_url,
  signUp: 'api/auth/sign-up',
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
  getUser: user_me
};

export default jwtServiceConfig;
