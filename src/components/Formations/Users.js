import React from "react";
import SearchCard from "./SearchCard";

function Users({ searchValue, currentUser, userData, sendInvite, sendRequest }) {

    const displayedUsers = userData.filter((el) => {
        return el.token.username.toLowerCase().includes(searchValue) || el.name.toLowerCase().includes(searchValue);
    });

    const userDisplay = displayedUsers.map((el) => {
        if (el.id !== currentUser.id) {
            return <SearchCard
                key={`${el.token.username}searchcard`}
                currentUser={currentUser}
                user={el}
                sendInvite={sendInvite}
                sendRequest={sendRequest}
            />
        } else {
            return;
        }
    });

    return (
        <div id="formation-array-container">
            <h1>Users</h1>
            {userDisplay}
        </div>
    );
};

export default Users;