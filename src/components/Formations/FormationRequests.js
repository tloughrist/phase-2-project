import React from "react";


function FormationRequests({ currentUser, formationId }) {
    
    const currentFormation = currentUser.formations.filter((formation) => {
        return formation.uniqueid === formationId;
    });
    
    return (
        <div id="formation-array-container">
            <h1>Requests to Join {currentFormation[0].name}</h1>
        </div>
    );
};

export default FormationRequests;