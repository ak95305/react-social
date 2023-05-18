import React from "react";
import { Box, Grid } from "@mui/material";
import logo from "./../assets/logo-green.png";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
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
                    <SearchIcon
                        sx={{
                            color: "white",
                            marginLeft: "auto",
                            display: "block",
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default Header;
