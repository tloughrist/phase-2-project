import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";


function FormationBar() {

    return (
        <div id="formation-bar-container">
            <NavLink className="navlink" id="myformations" to={"/formations"}>My Formations</NavLink>
            <NavLink className="navlink" id="users" to={"/formations/users"}>Users</NavLink>
            <NavLink className="navlink" id="newformation" to={"/formations/newformation"}>New Formation</NavLink>
            <NavLink className="navlink" id="invitations" to={"/formations/invitations"}>Invitations</NavLink>
            <NavLink className="navlink" id="requests" to={`/formations/requests`}>Requests</NavLink>
        </div>
    );
};

export default FormationBar;