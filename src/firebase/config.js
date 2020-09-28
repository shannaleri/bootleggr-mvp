import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpG8rIysPcDrIhv4wIEzKn58lDrD_CMrE",
    authDomain: "bootleggr-ac084.firebaseapp.com",
    databaseURL: "https://bootleggr-ac084.firebaseio.com",
    projectId: "bootleggr-ac084",
    storageBucket: "bootleggr-ac084.appspot.com",
    messagingSenderId: "689982358326",
    appId: "1:689982358326:web:f67766762d91332607a997",
    measurementId: "G-Z0J4FG4XBH"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };