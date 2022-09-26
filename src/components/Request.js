import React, { useState } from "react";

function Request({ reqName, reqId, reqPic, currentUser, acceptRequest, rejectRequest, requestedCircle }) {

    function handleAcceptClick(e) {
        const currentUserCircle = e.target.previousSibling.value;
        return acceptRequest(currentUser, reqId, currentUserCircle, requestedCircle);
    };

    function handleRejectClick() {
        return rejectRequest();
    };

    return (
        <div className="request">
            <h3>{reqName} wants to connect with you.</h3>
            <img src={reqPic} alt={`${reqName}pic`} />
            <label htmlFor="circle">Circle:</label>
            <select name="circle">
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="collegues">Collegues</option>
            </select>
            <button className="acceptrequest" onClick={handleAcceptClick}>Accept Request</button>
            <button className="rejectrequest" onClick={handleRejectClick}>Reject Request</button>
        </div>
    );
};

export default Request;