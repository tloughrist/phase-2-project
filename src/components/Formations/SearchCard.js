import React, { useReducer } from "react";

function SearchCard({ currentUser, user }) {

    function handleInvite(e) {
        e.preventDefault();
        console.log("unwritten");
    };

    const formations = currentUser.formations.map((formation) => {
        return <option key={`${formation.id}option`} value={formation.id}>{formation.name}</option>
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
                <select>
                    {formations}
                </select>
                <input type="submit" />
            </form>
        </div>
    );
};

export default SearchCard;