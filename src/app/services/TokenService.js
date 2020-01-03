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
  getToken: (email, password) => {
    return api.postNoTokenRoute(routes.getTokenRoute, {
      username: email,
      password: password
    });
  },

  refreshToken: () => {
    const refreshToken = session.getSession()["refreshToken"];
    return api
      .postNoTokenRoute(routes.refreshTokenRoute, {
        refresh: refreshToken
      })
      .then(response => {
        session.setToken(response.data.access, refreshToken);
      });
  }
};
