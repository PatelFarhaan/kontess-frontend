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
