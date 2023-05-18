import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    query,
    getDocs,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJAZM8DvPK-aeoQJwUd-BZg08fJYFQ2JA",
    authDomain: "react-social-fee7f.firebaseapp.com",
    projectId: "react-social-fee7f",
    storageBucket: "react-social-fee7f.appspot.com",
    messagingSenderId: "408910413313",
    appId: "1:408910413313:web:6411c90eb6076fef5d0a00",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const FirebaseContext = createContext(null);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = (props) => {
    // User
    const [user, setUser] = useState(null);
    let isLoggedIn = false;

    // Create User
    const signUp = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    // Sign In User
    const signIn = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    // SignOut
    const logOut = () => {
        signOut(auth)
            .then(() => {
                console.log("logged Out");
            })
            .catch((error) => console.log(error));
    };

    // Continue with Google
    const googleSignIn = () => {
        try {
            return signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };

    //Manage User State
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null);
        });
    }, []);

    if (user) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    const getPosts = async () => {
        const postsQuery = query(collection(db, "posts"));
        try {
            return await getDocs(postsQuery);
        } catch (error) {
            console.log(error);
        }
    };

    const firebaseFunctions = {
        signUp,
        signIn,
        logOut,
        isLoggedIn,
        googleSignIn,
        getPosts,
    };

    return (
        <FirebaseContext.Provider value={firebaseFunctions}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export { FirebaseProvider, useFirebase };
