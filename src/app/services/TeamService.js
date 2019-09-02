import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";
import { async } from "q";

export default {
  create: async (name, description) => {
    return await api.postRoute(routes.teamRoute, {
      name,
      description
    });
  },

  joinTeam: async userId => {
    return await api.putRoute(routes.teamJoinRoute, {
      userId
    });
  },

  list: async () => {
    return await api.getRoute(routes.teamRoute);
  },

  get: async id => {
    return await api.getRoute(routes.teamRequestRoute(id));
  },

  delete: async id => {
    return await api.deleteRoute(routes.teamRequestRoute(id));
  }
};
