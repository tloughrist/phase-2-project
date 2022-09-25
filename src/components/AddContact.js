import React from "react";
import ContactCard from "./ContactCard";

let searchDisplay = <h1>Loading...</h1>;

function AddContact({ currentUser, isLoaded, userData, searchValue, handleRequest }) {
    
    if (isLoaded) {
        const searchedUsers = userData.filter((user) => {
            return user.username.toLowerCase().includes(searchValue.toLowerCase());
        });
        searchDisplay = searchedUsers.map((searchedUser) => {
            return (
                <ContactCard
                    key={`${searchedUser.username}card`}
                    user={searchedUser}
                    currentUser={currentUser}
                    handleRequest={handleRequest}
                    search={true}
                />
            );
        });
    }

    return (
        <div>
            <h1>Add Contact</h1>
            {searchDisplay}
        </div>
    );
};

export default AddContact;