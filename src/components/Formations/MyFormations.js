import React from "react";
import FormationCard from "./FormationCard.js"

function MyFormations({ currentUser, searchValue }) {

    let displayFormations = <h2>No formations yet.</h2>

    if (currentUser.formations.length > 0) {
        displayFormations = currentUser.formations.map((formation) => <FormationCard key={formation.id} formation={formation} currentUser={currentUser} />);
    }
    
    return (
        <div>
            <h1>My Formations</h1>
            <div id="formation-array-container">
                {displayFormations}
            </div>
        </div>
    );
};

export default MyFormations;