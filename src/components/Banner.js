import React from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";

function Banner({ isLoggedIn, logOut }) {
    if (isLoggedIn) {
        return <UserNav logOut={logOut} />
    } else {
        return <VisitorNav />;
    }
};

export default Banner;