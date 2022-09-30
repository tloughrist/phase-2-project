import React from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";

function Banner({ isLoaded, token, logOut }) {
    if (isLoaded) {
        if (token === "valid") {
            return <UserNav logOut={logOut} />
        } else {
            return <VisitorNav />;
        }
    } else {
        return <h1>Loading...</h1>
    }
    
};

export default Banner;