import { Button } from "@mui/material";
import React from "react";
import Feed from "./Feed";
import { useFirebase } from "../context/firebase";

function Home() {
  
    return (
        <div className="home">
          
          <Feed />

        </div>
    );
}

export default Home;
