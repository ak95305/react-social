import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
const auth = getAuth(firebaseApp)
const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = (props) => {

    // Create User
    const signUp = async (email, password) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            .then( data => data );
        }catch(error){
            console.log(error);
        }
    }
    
    // Sign In User
    const signIn = async (email, password) => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
            .then( data => data );
        }catch(error){
            console.log(error);
        }
    }



    const addData = async (obj, col) => {
        try{
            await addDoc(collection(db, col), obj);  
        }catch(error){
            console.log(error);
        }
    }

    return (
        <FirebaseContext.Provider value={{addData, signUp, signIn}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export {FirebaseProvider, useFirebase};