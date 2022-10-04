import React from "react";

function SearchCard({ currentUser, user, sendInvite, sendRequest }) {

    function handleInvite(e) {
        e.preventDefault();
        const selectedFormation = currentUser.formations.find((el) => el.id == e.target.formationinvite.value);
        return sendInvite(selectedFormation, user, currentUser);
    };

    function handleRequest(e) {
        e.preventDefault();
        const selectedFormation = user.formations.find((el) => el.id == e.target.formationrequest.value);
    return sendRequest(selectedFormation, user, currentUser);
    };

    const yourFormations = currentUser.formations.map((el) => {
        if (el.admin === currentUser.id) {
            return <option key={`${el.id}option`} value={el.id}>{el.name}</option>
        }
    });

    const theirFormations = user.formations.map((el) => {
        if (el.admin === user.id) {
            return <option key={`${el.id}option`} value={el.id}>{el.name}</option>
        }
    });

    const currentUserFormationOwnedArr = currentUser.formations.filter((el) => el.admin === currentUser.id);

    const userFormationOwnedArr = user.formations.filter((el) => el.admin === user.id);

    const currentUserOwns = currentUserFormationOwnedArr.length > 0;
    const userOwns = userFormationOwnedArr.length > 0;

    if (currentUserOwns && userOwns) {
        return (
            <div className="user-card">
                <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
                <div className="inset-card">
                    <div className="userinfo">
                        <h3>{user.name}</h3>
                        <p><b>{user.token.username}</b></p>
                    </div>
                    <form className="card-form" onSubmit={handleInvite}>
                        <p>Invite user to join...</p>
                        <select name="formationinvite">
                            {yourFormations}
                        </select>
                        <input type="submit" />
                    </form>
                    <form className="card-form" onSubmit={handleRequest}>
                        <p>Request to join...</p>
                        <select name="formationrequest">
                            {theirFormations}
                        </select>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    } else if (currentUserOwns) {
        return (
            <div className="user-card">
                <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
                <div className="inset-card">
                    <div className="userinfo">
                        <h3>{user.name}</h3>
                        <p><b>{user.token.username}</b></p>
                    </div>
                    <form className="card-form" onSubmit={handleInvite}>
                        <p>Invite user to join...</p>
                        <select name="formationinvite">
                            {yourFormations}
                        </select>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    } else if (userOwns) {
        return (
            <div className="user-card">
                <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
                <div className="inset-card">
                    <div className="userinfo">
                        <h3>{user.name}</h3>
                        <p><b>{user.token.username}</b></p>
                    </div>
                    <form className="card-form" onSubmit={handleRequest}>
                        <p>Request to join...</p>
                        <select name="formationrequest">
                            {theirFormations}
                        </select>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="user-card">
                <img className="user-image" src={user.pic} alt={`${user.token.username} picture`} />
                <div className="userinfo">
                    <h3>{user.name}</h3>
                    <p><b>{user.token.username}</b></p>
                </div>
            </div>
        );
    }
};

export default SearchCard;