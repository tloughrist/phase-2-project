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

    return (
        <div className="display-container" id="formation-array-container">
            {displayFormations}
        </div>
    );
};

export default MyFormations;