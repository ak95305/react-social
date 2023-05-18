import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";


import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Post(props) {

    const post = props.post.data();
    
    const date = post.post_date.seconds * 1000 +  post.post_date.nanoseconds / 1000000;
    const postDate = new Date(date).toDateString().split(' ').slice(1).join(' ');
    
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
                    image={post.post_img_url}
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
