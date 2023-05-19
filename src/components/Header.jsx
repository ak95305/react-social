import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import logo from "./../assets/logo-green.png";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFirebase } from "../context/firebase";
import { Link } from "react-router-dom";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const firebase = useFirebase();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Grid container p={2} alignItems="center" className="header">
                <Grid item xs={9}>
                    <Box
                        component="img"
                        alt="logo"
                        src={logo}
                        className="logo"
                    />
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            ml: "auto",
                            display: "flex",
                            width: "fit-content",
                        }}
                    >
                        <Link to="/user-search">
                            <SearchIcon
                                sx={{
                                    color: "white",
                                    display: "inline-block",
                                }}
                                />
                        </Link>
                    {firebase.isLoggedIn &&
                        <>
                        <IconButton
                            sx={{
                                color: "white",
                                padding: "0",
                            }}
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    width: "20ch",
                                },
                            }}
                        >
                                <MenuItem key="Logout" onClick={handleClose}>
                                    <Button
                                        onClick={() => {
                                            firebase.logOut();
                                        }}
                                        sx={{width: '100%'}}
                                    >
                                        Logout
                                    </Button>
                                </MenuItem>
                        </Menu>
                        </>
                    }
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Header;
