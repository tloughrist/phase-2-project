import React from "react";

function RequestCard({ request, userData, acceptRequest, rejectRequest }) {
    
    const supplicant = userData.find((el) => el.id === request.supplicant);

    function handleAccept() {
        const newFormationObj = {
            name: request.name,
            color: request.color,
            image: request.image,
            id: request.id,
            owner: request.owner,
            admin: request.admin,
            pronouns: false,
            email: false,
            phone: false,
            address: false,
            notes: false
        };
        return acceptRequest(newFormationObj, request.supplicant);
    };

    function handleReject() {
        return rejectRequest(request.id);
    };

    return (
        <div style={{ background: `${request.color}` }} >
            <div className="form-card">
                <div>
                    <h3>{supplicant.name} ({supplicant.token.username}) wants to join {request.name}</h3>
                </div>
                <div align="center">
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;