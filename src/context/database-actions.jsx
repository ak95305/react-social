import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Get User Details
export const getUser = async (id) => {
    let userDetails;
    let user;
    if (!id) {
        user = auth.currentUser;
        if (user) {
            id = user.uid;
        }
    }
    if (id) {
        const docRef = doc(db, "users", id);
        const userData = await getDoc(docRef);

        if (userData.exists()) {
            userDetails = userData.data();
        } else {
            console.log("error");
        }
    }

    return [userDetails, user];
};

// Get User Posts
export const getUserPosts = async (id) => {
    let userPosts;
    if (!id) {
        let user = auth.currentUser;
        if (user) {
            id = user.uid;
        }
    }

    if (id) {
        let postQuery = query(
            collection(db, "posts"),
            where("user_id", "==", id)
        );
        userPosts = await getDocs(postQuery);

        return userPosts;
    }
};

// Publish Post
export const publishPost = (obj) => {
    const storageRef = ref(storage, `/posts/${obj.post_img.name}`);
    uploadBytesResumable(storageRef, obj.post_img);

    let user = auth.currentUser;

    let postData = {
        post_caption: obj.post_caption,
        post_date: new Date(),
        post_img_url: obj.post_img.name,
        user_id: user.uid,
    };

    return addDoc(collection(db, "posts"), postData);
};

// Get Posts
export const getPosts = async () => {
    const postsQueryRef = query(collection(db, "posts"));
    const postsQuery = query(postsQueryRef, orderBy("post_date", "desc"));
    try {
        return await getDocs(postsQuery);
    } catch (error) {
        console.log(error);
    }
};

// Get Single Post
export const getSinglePost = async (id) => {
    const docRef = doc(db, "posts", id);

    try {
        return await getDoc(docRef);
    } catch (error) {
        console.log(error);
    }
};

// Get Post Image
export const getPostImage = async (id, loc) => {
    const pathRef = ref(storage, `gs://react-social-fee7f.appspot.com/${loc}/${id}`);
    return await getDownloadURL(pathRef);
};

// Find user
export const findUser = async (searchTerm) => {
    let users;
    if (searchTerm) {
        let userQuery = query(
            collection(db, "users"),
            where("name", ">=", searchTerm),
            where("name", ">=", searchTerm)
        );
        users = await getDocs(userQuery);

        return users;
    }
};

// Like Post
export const likePost = async (post_id, handle) => {
    let user = auth.currentUser;
    let postLiked;

    if (user) {
        if (handle) {
            if (post_id) {
                let likeQuery = query(
                    collection(db, "likes"),
                    where("post_id", "==", post_id),
                    where("user_id", "==", user.uid)
                );

                postLiked = await getDocs(likeQuery);

                if (postLiked.docs.length == 0) {
                    let likeData = {
                        user_id: user.uid,
                        post_id: post_id,
                    };
                    addDoc(collection(db, "likes"), likeData);
                    return true;
                } else {
                    // console.log("hey");
                    let likeFindQuery = query(
                        collection(db, "likes"),
                        where("post_id", "==", post_id),
                        where("user_id", "==", user.uid)
                    );

                    await getDocs(likeFindQuery).then((item) => {
                        deleteDoc(doc(db, "likes", item.docs[0].id));
                    });
                    return false;
                }
            }
        } else {
            if (post_id) {
                let likeQuery = query(
                    collection(db, "likes"),
                    where("post_id", "==", post_id),
                    where("user_id", "==", user.uid)
                );

                postLiked = await getDocs(likeQuery);

                if (postLiked.docs.length > 0) {
                    return true;
                }
            }
        }
    }
};

// Like Count
export const likeCount = async (post_id) => {
    let likeCount;

    if (post_id) {
        let countQuery = query(
            collection(db, "likes"),
            where("post_id", "==", post_id)
        );
        likeCount = await getDocs(countQuery);

        return likeCount;
    }
};
