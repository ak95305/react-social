import SignIn from "./components/signin";
import "./App.css";
import Header from "./components/header";
import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    useLocation,
    useNavigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import BottomNav from "./components/BottomNav";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";

function App() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="app">
            <Header />

            {/* <RouterProvider router={router} /> */}
            <Routes>
                <Route exact path="/" element={<SignIn />}/>
                <Route exact path="/signin" element={<SignIn />}/>
                <Route exact path="/signup" element={<SignUp />}/>
                <Route exact path="/home" element={<Home />}/>
                <Route exact path="/addpost" element={<AddPost />}/>
                <Route exact path="/profile" element={<Profile />}/>
            </Routes>


            <BottomNav path={path}/>
        </div>
    );
}

export default App;
