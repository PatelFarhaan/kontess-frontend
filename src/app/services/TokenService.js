import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  getToken: (email, password) => {
    return api.postNoTokenRoute(routes.getTokenRoute, {
      username: email,
      password: password
    });
  },
  refreshToken: () => {
    const refreshToken = session.getSession()["refreshToken"];
    return api.postNoTokenRoute(routes.getTokenRoute, {
      refresh: refreshToken
    });
  }
};
