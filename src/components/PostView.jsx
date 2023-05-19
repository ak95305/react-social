import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Post from "./Post";
import { useParams } from "react-router-dom";

function PostView() {
    const firebase = useFirebase();
    const [post, setPost] = useState(null);
    const params = useParams();

    if(post == null){
        firebase.getSinglePost(params.id).then(data => {
            setPost(data.data());
        });
    }

    return (
        <div className="post-view">
            <Post post={post}/>
        </div>
    );
}

export default PostView;
