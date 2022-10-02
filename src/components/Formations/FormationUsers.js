import React from "react";
import FormationUserCard from "./FormationUserCard";

function FormationUsers({ currentUser, userData, formation, patchCurrentUser, patchUser }) {
    const formationUserArr = userData.filter((el) => formation.users.includes(el.id));

    const formationOwner = userData.find((el) => el.id === formation.admin);
    console.log(formationUserArr)
    const displayUserCards = formationUserArr.map((el) => {
        return <FormationUserCard
            key={`${el.token.username}card`}
            user={el}
            formation={formation}
            currentUser={currentUser}
            patchCurrentUser={patchCurrentUser}
            patchUser={patchUser}
        />;
    });

    const displayOwnerCard = <FormationUserCard
        key={`${formationOwner.token.username}card`}
        user={formationOwner}
        formation={formation}
        currentUser={currentUser}
        patchCurrentUser={patchCurrentUser}
    />;

    if (currentUser.id === formation.admin) {
        return (
            <div id="formation-array-container">
                <h1>Users in {formation.name}</h1>
                {displayUserCards}
            </div>
        );
    } else {
        return (
            <div id="formation-array-container">
                <h1>Owner of {formation.name}</h1>
                {displayOwnerCard}
            </div>
        );
    } 
};

export default FormationUsers;