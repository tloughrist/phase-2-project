import React from "react";
import SearchCard from "./SearchCard";

function AddContact({ currentUser, isLoaded, userData, searchValue, makeRequest }) {
    
    if (isLoaded) {
        let searchDisplay;
        const searchedUsers = userData.filter((user) => {
            return user.username.toLowerCase().includes(searchValue.toLowerCase());
        });

        if (searchedUsers.length > 0) {
            searchDisplay = searchedUsers.map((searchedUser) => {
                return (
                    <SearchCard
                        key={`${searchedUser.username}card`}
                        user={searchedUser}
                        currentUser={currentUser}
                        makeRequest={makeRequest}
                    />
                );
            });
        } else {
            searchDisplay = <h3>No Users Match Search String</h3>
        }

        return (
            <div className="display-container">
                {searchDisplay}
            </div>
        );
    } else {
        return (
            <div className="display-container">
                <h1>Loading...</h1>;
            </div>
        );
    }
};

export default AddContact;