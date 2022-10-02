import React from "react";

function FormationUserCard({ currentUser, user, formation, patchCurrentUser, patchUser }) {

    const userFormation = user.formations.find((el) => el.id === formation.id);

    const informationDisplay = [];

    if (userFormation.pronouns) {
        informationDisplay.push(<p key={`${user.token.username}pronouns`}><b>Pronouns:</b> {user.pronouns}</p>)
    }
    if (userFormation.email) {
        informationDisplay.push(<p key={`${user.token.username}email`}><b>Email:</b> {user.email}</p>)
    }
    if (userFormation.phone) {
        informationDisplay.push(<p key={`${user.token.username}phone`}><b>Phone:</b> {user.phone}</p>)
    }
    if (userFormation.address) {
        informationDisplay.push(<p key={`${user.token.username}address`}><b>Address:</b> {user.address}</p>)
    }
    if (userFormation.notes) {
        informationDisplay.push(<p key={`${user.token.username}notes`}><b>Notes:</b> {user.notes}</p>)
    }

    function handleRemoveUser(e) {
        const sansCurrentUserFormationsArr = currentUser.formations.filter((el) => el.id !== formation.id);
        const sansCurrentFormationArr = formation.users.filter((el) => el !== user.id);
        formation.users = sansCurrentFormationArr;
        const newCurrentUserFormationsArr = [...sansCurrentUserFormationsArr, formation];
        return patchCurrentUser({formations: newCurrentUserFormationsArr})
        .then(() => {
            const sansUserFormationsArr = user.formations.filter((el) => el.id !== formation.id);
            patchUser(user.id, {formations: sansUserFormationsArr});
        });
    };

    if (currentUser.id === formation.admin) {
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

export default FormationUserCard;