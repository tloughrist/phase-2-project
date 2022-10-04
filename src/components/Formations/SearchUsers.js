import React from "react";
import SearchCard from "./SearchCard";

function SearchUsers({ currentUser, userData, sendInvite, sendRequest }) {

    const userDisplay = userData.map((el) => {
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
        <div className="display-container">
            {userDisplay}
        </div>
    );
};

export default SearchUsers;