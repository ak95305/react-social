import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFirebase } from "../context/firebase";


function AddPost() {
    const firebase = useFirebase();

    const [addPost, setAddPost] = useState({
        post_img: "",
        post_caption: "",
    });


    return (
        <div className="addpost">
            <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden onChange={(e)=>{setAddPost({...addPost, post_img: e.target.files[0]})}}/>
            </Button>

            <br />

            <TextField
                sx={{width: '100%', margin: "20px 0"}}
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                onChange={(e)=>{setAddPost({...addPost, post_caption: e.target.value})}}
            />

            <br />
            <Button variant="contained" onClick={()=>{firebase.publishPost(addPost)}}>Post</Button>
        </div>
    );
}

export default AddPost;
