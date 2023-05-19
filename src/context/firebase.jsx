import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signUp, signIn, logOut, googleSignIn, editProfile } from "./user-actions";
import { getUser, getUserPosts, publishPost, getPosts, getPostImage, getSinglePost, findUser, likePost, likeCount } from "./database-actions";
import { getStorage } from "firebase/storage";

// Contants
const firebaseConfig = {
    apiKey: "AIzaSyBJAZM8DvPK-aeoQJwUd-BZg08fJYFQ2JA",
    authDomain: "react-social-fee7f.firebaseapp.com",
    projectId: "react-social-fee7f",
    storageBucket: "react-social-fee7f.appspot.com",
    messagingSenderId: "408910413313",
    appId: "1:408910413313:web:6411c90eb6076fef5d0a00",
};
const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const auth = getAuth(firebaseApp);
const useFirebase = () => useContext(FirebaseContext);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const FirebaseProvider = (props) => {


    // User
    const [user, setUser] = useState(null);
    let isLoggedIn = false;
    let curUser = null;

    
    
    //Manage User State
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null);
        });
    }, []);

    if (user) {
        curUser = user;
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    
    
    
    const firebaseFunctions = {
        isLoggedIn,
        curUser,
        signUp,
        signIn,
        logOut,
        googleSignIn,
        getUser,
        getUserPosts,
        publishPost,
        getPosts,
        getPostImage,
        getSinglePost,
        findUser,
        editProfile,
        likePost,
        likeCount
    };

    
    
    return (
        <FirebaseContext.Provider value={firebaseFunctions}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export { FirebaseProvider, useFirebase, auth, db, storage };
