import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  list: async () => {
    return await api.getRoute(routes.teamRoute);
  },

  get: async id => {
    return await api.getRoute(routes.teamRequestRoute(id));
  }
};
