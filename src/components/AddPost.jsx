import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [addPost, setAddPost] = useState({
        post_img: "",
        post_caption: "",
    });
    const [previewImg, setPreviewImg] = useState(null);

    const handleChange = (e) => {
        setAddPost({
            ...addPost,
            post_img: e.target.files[0],
        });

        setPreviewImg(URL.createObjectURL(e.target.files[0]));
    };


    const handlePublishPost = () => {
        firebase.publishPost(addPost).then(data=>{
            navigate(`/post/${data.id}`);
        })
    }

    return (
        <div className="addpost">
            <Box sx={{ p: "10px", width: "100%", minHeight: "350px", display: "flex", alignItems: "center" }}>
                <Grid
                    container
                    justifyContent={previewImg ? "right" : "center"}
                    alignItems="center"
                    sx={{ height: "100%", gap: "10px" }}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                            size={previewImg ? "small" : "large"}
                        >
                            {previewImg ? "Change Image" : <AddAPhotoIcon />}
                            <input type="file" hidden onChange={handleChange} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Box
                            component="img"
                            alt={previewImg}
                            src={previewImg}
                            className="preview-img"
                            sx={{ height: "100%", objectFit: "cover" }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <br />

            <TextField
                sx={{ width: "100%", margin: "20px 0" }}
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                onChange={(e) => {
                    setAddPost({ ...addPost, post_caption: e.target.value });
                }}
            />

            <br />
            <Button
                variant="contained"
                onClick={handlePublishPost}
            >
                Post
            </Button>
        </div>
    );
}

export default AddPost;
