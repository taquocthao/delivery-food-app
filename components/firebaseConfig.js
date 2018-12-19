import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAIY2rq6sVEyToB3CSNV7tgFbHGSaT7EFk",
    authDomain: "deliverfood-1b663.firebaseapp.com",
    databaseURL: "https://deliverfood-1b663.firebaseio.com",
    projectId: "deliverfood-1b663",
    storageBucket: "deliverfood-1b663.appspot.com",
    messagingSenderId: "1061559856023"
  };

export const firebaseApp = firebase.initializeApp(config);
