import React from "react";
import FormationUserCard from "./FormationUserCard";

function FormationUsers({ currentUser, userData, formation, patchCurrentUser, patchUser, isLoaded }) {

    if (isLoaded) {

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
                <div className="display-body">
                    <h1>Users in {formation.name}</h1>
                    <div className="display-container" id="formation-array-container">
                        {displayUserCards}
                    </div>
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
                <div className="display-body">
                    <h1>Owner of {formation.name}</h1>
                    {displayOwnerCard}
                </div>
            );
        }
    } else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
};

export default FormationUsers;