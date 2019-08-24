const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const userKey = "user";

export const setSession = (accessToken, refreshToken, user) => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
  localStorage.setItem(userKey, JSON.stringify(user));
};

export const setUser = user => {
  localStorage.setItem(userKey, JSON.stringify(user));
};

export const setToken = (accessToken, refreshToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
};

export const clearSession = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.removeItem(userKey);
};

export const getSession = () => {
  const accessToken = localStorage.getItem(accessTokenKey);
  const refreshToken = localStorage.getItem(refreshTokenKey);
  let user = localStorage.getItem(userKey);
  user = JSON.parse(user);
  return {
    accessToken,
    refreshToken,
    user
  };
};

export const getSessionToken = () => {
  const token = localStorage.getItem(accessTokenKey);
  return token;
};

export const getSessionUserId = () => {
  let user = localStorage.getItem(userKey);
  user = JSON.parse(user);
  return user ? user._id : null;
};