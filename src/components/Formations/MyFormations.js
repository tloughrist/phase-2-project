import React, { useEffect } from "react";
import FormationCard from "./FormationCard.js"

function MyFormations({ currentUser, userData, leaveFormation }) {

    const displayFormations = currentUser.formations.map((el) =>
    <FormationCard
        key={el.id}
        formation={el}
        currentUser={currentUser}
        userData={userData}
        leaveFormation={leaveFormation}
    />)

    return (
        <div className="display-body">
            <h1>My Formations</h1>
            <div className="display-container" id="formation-array-container">
                {displayFormations}
            </div>
        </div>
    );
};

export default MyFormations;