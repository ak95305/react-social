import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

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


// Publish Post
const publishPost = (obj) => {
    const storageRef = ref(storage, `/posts/${obj.post_img.name}`);
    uploadBytesResumable(storageRef, obj.post_img);

    let user = auth.currentUser;

    let postData = {
        post_caption: obj.post_caption,
        post_date: new Date(),
        post_img_url: obj.post_img.name,
        user_id: user.uid
    };

    addDoc(collection(db, "posts"), postData);
}



export { getUser, getUserPosts, publishPost };
