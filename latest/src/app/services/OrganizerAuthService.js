
import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";
import tokenService from "./TokenService";

var getTokenPromise = (email, password) => {
  return tokenService
    .getToken(email, password)
    .then(result => {
      session.setToken(result.data.access, result.data.refresh);
      Promise.resolve();
    })
    .catch(err => {
      throw err.response;
    });
};

export default {
  register: async (first_name, last_name, title, email, password) => {
    await api
      .postNoTokenRoute(routes.organizerRoute, {
        first_name: first_name,
        last_name: last_name,
        title: title,
        username: email,
        password: password
      })
      .then(data => {
        session.setUserType("Organizer");
        return session.setUser(data.data.id);
      })
      .then(() => {
        return getTokenPromise(email, password);
      });
  },

  login: async (email, password) => {
    await api
      .postNoTokenRoute(routes.organizerLoginRoute, {
        username: email,
        password: password
      })
      .then(data => {
        session.setUserType("Organizer");
        return session.setUser(data.data.id);
      })
      .then(data => {
        return getTokenPromise(email, password);
      });
  }
};
