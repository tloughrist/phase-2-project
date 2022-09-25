import React from "react";
import { NavLink } from "react-router-dom";

function TopNavBar() {
    return (
        <div className="navbar" id="top-navbar">
            <NavLink to="/" exact>About</NavLink>
            <NavLink to="/login" exact>Login</NavLink>
            <NavLink to="/signup" exact>Sign-up</NavLink>
        </div>
    );
};

function SideNavBar() {
    return (
        <div className="navbar" id="side-navbar">
            <NavLink to="/contacts" exact>Contacts</NavLink>
            <NavLink to="/addcontact" exact>Add Contact</NavLink>
            <NavLink to="/requests" exact>Contact Requests</NavLink>
            <NavLink to="/mycard" exact>My Information</NavLink>
        </div>
    );
}

export { TopNavBar, SideNavBar };