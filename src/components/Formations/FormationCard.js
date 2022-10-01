import React from "react";
import { NavLink } from "react-router-dom";

function FormationCard({ currentUser, formation }) {

    function handleLeaveFormation() {
        console.log("unwritten")
    };

    if (currentUser.id === formation.admin) {
        return (
            <div className="formation-card" style={{ background: `${formation.color}` }}>
                <img className="formation-image" src={formation.image} alt={`${formation.name} picture`} style={{ background: "rgb(174, 174, 174)" }} />
                <h2>{formation.name}</h2>
                <div>
                    <NavLink className="navlink" to={`/formations/${formation.id}/users`}>Users</NavLink>
                    <NavLink className="navlink" to={`/formations/${formation.id}/info`}>Shared Information</NavLink>
                    <NavLink className="navlink" to={`/formations/${formation.id}/requests`}>Requests</NavLink>
                    <NavLink className="navlink" to={`/formations/${formation.id}/settings`}>Settings</NavLink>
                </div>
            </div>
        );
    } else {
        return (
            <div className="formation-card" style={{ background: `${formation.color}` }}>
                <img className="formation-image" src={formation.image} alt={`${formation.name} picture`} style={{ background: "rgb(174, 174, 174)" }} />
                <h2>{formation.name}</h2>
                <div>
                    <NavLink className="navlink" to={`/formations/${formation.id}/users`}>Owner</NavLink>
                    <NavLink className="navlink" to={`/formations/${formation.id}/info`}>Shared Information</NavLink>
                </div>
                <div>
                    <button onClick={handleLeaveFormation}>Leave Formation</button>
                </div>
            </div>
        );
    }
};

export default FormationCard;