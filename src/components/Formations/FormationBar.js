import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";


function FormationBar({ getSearchValue }) {

    const [searchMode, setSearchMode] = useState("formation");

    const history = useHistory();

    function handleSearch(e) {
        return getSearchValue(searchMode, e.target.value.toLowerCase());
    };

    function handleModeChange(e) {
        setSearchMode(e.target.value);
        if (e.target.value === "myformations") {
            return history.push("/formations/");
        } else if (e.target.value === "allformations") {
            return history.push("formations/allformations")
        } else if (e.target.value === "users") {
            return history.push("/formations/users")
        }
    };

    return (
        <div id="formation-bar-container">
            <NavLink className="navlink" to={"/formations"}>My Formations</NavLink>
            <NavLink className="navlink" to={"/formations/users"}>Users</NavLink>
            <NavLink className="navlink" to={"/formations/newformation"}>New Formation</NavLink>
            <NavLink className="navlink" to={"/formations/invitations"}>Invitations</NavLink>
            <NavLink className="navlink" to={`/formations/requests`}>Requests</NavLink>
            <input onChange={handleSearch} type="text" placeholder="search..." />
            <select onChange={handleModeChange}>
                <option value="myformations">My Formations</option>
                <option value="allformations">All Formations</option>
                <option value="users">Users</option>
            </select>
        </div>
    );
};

export default FormationBar;