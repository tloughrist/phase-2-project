import React from "react";

function SearchCard({ user, makeRequest, currentUser }) {

    function handleRequestClick(e) {
        const requestedCircle = e.target.previousSibling.value;
        return makeRequest(currentUser, user, requestedCircle);
    };

    return (
        <div className="contact-card">
            <img src={user.pic} className="contact-image" alt={`${user.name} picture`} />
            <div className="contactinfo">
                <h3>{user.name}</h3>
                <p><b>Username:</b> {user.username}</p>
                <select name="circle" defaultValue="family">
                    <option value="family">Family</option>
                    <option value="friends">Friends</option>
                    <option value="collegues">Collegues</option>
                </select>
                <button onClick={handleRequestClick}>Request Information</button>
            </div>
        </div>
    );
};

export default SearchCard;