import React from "react";
import { SideNavBar, TopNavBar } from "./Navbar";

function Header({ currentUser, logOut, search }) {

    function handleLogOut() {
        return logOut();
    };

    function handleSearch(e) {
        e.preventDefault();
        return search(e.target.search.value);
    };

    if (currentUser === undefined) {
        return (
            <div id="header">
                <h1 id="title">inFormation</h1>
                <TopNavBar />
            </div>
        )
    } else {
        return (
            <div id="header">
                <h1 id="title">inFormation</h1>
                <TopNavBar />
                <button onClick={handleLogOut}>Log Out</button>
                <form onSubmit={handleSearch}>
                    <label htmlFor="search">Search for User</label>
                    <input type="text" name="search" />
                    <input type="submit" />
                </form>
                <SideNavBar />
            </div>
        );
    }
};

export default Header;