import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import EditIcon from "@mui/icons-material/Edit";
import {
    Avatar,
    Box,
    Card,
    Grid,
    ImageList,
    ImageListItem,
    Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

function Profile() {
    let [userProfile, setUserProfile] = useState(null);
    let [userPosts, setUserPosts] = useState([]);
    const firebase = useFirebase();
    const params = useParams();

    if (userProfile == null) {
        firebase.getUser(params.id).then((response) => {
            const [uObj, userAuth] = response;
            setUserProfile(uObj);
            uObj && firebase.getPostImage(uObj.user_img, 'users').then((url) => {
                uObj.imgUrl = url;
            });
        });
        firebase.getUserPosts(params.id).then((data) => {
            let tempUserPosts = [];
            data &&
                data.docs.map((item) => {
                    firebase
                        .getPostImage(item.data().post_img_url, 'posts')
                        .then((url) => {
                            let tempObj = item.data();
                            tempObj.id = item.id;
                            tempObj.imgUrl = url;
                            tempUserPosts = [...tempUserPosts, tempObj];
                            data && setUserPosts(tempUserPosts);
                        });
                });
        });
    }

    return (
        <div className="profile">
            <Grid
                container
                alignItems="center"
                justifyContent="cetner"
                sx={{ borderBottom: "1px solid #aaa", padding: "20px" }}
            >
                <Grid item xs={6}>
                    <Avatar
                        alt={userProfile && userProfile.name}
                        src={userProfile && userProfile.imgUrl}
                        sx={{ width: 70, height: 70, display: "inline-block" }}
                    />
                    {!params.id && (
                        <Link to="edit">
                            <EditIcon />
                        </Link>
                    )}
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            marginTop: "10px",
                        }}
                    >
                        {userProfile && userProfile.name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            marginTop: "5px",
                        }}
                    >
                        {userProfile && userProfile.bio}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Card
                            sx={{
                                width: "fit-content",
                                padding: "10px 20px",
                                margin: "auto",
                                textAlign: "center",
                                backgroundColor: "#eee",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}
                            >
                                {userPosts && userPosts.length}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                Posts
                            </Typography>
                        </Card>
                    </Box>
                </Grid>
            </Grid>

            <ImageList
                sx={{ maxWidth: 500, paddingTop: "20px", overflow: "hidden" }}
                cols={3}
                rowHeight={164}
            >
                {userPosts.map((item) => (
                    <ImageListItem key={item.id}>
                        <Link to={`/post/${item.id}`}>
                            <img
                                src={`${item.imgUrl}`}
                                alt={item.post_caption}
                                loading="lazy"
                            />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default Profile;
