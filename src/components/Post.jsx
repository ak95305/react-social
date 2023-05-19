import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useFirebase } from "../context/firebase";

function Post(props) {
    const [imgUrl, setImgUrl] = useState("");
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [user, setUser] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const firebase = useFirebase();
    const post = props.post;
    
    const date = post && post.post_date.seconds * 1000 + post.post_date.nanoseconds / 1000000;
    const postDate =post && new Date(date).toDateString().split(" ").slice(1).join(" ");
    

    if(user == null){
        firebase.getUser(post.user_id).then(data=>{
            setUser(data[0]);
        })
    }

    user && firebase.getPostImage(user.user_img, "users").then(url=>{
        setUserImg(url);
    }).catch(error=>{
        console.log(error);
    })

    post && firebase.getPostImage(post.post_img_url, "posts").then((url) => {
            setImgUrl(url);
        });

    firebase.likePost(props.id, false).then(data=>{
        setLike(data);
    })

    firebase.likeCount(props.id).then(data=>{
        setLikeCount(data.docs.length);
    })

    const handleLike = () => {
        firebase.likePost(props.id, true).then(data=>{
            setLike(data);
        });
    };

    return (
        <div className="post">
            <Card sx={{ maxWidth: 500, mb: 1 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={userImg && userImg}>
                            R
                        </Avatar>
                    }
                    title={user && user.name}
                    subheader={post && postDate}
                />
                <CardMedia
                    component="img"
                    maxheight="345"
                    image={imgUrl && imgUrl}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post && post.post_caption}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={handleLike}
                        sx={{color: like ? "#e30817" : ""}}
                    >
                        <FavoriteIcon />
                        <Typography sx={{fontSize: "16px", ml: 1}}>{likeCount}</Typography>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default Post;
