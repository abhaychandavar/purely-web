// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import firebaseConfig from "./config";
import { getAnalytics } from "firebase/analytics";


class FirebaseApp {
  private static app?: firebase.app.App;
  // private static analytics?: Analytics;
  static init = () => {
    const currApp = firebase.initializeApp(firebaseConfig);
    const analytics = getAnalytics(currApp);
    this.app = currApp;
    // this.analytics = analytics;
  }

  static getApp = (): firebase.app.App => {
    if (!this.app) {
      this.init();
    }
    return this.app!;
  }
}

export default FirebaseApp;