import React, { useReducer } from "react";

function UserCard({ currentUser, user, formationId, currentFormation, patchCurrentUser }) {

    const userFormationObjArr = user.formations.filter((formation) => formation.id === formationId);

    const userFormationObj = userFormationObjArr[0];

    const informationDisplay = [];

    if (userFormationObj.pronouns) {
        informationDisplay.push(<p key={`${user.token.username}pronouns`}><b>Pronouns:</b> {user.pronouns}</p>)
    }
    if (userFormationObj.email) {
        informationDisplay.push(<p key={`${user.token.username}email`}><b>Email:</b> {user.email}</p>)
    }
    if (userFormationObj.phone) {
        informationDisplay.push(<p key={`${user.token.username}phone`}><b>Phone:</b> {user.phone}</p>)
    }
    if (userFormationObj.address) {
        informationDisplay.push(<p key={`${user.token.username}address`}><b>Address:</b> {user.address}</p>)
    }
    if (userFormationObj.notes) {
        informationDisplay.push(<p key={`${user.token.username}notes`}><b>Notes:</b> {user.notes}</p>)
    }

    function handleRemoveUser() {
        const sansCurrentUserFormationsArr = currentUser.formations.fiter((formation) => formation.id !== formationId);
        const sansCurrentFormationArr = currentFormation.users.filter((formationUser) => formationUser !== user.id);
        const newCurrentUserFormationsArr = [...sansCurrentUserFormationsArr, ...sansCurrentFormationArr];
        patchCurrentUser({formations: newCurrentUserFormationsArr});
    };

    if (currentUser.id === currentFormation.admin) {
        return (
            <div className="user-card">
                <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
                <div className="userinfo">
                    <h3>{user.name}</h3>
                    {informationDisplay}
                    <div>
                        <button onClick={handleRemoveUser}>Remove User</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="user-card">
                <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
                <div className="userinfo">
                    <h3>{user.name}</h3>
                    {informationDisplay}
                </div>
            </div>
        );
    }
    
};

export default UserCard;