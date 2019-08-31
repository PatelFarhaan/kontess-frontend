import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  getCurrentUser: () => {
    return api.getRoute(
      routes.organizerGetRoute(session.getSessionUserId())
    ).then(data => {
      return data;
    })
  }
}