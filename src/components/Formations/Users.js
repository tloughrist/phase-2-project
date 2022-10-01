import React from "react";
import SearchCard from "./SearchCard";


function Users({ searchValue, currentUser, userData }) {

    const displayedUsers = userData.filter((user) => {
        return user.token.username.toLowerCase().includes(searchValue) || user.name.toLowerCase().includes(searchValue);
    });

    const userDisplay = displayedUsers.map((user) => {
        if (user.id !== currentUser.id) {
            return <SearchCard key={`${user.token.username}searchcard`} currentUser={currentUser} user={user} />
        } else {
            return;
        }
    })

    return (
        <div id="formation-array-container">
            <h1>Users</h1>
            {userDisplay}
        </div>
    );
};

export default Users;