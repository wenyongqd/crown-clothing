import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDT-kD3gFUx-udNxwSf0R6zGlQEzSuuEZU",
    authDomain: "crwn-db-b8609.firebaseapp.com",
    databaseURL: "https://crwn-db-b8609.firebaseio.com",
    projectId: "crwn-db-b8609",
    storageBucket: "crwn-db-b8609.appspot.com",
    messagingSenderId: "1059037676466",
    appId: "1:1059037676466:web:655f63f25e6ff493425aab",
    measurementId: "G-4T7FLCP232"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;