import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  getUser: id => {
    return api.getRoute(routes.judgeGetRoute(id)).then(data => {
      return data;
    });
  },

  getCurrentUser: () => {
    return api
      .getRoute(routes.judgeGetRoute(session.getSessionUserId()))
      .then(data => {
        return data;
      });
  },
  updateTitleProfile: title => {
    return api
      .putRoute(routes.judgeGetRoute(session.getSessionUserId()), {
        title
      })
      .then(data => {
        return data;
      });
  }
};
