import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useFirebase } from "../context/firebase";

function EditProfile() {
    const [userObj, setUserObj] = useState({
        username: "",
        fullName: "",
        email: "",
        gender: "",
        bio: "",
        img: "",
    });
    const [imgFile, setImgFile] = useState();
    const [previewImg, setPreviewImg] = useState(null);
    
    const firebase = useFirebase();

    if (userObj.username == "") {
        firebase.getUser().then((data) => {
            const [uObj, userAuth] = data;
            if (userAuth && uObj) {
                firebase.getPostImage(uObj.user_img, 'users').then(url=>{
                    const tempObj = {
                        username: userAuth.uid,
                        fullName: uObj.name,
                        email: userAuth.email,
                        gender: uObj.gender,
                        bio: uObj.bio,
                        img: uObj.user_img,
                        imgUrl: url
                    };
                    setUserObj(tempObj);
                })
            }
        });
    }

    const handleSubmit = () => {
        const temp = {
            name: userObj.fullName,
            bio: userObj.bio,
            gender: userObj.gender,
        };
        
        if(imgFile){
            temp.user_img = imgFile.name;
        }
        const id = userObj.username;
        firebase.editProfile(temp, id, imgFile);
    };
    


    return (
        <div className="edit-profile">
            <Box
                sx={{
                    position: "relative",
                    width: "fit-content",
                    margin: "auto",
                    color: "#1584f2",
                }}
            >
                <Avatar
                    alt=""
                    src={previewImg ? previewImg : userObj.imgUrl}
                    sx={{ width: 70, height: 70, margin: "0 auto 20px auto" }}
                />
                <Button
                    component="label"
                    size="small"
                    sx={{ position: "absolute", bottom: "0", right: "-20px", minWidth: "5px" }}
                    onChange={(e) => {
                        setImgFile(e.target.files[0]);
                        setPreviewImg(URL.createObjectURL(e.target.files[0]));
                    }}
                >
                    <EditIcon />
                    <input type="file" hidden />
                </Button>
            </Box>

            <TextField
                className="input-text"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                fullWidth
                multiline
                value={userObj.username && userObj.username}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                className="input-text"
                id="outlined-basic"
                label="FullName"
                variant="outlined"
                fullWidth
                multiline
                defaultValue={userObj && userObj.fullName}
                onChange={(e) => {
                    setUserObj({ ...userObj, fullName: e.target.value });
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                className="input-text"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                multiline
                value={userObj && userObj.email}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                className="input-text"
                id="outlined-basic"
                label="Gender"
                multiline
                variant="outlined"
                fullWidth
                defaultValue={userObj && userObj.gender}
                onChange={(e) => {
                    setUserObj({ ...userObj, gender: e.target.value });
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                className="input-text"
                id="outlined-basic"
                label="Bio"
                variant="outlined"
                rows={2}
                multiline
                fullWidth
                defaultValue={userObj && userObj.bio}
                onChange={(e) => {
                    setUserObj({ ...userObj, bio: e.target.value });
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default EditProfile;
