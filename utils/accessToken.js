import cookie from 'js-cookie';
const ACCESS_TOKEN = 'accessToken';

export const setAccessToken = (token) => {
  cookie.set(ACCESS_TOKEN, token, {
    sameSite: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const getAccessToken = () => {
  return cookie.get(ACCESS_TOKEN);
};
