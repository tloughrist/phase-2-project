import React from "react";
import InvitationCard from "./InvitationCard";


function Invitations({ currentUser, rejectInvitation, acceptInvitation }) {

    const invitationDisplay = currentUser.invitations.map((el) => <InvitationCard key={`${currentUser.id}${el.id}`} invitation={el} rejectInvitation={rejectInvitation} acceptInvitation={acceptInvitation} currentUser={currentUser} />)

    return (
        <div id="formation-array-container">
            <h1>Invitations</h1>
            {invitationDisplay}
        </div>
    );
};

export default Invitations;