import { Button, Container, TextField } from "@mui/material";
import { useFirebase } from "./context/firebase";
import "./App.css";
import { useState } from "react";

function App() {
    const firebase = useFirebase();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="app">
            {/* <Container fixed>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(evt)=>setUsername(evt.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    onChange={(evt)=>setPassword(evt.target.value)}
                />
                <br />
                <Button variant="contained" onClick={() => firebase.signUp(username, password)}>
                    Sign up
                </Button>
                <Button variant="contained" onClick={() => firebase.signIn(username, password)}>
                    Sign in
                </Button>
            </Container> */}

            <Container maxWidth="sm">AMAN</Container>
        </div>
    );
}

export default App;
