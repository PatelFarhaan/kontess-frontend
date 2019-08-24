import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";
import tokenService from "./TokenService" 

var getTokenPromise = (email, password) => {
  return tokenService.getToken(email, password).then((result) => {
    session.setToken(result.data.access, result.data.refresh)
    Promise.resolve()
  }).catch((err)=>{
    throw err.response
  })
}

export default {
  register: (first_name, last_name, title, email, password) => {
    return api.postNoTokenRoute(routes.organizerRoute, {
      "first_name": first_name,
      "last_name": last_name,
      "title": title,
      "username": email,
      "password": password
    }).then(data => {
      session.setUser(data.data.id)
      return data;
    }).then(
      getTokenPromise(email, password)
    )
  },

  login: (email, password) => {
    return api
      .postNoTokenRoute(routes.organizerLoginRoute, {
        "username":email,
        "password":password
      }).then(data => {
        session.setUser(data.data.id)
        return data;
      }).then(
        getTokenPromise(email, password)
      );
  },

  logout: () => {
    session.clearSession();
  },
};
