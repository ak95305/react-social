import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Grid } from "@mui/material";
import { useFirebase } from "../context/firebase";

function Feed() {
    const firebase = useFirebase();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firebase.getPosts().then((data) => {
            setPosts(data.docs)
        });
    }, []);
    
    return (
        <>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                pt={2}
                rowSpacing={2}
            >
                {posts.map((item) => {
                    return (
                        <Grid item key={item.id}>
                            <Post post={item.data()} id={item.id}/>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}

export default Feed;
