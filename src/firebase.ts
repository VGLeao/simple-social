import app from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

class Firebase {
    auth: app.auth.Auth;
    db: app.firestore.Firestore;

    constructor() {
        app.initializeApp(firebaseConfig);
        // app.analytics();
        this.auth = app.auth();
        this.db = app.firestore()
    }

    // login(email, password) {
    //     return this.auth.signInWithEmailAndPassword(email, password)
    // }

    // logout() {
    //     return this.auth.signOut()
    // }

    // async register(name, email, password) {
    //     await this.auth.createUserWithEmailAndPassword(email, password)
    //     return this.auth.currentUser.updateProfile({
    //         displayName: name
    //     })
    // }
}

export default new Firebase();