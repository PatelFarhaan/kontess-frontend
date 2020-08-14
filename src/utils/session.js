const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const userKey = "user";
const userTypeKey = "userType";

export const setSession = (accessToken, refreshToken, user) => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
  localStorage.setItem(userKey, user);
};

export const setUser = user => {
  localStorage.setItem(userKey, user);
};

export const setUserType = type => {
  localStorage.setItem(userTypeKey, type);
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
  let userType = localStorage.getItem(userTypeKey);
  let user = localStorage.getItem(userKey);
  return {
    accessToken,
    refreshToken,
    user,
    userType
  };
};

export const getSessionToken = () => {
  const token = localStorage.getItem(accessTokenKey);
  return token;
};

export const getSessionUserId = () => {
  let user = localStorage.getItem(userKey);
  return user;
};

export const getUserType = () => {
  let user = localStorage.getItem(userTypeKey);
  return user;
};

export const checkSession = () => {
  return getSession().accessToken &&
    getSession().refreshToken &&
    getSession().user &&
    getSession().userType
    ? true
    : false;
};
