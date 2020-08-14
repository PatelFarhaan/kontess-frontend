
import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  getUser: id => {
    return api.getRoute(routes.organizerGetRoute(id)).then(data => {
      return data;
    });
  },

  getCurrentUser: () => {
    return api
      .getRoute(routes.organizerGetRoute(session.getSessionUserId()))
      .then(data => {
        return data;
      });
  },

  updateTitleProfile: title => {
    return api
      .putRoute(routes.organizerGetRoute(session.getSessionUserId()), {
        title
      })
      .then(data => {
        return data;
      });
  }
};
