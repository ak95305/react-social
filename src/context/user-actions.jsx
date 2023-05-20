import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

const googleProvider = new GoogleAuthProvider();

// Create User
export const signUp = async (obj) => {
    try {
        await createUserWithEmailAndPassword(
            auth,
            obj.email,
            obj.password
        ).then((data) => {
            let userData = {
                bio: "",
                name: obj.fullName,
                gender: "",
                no_of_post: 0,
                user_img: "",
            };

            setDoc(doc(db, "users", data.user.uid), userData);
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Edit Profile
export const editProfile = async (obj, id, imgFile) => {
    const updRef = doc(db, "users", id);
    await updateDoc(updRef, obj);

    if(imgFile){
        try{
            const storageRef = ref(storage, `/users/${imgFile.name}`);
            uploadBytesResumable(storageRef, imgFile);
        } catch (error){
            console.log(error)
        }
    }
    setTimeout(()=>{
        window.location.reload();
    }, 2000);

};


// Sign In User
export const signIn = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
};

// SignOut
export const logOut = () => {
    signOut(auth).then(() => {
        return window.location.reload();
    });
};

// Continue with Google
export const googleSignIn = () => {
    try {
        return signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.log(error);
    }
};
