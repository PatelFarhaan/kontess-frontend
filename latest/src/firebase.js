
import firebase from 'firebase';

let firebaseConfig_dev = {
  apiKey: "***REMOVED_FIREBASE_KEY***",
  authDomain: "***REMOVED_FIREBASE_DOMAIN***",
  databaseURL: "https://***REMOVED_FIREBASE_DB***",
  projectId: "kontess-dev",
  storageBucket: "***REMOVED_FIREBASE_BUCKET***",
  messagingSenderId: "***REMOVED_SENDER_ID***",
  appId: "1:***REMOVED_SENDER_ID***:web:e11b5e841f9e5f1a8a827c",
  measurementId: "***REMOVED_MEASUREMENT_ID***"
};

let firebaseConfig_production = {
  apiKey: "***REMOVED_FIREBASE_KEY***",
  authDomain: "***REMOVED_FIREBASE_DOMAIN***",
  databaseURL: "https://***REMOVED_FIREBASE_DB***",
  projectId: "kontess-3ad77",
  storageBucket: "***REMOVED_FIREBASE_BUCKET***",
  messagingSenderId: "***REMOVED_SENDER_ID***",
  appId: "1:***REMOVED_SENDER_ID***:web:c3e1c23cf9099ef2d3bed8",
  measurementId: "***REMOVED_MEASUREMENT_ID***"
};

var firebaseConfig_sg05 = {
  apiKey: "***REMOVED_FIREBASE_KEY***",
  authDomain: "***REMOVED_FIREBASE_DOMAIN***",
  databaseURL: "https://***REMOVED_FIREBASE_DB***",
  projectId: "kontess-sg05",
  storageBucket: "***REMOVED_FIREBASE_BUCKET***",
  messagingSenderId: "***REMOVED_SENDER_ID***",
  appId: "1:***REMOVED_SENDER_ID***:web:d311085b04bb35d4f79e5a",
  measurementId: "***REMOVED_MEASUREMENT_ID***"
};

const hostname = window.location.hostname;
let config = '';
if (hostname === 'ucinvc.kontess.com') {
  config = firebaseConfig_production;
} else if (hostname === '***REMOVED_HOST***') {
  config = firebaseConfig_sg05;
} else {
  config = firebaseConfig_dev;
}
firebase.initializeApp(config);
const database = firebase.database();
export default database;
