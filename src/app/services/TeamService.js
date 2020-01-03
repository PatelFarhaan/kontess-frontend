/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import * as routes from "../globals/endpoints";
import * as api from "../../utils/requests";
import * as session from "../../utils/session";

export default {
  create: async (name, description) => {
    return await api.postRoute(routes.teamRoute, {
      name,
      description,
      userId: session.getSessionUserId(),
      userType: session.getUserType()
    });
  },

  joinTeam: async teamId => {
    return await api.putRoute(routes.teamJoinRoute(teamId), {
      userId: session.getSessionUserId()
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
