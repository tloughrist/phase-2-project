import React from "react";
import RequestCard from "./RequestCard";


function Requests({ currentUser, userData, acceptRequest, rejectRequest }) {
    
    if (currentUser.requests.length == 0) {
        return (
            <div className="display-body">
                <h1>Requests to Join Formations</h1>
                <div className="display-container">
                    <h3>No requests at this time.</h3>
                </div>
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
            <div className="display-body">
                <h1>Requests to Join Formations</h1>
                <div className="display-container">
                    {requestDisplay}
                </div>
            </div> 
        );
    }    
};

export default Requests;