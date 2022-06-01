import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// TODO: Could either use api-key or in user profile
export const eventParams = {
  organizationId: process.env.REACT_APP_tops_ORGANIZATION_ID
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export const analytics = firebase.analytics();
export const database = firebase.database();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const fieldValue = firebase.firestore.FieldValue;
export const functions = firebase.functions();
export const storage = firebase.storage();

/*
if (location.hostname === "localhost") {
  firestore.useEmulator("localhost", 8080);
}
*/

export default firebase;

// Renders the app when the DOM tree has been loaded.
document.addEventListener("DOMContentLoaded", () => {
  window.perfMetrics.onFirstInputDelay((delay: number, evt: { type: any }) => {
    analytics.logEvent("first_input_delay", {
      eventCategory: "Perf Metrics",
      eventAction: "first-input-delay",
      eventLabel: evt.type,
      // Event values must be an integer.
      eventValue: Math.round(delay),
      // Exclude this event from bounce rate calculations.
      nonInteraction: true
    });
  });
  if (window.location.origin.includes("localhost")) {
    // firebase.functions().useEmulator("http://localhost:5001");
  }

  if (location.hostname === "localhost") {
    // firestore.useEmulator("localhost", 5000);
    // firestore.useEmulator("localhost", 8080);
    // functions.useEmulator("localhost", 5001);
  }
});
