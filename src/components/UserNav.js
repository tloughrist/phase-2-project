import React from "react";
import { NavLink } from "react-router-dom";

function UserNav({ logOut }) {
    return (
        <div className="banner">
            <div className="logo-container">
                <img id="logo" src="./inFormation.png" alt="inFormation logo" />
            </div>
            <div className="navbar">
                <NavLink to="/" exact className="navlink">Home</NavLink>
                <NavLink to="/formations" exact className="navlink">Formations</NavLink>
                <NavLink to="/personalinfo" exact className="navlink">Personal Information</NavLink>
                <NavLink to="/logout" exact className="navlink">Logout</NavLink>
            </div>
        </div>
    );
};

export default UserNav;