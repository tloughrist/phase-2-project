import React from "react";
import { NavLink } from "react-router-dom";

function VisitorNav() {
    return (
        <div className="banner">
            <div className="logo-container">
                <img id="logo" src="./inFormation.png" alt="inFormation logo" />
            </div>
            <div className="navbar">
                <NavLink to="/" exact className="navlink">Home</NavLink>
                <NavLink to="/login" exact className="navlink">Login</NavLink>
                <NavLink to="/signup" exact className="navlink">Signup</NavLink>
            </div>
        </div>
    );
};

export default VisitorNav;