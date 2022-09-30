import React from "react";

function UserCard({ user, formationId }) {

    const userFormationObj = user.formations.filter((formation) => formation.uniqueid === formationId);

    const informationDisplay = [];
    
    if (userFormationObj[0].pronouns === "shared") {
        informationDisplay.push(<p key={`${user.name}pronouns`}><b>Pronouns:</b> {user.pronouns}</p>)
    }
    if (userFormationObj[0].email === "shared") {
        informationDisplay.push(<p key={`${user.name}email`}><b>Email:</b> {user.email}</p>)
    }
    if (userFormationObj[0].phone === "shared") {
        informationDisplay.push(<p key={`${user.name}phone`}><b>Phone:</b> {user.phone}</p>)
    }
    if (userFormationObj[0].address === "shared") {
        informationDisplay.push(<p key={`${user.name}address`}><b>Address:</b> {user.address}</p>)
    }
    if (userFormationObj[0].notes === "shared") {
        informationDisplay.push(<p key={`${user.name}notes`}><b>Notes:</b> {user.notes}</p>)
    }

    return (
        <div className="user-card">
            <img key={`${user.name}pic`} className="user-image" src={user.pic} alt={`${user.name} picture`} />
            <div key={`${user.name}userinfo`} className="userinfo">
                <h3>{user.name}</h3>
                {informationDisplay}
            </div>
        </div>
    );
};

export default UserCard;