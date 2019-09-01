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
  register: async (first_name, last_name, graduation_year, email, password) => {
    await api
      .postNoTokenRoute(routes.participantRoute, {
        first_name: first_name,
        last_name: last_name,
        graduation_year: graduation_year,
        username: email,
        password: password
      })
      .then(data => {
        session.setUserType("participant");
        return session.setUser(data.data.id);
      })
      .then(() => {
        return getTokenPromise(email, password);
      });
  },

  login: async (email, password) => {
    await api
      .postNoTokenRoute(routes.participantLoginRoute, {
        username: email,
        password: password
      })
      .then(data => {
        session.setUserType("participant");
        return session.setUser(data.data.id);
      })
      .then(data => {
        return getTokenPromise(email, password);
      });
  }
};
