import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import { Link } from "react-router-dom";

function UserSearch() {
    const firebase = useFirebase();
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        if (e.target.value == "") {
            setUsers([]);
        } else {
            firebase.findUser(e.target.value).then((data) => {
                if (data.docs) {
                    setUsers(data.docs);
                }
            });
        }
    };

    return (
        <div className="user-search">
            <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Search User"
                variant="outlined"
                onChange={handleChange}
            />

            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                {users.map((item) => {
                    return (
                        <Link to={`/profile/${item.id}`} key={item.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Box
                                            component="img"
                                            alt={item.data().name}
                                            src={item.data().user_img}
                                            className="user-img"
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.data().name}
                                    secondary={item.id}
                                />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </div>
    );
}

export default UserSearch;
