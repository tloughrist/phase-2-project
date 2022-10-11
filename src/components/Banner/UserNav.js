import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function UserNav({ logout }) {
    return (
        <div className="banner">
            <div className="logo-container">
                <img id="logo" src="/inFormation.png" alt="inFormation logo" />
            </div>
            <div className="navbar">
                <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
                <NavLink to="/formations" exact className={useLocation().pathname.includes("/formations") ? "navlink navlink-active" : "navlink"}>Formations</NavLink>
                <NavLink to="/personalinfo" exact className={useLocation().pathname === "/personalinfo" ? "navlink navlink-active" : "navlink"}>Personal Information</NavLink>
                <button onClick={e => logout()} className="navlink">Logout</button>
            </div>
        </div>
    );
};

export default UserNav;