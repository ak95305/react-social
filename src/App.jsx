import SignIn from "./components/signin";
import "./App.css";
import Header from "./components/header";
import {
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import BottomNav from "./components/BottomNav";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import { useFirebase } from "./context/firebase";
import { useEffect } from "react";

function App() {
    const location = useLocation();
    const path = location.pathname;
    const firebase = useFirebase();
    const navigate = useNavigate();
    
    useEffect(()=>{
        !firebase.isLoggedIn ? navigate(`/signin`) : "";
    }, []);

    return (
        <div className="app">
            <Header />

            <Routes>
                <Route exact path="/" element={<SignIn />}/>
                <Route exact path="/signin" element={<SignIn />}/>
                <Route exact path="/signup" element={<SignUp />}/>
                <Route exact path="/home" element={<Home />}/>
                <Route exact path="/addpost" element={<AddPost />}/>
                <Route exact path="/profile" element={<Profile />}/>
            </Routes>


            {firebase.isLoggedIn && <BottomNav path={path}/> }
        </div>
    );
}

export default App;
