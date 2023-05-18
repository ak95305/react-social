import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import {
    Avatar,
    Box,
    Card,
    Grid,
    ImageList,
    ImageListItem,
    Typography,
} from "@mui/material";

function Profile() {
    let [userProfile, setUserProfile] = useState(null);
    let [userPosts, setUserPosts] = useState([]);
    const firebase = useFirebase();

    firebase.getUser().then((data) => {
        setUserProfile(data);
    });

    firebase.getUserPosts().then((data) => {
        data && setUserPosts(data.docs);
    });
    

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
                        src={userProfile && userProfile.user_img}
                        sx={{ width: 70, height: 70 }}
                    />
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
                sx={{ maxWidth: 500, paddingTop: "20px" }}
                cols={3}
                rowHeight={164}
            >
                {userPosts.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={`${item.data().post_img_url}`}
                            alt={item.data().post_caption}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default Profile;
