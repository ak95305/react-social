import React, { useState } from "react";
import blackLogo from "./../assets/logo-black.png";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";

function SignUp() {
    const [isSignUP, setIsSignUP] = useState("");

    const firebase = useFirebase();
    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    return (
        <>
            <Alert severity="info">
                Already Registered
                <Button variant="contained" size="small" sx={{ ml: 2 }}>
                    <Link to={`/signin`}>Sign In</Link>
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
                            label="Full Name"
                            variant="outlined"
                            onChange={(evt) =>
                                setSignUpData({
                                    ...signUpData,
                                    fullName: evt.target.value,
                                })
                            }
                        />
                        <TextField
                            className="input"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            onChange={(evt) =>
                                setSignUpData({
                                    ...signUpData,
                                    email: evt.target.value,
                                })
                            }
                        />
                        <TextField
                            className="input"
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            onChange={(evt) =>
                                setSignUpData({
                                    ...signUpData,
                                    password: evt.target.value,
                                })
                            }
                        />
                        <br />
                        <Button
                            sx={{ margin: "auto", display: "block" }}
                            variant="contained"
                            onClick={() => {
                              firebase.signUp(signUpData).then(data=>{
                                  setIsSignUP(data);
                              });
                            }}
                        >
                            Sign Up
                        </Button>
                        {isSignUP==true && <Alert sx={{m:"auto", mt: "10px", textAlign: "center"}}>Sign Up Succesfully!<Button size="small" sx={{ ml: 2 }}>
                    <Link to={`/signin`}>Sign In</Link>
                </Button></Alert>}
                        {isSignUP==false && <Alert severity="error" sx={{m:"auto", mt: "10px", textAlign: "center"}}>Sign Up Unsuccesful</Alert>}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default SignUp;
