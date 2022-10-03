import React from "react";
import InvitationCard from "./InvitationCard";

function Invitations({ currentUser, rejectInvitation, acceptInvitation }) {

    if (currentUser.invitations.length == 0) {
        return (
            <div id="formation-array-container">
                <h1>Invitations to Join Formations</h1>
                <h3>No invitations at this time.</h3>
            </div>
        );
    } else {
        const invitationDisplay = currentUser.invitations.map((el) => <InvitationCard
            key={`${currentUser.id}${el.id}`}
            invitation={el}
            rejectInvitation={rejectInvitation}
            acceptInvitation={acceptInvitation}
            currentUser={currentUser}
        />);

        return (
            <div id="formation-array-container">
                <h1>Invitations to Join Formations</h1>
                {invitationDisplay}
            </div>
        );
    }
};

export default Invitations;