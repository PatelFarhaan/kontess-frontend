
import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  getUser: id => {
    return api.getRoute(routes.participantGetRoute(id)).then(data => {
      return data;
    });
  },

  getCurrentUser: () => {
    return api
      .getRoute(routes.participantGetRoute(session.getSessionUserId()))
      .then(data => {
        return data;
      });
  },

  updateTitleProfile: title => {
    return api
      .putRoute(routes.participantGetRoute(session.getSessionUserId()), {
        title
      })
      .then(data => {
        return data;
      });
  },

  joinTeamRequest: (teamId, essay) => {
    return api
      .postRoute(routes.teamCreateRequestRoute(session.getSessionUserId()), {
        teamId,
        essay
      })
      .then(data => {
        return data;
      });
  }
};
