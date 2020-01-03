/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
const hostname = window.location.hostname;

const api = {
  localhost: 'http://192.168.2.161:8000',
  // platform: "http://ucinvc.kontess.com:8000"
  platform: 'http://***REMOVED_HOST***:30003'
};

let apiBase = '';
if (hostname === 'localhost') {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}

export default apiBase;
