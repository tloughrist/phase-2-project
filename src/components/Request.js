import React, { useState } from "react";

function Request({ reqName, reqId, reqPic, currentUser }) {

    function handleAcceptClick() {
        console.log('accept')
    };

    function handleRejectClick() {
        console.log('reject')
    };

    return (
        <div className="request">
            <h3>{reqName} wants to connect with you.</h3>
            <img src={reqPic} alt={`${reqName}pic`} />
            <button className="acceptrequest" onClick={handleAcceptClick}>Accept Request</button>
            <button className="rejectrequest" onClick={handleRejectClick}>Reject Request</button>
        </div>
    );
};

export default Request;