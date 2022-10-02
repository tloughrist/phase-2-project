import React, { useReducer } from "react";

function SearchCard({ currentUser, user, sendInvite }) {

    function handleInvite(e) {
        e.preventDefault();
        const selectedFormationArr = currentUser.formations.filter((formation) => formation.id == e.target.formationinvite.value)
        const selectedFormation = selectedFormationArr[0];
        return sendInvite(selectedFormation, user, currentUser);
    };

    const formations = currentUser.formations.map((el) => {
        if (el.admin === currentUser.id) {
            return <option key={`${el.id}option`} value={el.id}>{el.name}</option>
        }
    });

    return (
        <div className="user-card">
            <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
            <div className="userinfo">
                <h3>{user.name}</h3>
                <p><b>{user.token.username}</b></p>
            </div>
            <form onSubmit={handleInvite}>
                <p>Invite user to join...</p>
                <select name="formationinvite">
                    {formations}
                </select>
                <input type="submit" />
            </form>
        </div>
    );
};

export default SearchCard;