import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function BottomNav(props) {
    const [value, setValue] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        switch(props.path){
            case '/home':
                return setValue(0)
            case '/addpost':
                return setValue(1)
            case '/profile':
                return setValue(2)
            default:
                return;
        }
    }, []);

    return (
        <>
            <BottomNavigation
                className="bottom-nav"
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    switch (newValue) {
                        case 0:
                            return navigate(`/home`);
                        case 1:
                            return navigate(`/addpost`);
                        case 2:
                            return navigate(`/profile`);
                        default:
                            return;
                    }
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Post" icon={<AddBoxIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
            </BottomNavigation>
        </>
    );
}

export default BottomNav;
