import React from "react";
import Request from "./Request"

let requestDisplay = <h1>Loading...</h1>;

function ContactRequests({ isLoaded, currentUser, acceptRequest, rejectRequest }) {

    if (isLoaded) {
        requestDisplay = currentUser.requests.map((request) => {
            return (
                <Request
                    key={`${request.name}request`}
                    reqName={request.name}
                    reqId={request.userid}
                    reqPic={request.pic}
                    currentUser={currentUser}
                    acceptRequest={acceptRequest}
                    rejectRequest={rejectRequest}
                    requestedCircle={request.reqcirc}
                />
            );
        });
    }

    return (
        <div className="display-container">
            {requestDisplay}
        </div>
    );
};

export default ContactRequests;