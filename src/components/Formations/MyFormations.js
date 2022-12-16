import React from "react";
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
    
    if (currentUser.formations.length > 0) {
        return (
            <div className="display-container" id="formation-array-container">
                {displayFormations}
            </div>
        );
    } else {
        return (
            <div className="display-container" id="formation-array-container">
                <h3>No formations at this time.</h3>
            </div>
        );
    }
    
};

export default MyFormations;