/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const userKey = "user";
const userTypeKey = "userType";
const isAuthenticated = 'isAuthenticated'

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
  localStorage.setItem(isAuthenticated, false)
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

export const getSessionToken = async () => {
  const token = await localStorage.getItem(accessTokenKey);
  return token;
};

export const getSessionUserId = () => {
  let user = localStorage.getItem(userKey);
  user = JSON.parse(user)
  return user && user.id ? user.id : null;
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

export const SetisAuthenticated = (state) => {
  localStorage.setItem(isAuthenticated, state)
}