import React from "react";
import InvitationCard from "./InvitationCard";

function Invitations({ currentUser, rejectInvitation, acceptInvitation }) {

    if (currentUser.invitations.length == 0) {
        return (
            <div className="display-container">
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
            <div className="display-container">
                {invitationDisplay}
            </div>
        );
    }
};

export default Invitations;