import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { signIn, signUp, logOut, googleSignIn } from "./user-actions";
import { getUser, getUserPosts } from "./database-actions";




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



    
    // Get Posts
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
        curUser,
        getUser,
        getUserPosts
    };




    return (
        <FirebaseContext.Provider value={firebaseFunctions}>
            {props.children}
        </FirebaseContext.Provider>
    );
};



export { FirebaseProvider, useFirebase, auth, db };
