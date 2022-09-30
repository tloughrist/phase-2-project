import React from "react";
import FormationCard from "./FormationCard.js"

function MyFormations({ currentUser }) {

    let displayFormations = <h2>No formations yet.</h2>

    if (currentUser.formations.length > 0) {
        displayFormations = currentUser.formations.map((formation) => {
            return <FormationCard
                key={`${currentUser.token.username}${formation.name}`}
                formation={formation}
            />;
        });
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