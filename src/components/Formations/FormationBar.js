import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";


function FormationBar() {

    return (
        <div id="formation-bar-container">
            <NavLink className={useLocation().pathname === "/formations" ? "navlink navlink-active" : "navlink"} id="myformations" to={"/formations"}>My Formations</NavLink>
            <NavLink className={useLocation().pathname === "/formations/users" ? "navlink navlink-active" : "navlink"} id="users" to={"/formations/users"}>Users</NavLink>
            <NavLink className={useLocation().pathname === "/formations/newformation" ? "navlink navlink-active" : "navlink"} id="newformation" to={"/formations/newformation"}>New Formation</NavLink>
            <NavLink className={useLocation().pathname === "/formations/invitations" ? "navlink navlink-active" : "navlink"} id="invitations" to={"/formations/invitations"}>Invitations</NavLink>
            <NavLink className={useLocation().pathname === "/formations/requests" ? "navlink navlink-active" : "navlink"} id="requests" to={`/formations/requests`}>Requests</NavLink>
        </div>
    );
};

export default FormationBar;