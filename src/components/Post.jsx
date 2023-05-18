import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";


import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useFirebase } from "../context/firebase";

function Post(props) {
    const [imgUrl, setImgUrl] = useState("");
    const firebase = useFirebase();
    const post = props.post.data();
    
    const date = post.post_date.seconds * 1000 +  post.post_date.nanoseconds / 1000000;
    const postDate = new Date(date).toDateString().split(' ').slice(1).join(' ');

    useEffect(()=>{
        firebase.getPostImage(post.post_img_url).then(url=>{
            setImgUrl(url);
        });
    }, []);
    
    return (
        <div className="post">
            <Card sx={{ maxWidth: 500, mb: 5 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader={postDate}
                />
                <CardMedia
                    component="img"
                    maxheight="345"
                    image={imgUrl}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.post_caption}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default Post;
