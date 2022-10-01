import React from "react";
import UserCard from "./UserCard";

function FormationUsers({ currentUser, userData, formation, patchCurrentUser }) {
    const formationUserArr = userData.filter((user) => formation.users.includes(user.id));

    const formationOwnerArr = userData.filter((user) => user.id === formation.admin);

    const formationOwner = formationOwnerArr[0];
    
    const displayUserCards = formationUserArr.map((user) => {
        return <UserCard key={`${user.token.username}card`} user={user} formation={formation} currentUser={currentUser} patchCurrentUser={patchCurrentUser} />
    });

    const displayOwnerCard = <UserCard key={`${formationOwner.token.username}card`} user={formationOwner} formation={formation} currentUser={currentUser} patchCurrentUser={patchCurrentUser} />;

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