import React, { useEffect, useState } from "react";
import blackLogo from "./../assets/logo-black.png";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import GoogleButton from "react-google-button";

function SignIn() {
    const firebase = useFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(firebase.isLoggedIn) {
            navigate("/home");
        }
    }, [firebase.isLoggedIn]);

    const handleSignin = async () => {
        let user = await firebase
            .signIn(email, password)
            .then((data) => data)
            .catch((error) => console.log(error));

        if (user) {
            console.log("Logged In");
            navigate("/home");
        } else {
            console.log("Not Logged in");
        }
    };

    return (
        <>
            <Alert severity="info">
                If New to React Social
                <Button
                    variant="contained"
                    size="small"
                    sx={{ ml: 2 }}
                    onClick={firebase.getSignInUser}
                >
                    <Link to={`/signup`}>Sign Up</Link>
                </Button>
            </Alert>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "calc(100% - 113px)" }}
            >
                <Grid item>
                    <Box
                        component="img"
                        alt="logo"
                        src={blackLogo}
                        sx={{
                            width: "150px",
                            margin: "auto",
                            display: "block",
                        }}
                    />
                    <Box
                        sx={{
                            maxWidth: "80%",
                            margin: "auto",
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            className="input"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                        <TextField
                            className="input"
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            onChange={(evt) => setPassword(evt.target.value)}
                        />
                        <br />
                        <Button
                            sx={{ margin: "auto", display: "block" }}
                            variant="contained"
                            onClick={handleSignin}
                        >
                            Sign in
                        </Button>
                        <GoogleButton
                            className="google-btn"
                            label="Countinue with Google"
                            onClick={firebase.googleSignIn}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default SignIn;
