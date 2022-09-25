import React from "react";
import Request from "./Request"

let requestDisplay = <h1>Loading...</h1>;

function ContactRequests({ isLoaded, currentUser, userData, handleAccept, handleReject }) {

    if (isLoaded) {
        requestDisplay = currentUser.requests.map((request) => {
            return (
                <Request
                    key={`${request.name}request`}
                    reqName={request.name}
                    reqId={request.userid}
                    reqPic={request.pic}
                    currentUser={currentUser}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                    requestedCircle={request.reqcirc}
                />
            );
        });
    }

    return (
        <div>
            <h1>Requests</h1>
            {requestDisplay}
        </div>
    );
};

export default ContactRequests;