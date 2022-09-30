import React from "react";
import { NavLink } from "react-router-dom";

function FormationCard({ formation }) {

    return (
        <div className="formation-card" style={{ background: `${formation.color}` }}>
            <img className="formation-image" src={formation.image} alt={`${formation.name} picture`} />
            <h2>{formation.name}</h2>
            <div>
                <NavLink className="navlink" to={`/formations/${formation.uniqueid}/users`}>Users</NavLink>
                <NavLink className="navlink" to={`/formations/${formation.uniqueid}/info`}>Shared Information</NavLink>
                <NavLink className="navlink" to={`/formations/${formation.uniqueid}/requests`}>Requests</NavLink>
                <NavLink className="navlink" to={`/formations/${formation.uniqueid}/settings`}>Settings</NavLink>
            </div>
        </div>
    );
};

export default FormationCard;