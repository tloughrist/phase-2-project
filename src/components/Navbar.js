import React from "react";
import { NavLink } from "react-router-dom";

function TopNavBar() {
    return (
        <div className="navbar" id="top-navbar">
            <NavLink to="/" exact className="navlink">About</NavLink>
            <NavLink to="/login" exact className="navlink">Login</NavLink>
            <NavLink to="/signup" exact className="navlink">Signup</NavLink>
        </div>
    );
};

function SideNavBar({ search, logOut, currentUser }) {

    function handleLogOut() {
        return logOut();
    };

    function handleSearch(e) {
        e.preventDefault();
        return search(e.target.search.value);
    };

    return (
        <div className="navbar" id="side-navbar">
            <NavLink to="/contacts" exact className="navlink">Contacts</NavLink>
            <NavLink to="/requests" exact className="navlink">Requests</NavLink>
            <NavLink to="/mycard" exact className="navlink">Personal Info</NavLink>
            <button className="navlink" onClick={handleLogOut}><u>Log Out</u></button>
            <form onSubmit={handleSearch}>
                <input id="search" type="text" name="search" placeholder="enter username" />
                <input id="search-submit" type="submit" value="Search"/>
            </form>
            <div id="logged-user">
                <p><b>Logged in as:</b> {currentUser.username}</p>
            </div>
        </div>
    );
}

export { TopNavBar, SideNavBar };