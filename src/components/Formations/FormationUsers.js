import React from "react";
import UserCard from "./UserCard";


function FormationUsers({ currentUser, userData, formationId }) {

    const currentFormation = currentUser.formations.filter((formation) => {
        return formation.uniqueid === formationId;
    });

    const formationUserArr = userData.filter((user) => {
        const formationIdArr = user.formations.map((formation) => formation.uniqueid);
        return formationIdArr.includes(formationId);
    })
    
    const displayUserCards = formationUserArr.map((user) => {
        return <UserCard key={`${user.name}card`} user={user} formationId={formationId} />
    });

    return (
        <div id="formation-array-container">
            <h1>Users in {currentFormation[0].name}</h1>
            {displayUserCards}
        </div>
    );
};

export default FormationUsers;