import React from "react";
import RequestCard from "./RequestCard";


function Requests({ currentUser, userData, acceptRequest, rejectRequest }) {
    
    if (currentUser.requests.length == 0) {
        return (
            <div id="formation-array-container">
                <h1>Requests to Join Formations</h1>
                <h3>No requests at this time.</h3>
            </div>
        );
    } else {

        const requestDisplay = currentUser.requests.map((el) =>
        <RequestCard
            key={`${el.id}request`}
            currentUser={currentUser}
            request={el}
            userData={userData}
            acceptRequest={acceptRequest}
            rejectRequest={rejectRequest}
        />);

        return (
            <div id="formation-array-container">
                <h1>Requests to Join Formations</h1>
                {requestDisplay}
            </div>
        );
    }    
};

export default Requests;