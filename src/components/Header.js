import React from "react";
import { SideNavBar, TopNavBar } from "./Navbar";

function Header({ currentUser, logOut, search }) {



    if (currentUser === undefined) {
        return (
            <div id="banner">
                <h1 id="title">inFormation</h1>
                <div className="navbar-container">
                    <TopNavBar />
                </div>
            </div>
        )
    } else {
        return (
            <div id="banner">
                <h1 id="title">inFormation</h1>
                <div className="navbar-container">
                    <SideNavBar logOut={logOut} search={search} currentUser={currentUser} />
                </div>
            </div>
        );
    }
};

export default Header;