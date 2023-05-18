import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

// Get User Details
const getUser = async () => {
    let userDetails;
    let user = auth.currentUser;
    if(user){
        const docRef = doc(db, "users", user.uid);
        const userData = await getDoc(docRef);
    
        if (userData.exists()) {
            userDetails = userData.data();
        }else{
            console.log('error');
        }
    }

    return userDetails;
};



// Get User Posts
const getUserPosts = async () => {
    let userPosts;
    let user = auth.currentUser;

    if(user){
        let postQuery = query(collection(db, "posts"), where("user_id", "==", user.uid))
        userPosts = await getDocs(postQuery);
    }

    return userPosts;
}


export { getUser, getUserPosts };
