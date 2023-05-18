import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

// Create User
const signUp = async (obj) => {
    try {
        await createUserWithEmailAndPassword(auth, obj.email, obj.password).then(data=> {
            
            let userData = {
                bio: "",
                name: obj.fullName,
                gender: "",
                no_of_post: 0,
                user_img: ""
            }
    
            setDoc(doc(db, "users", data.user.uid), userData)
        });
        
        
    } catch(error) {
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
    signOut(auth).then(()=>{
        return window.location.reload();
    })
};

// Continue with Google
const googleSignIn = () => {
    try {
        return signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.log(error);
    }
};

export { signUp, signIn, logOut, googleSignIn };
