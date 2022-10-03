import React from "react";
import { NavLink } from "react-router-dom";

function FormationCard({ currentUser, formation, userData, leaveFormation }) {

    function handleLeaveFormation() {
        return leaveFormation(formation);
    };

    if (currentUser.id === formation.admin) {
        return (
            <div className="formation-card" style={{ background: `${formation.color}` }}>
                <img className="formation-image" src={formation.image} alt={`${formation.name} picture`} style={{ background: "rgb(200, 200, 200)" }} />
                <h2>{formation.name}</h2>
                <div className="formation-buttons">
                    <NavLink className="navlink" to={`/formations/${formation.id}/users`}>Users</NavLink>
                    <NavLink className="navlink" to={`/formations/${formation.id}/info`}>Shared Information</NavLink>
                    <NavLink className="navlink" to={`/formations/${formation.id}/settings`}>Settings</NavLink>
                </div>
            </div>
        );
    } else {

        const owner = userData.find((el) => el.id === formation.admin);
        const ownerCopyFormation = owner.formations.find((el) => el.id === formation.id);

        return (
            <div className="formation-card" style={{ background: `${ownerCopyFormation.color}` }}>
                <img className="formation-image" src={ownerCopyFormation.image} alt={`${ownerCopyFormation.name} picture`} style={{ background: "rgb(200, 200, 200)" }} />
                <h2>{ownerCopyFormation.name}</h2>
                <h3>Owned by: {owner.name} ({owner.token.username})</h3>
                <div className="formation-buttons">
                    <NavLink className="navlink" to={`/formations/${formation.id}/users`}>Owner Info</NavLink>
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