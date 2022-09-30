import React from "react";
import { NavLink } from "react-router-dom";


function FormationBar({ }) {

    return (
        <div id="formation-bar-container">
            <NavLink className="navlink" to={"/formations"}>My Formations</NavLink>
            <NavLink className="navlink" to={"/formations/newformation"}>New Formation</NavLink>
            <NavLink className="navlink" to={"/formations/invitations"}>Invitations</NavLink>
            <input type="text" placeholder="search..." />
            <select>
                <option value="formation">Formation</option>
                <option value="user">User</option>
            </select>
        </div>
    );
};

export default FormationBar;