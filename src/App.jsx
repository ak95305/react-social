import SignIn from "./components/SignIn";
import "./App.css";
import Header from "./components/header";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import BottomNav from "./components/BottomNav";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import { useFirebase } from "./context/firebase";
import PostView from "./components/PostView";
import UserSearch from "./components/UserSearch";
import EditProfile from "./components/EditProfile";

function App() {
    const location = useLocation();
    const path = location.pathname;
    const firebase = useFirebase();

    return (
        <div className="app">
            <Header />

            <Routes>
                <Route exact path="/" element={<SignIn />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/addpost" element={<AddPost />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route exact path="/profile/edit" element={<EditProfile />} />
                <Route exact path="/post/:id" element={<PostView />} />
                <Route exact path="/user-search" element={<UserSearch />} />
            </Routes>

            {firebase.isLoggedIn && <BottomNav path={path} />}
        </div>
    );
}

export default App;
