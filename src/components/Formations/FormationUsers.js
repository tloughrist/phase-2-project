import React from "react";
import FormationUserCard from "./FormationUserCard";

function FormationUsers({ currentUser, userData, formation, patchCurrentUser, patchUser }) {

    if (currentUser.id === formation.admin) {
        
        const formationUserArr = userData.filter((el) => formation.users.includes(el.id));

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

        return (
            <div id="formation-array-container">
                <h1>Users in {formation.name}</h1>
                {displayUserCards}
            </div>
        );
    } else {

        const formationOwner = userData.find((el) => el.id === formation.admin);

        const displayOwnerCard = <FormationUserCard
            key={`${formationOwner.token.username}card`}
            user={formationOwner}
            formation={formation}
            currentUser={currentUser}
            patchCurrentUser={patchCurrentUser}
        />;

        return (
            <div id="formation-array-container">
                <h1>Owner of {formation.name}</h1>
                {displayOwnerCard}
            </div>
        );
    } 
};

export default FormationUsers;