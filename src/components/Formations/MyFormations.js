import React, { useEffect } from "react";
import FormationCard from "./FormationCard.js"

function MyFormations({ currentUser, searchValue, userData, patchCurrentUser,isLoaded }) {

    const displayFormations = currentUser.formations.map((el1) => <FormationCard key={el1.id} formation={el1} currentUser={currentUser} userData={userData}/>)

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