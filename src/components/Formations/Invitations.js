import React from "react";
import InvitationCard from "./InvitationCard";


function Invitations({ currentUser, rejectInvitation, acceptInvitation }) {

    

    const invitationDisplay = currentUser.invitations.map((invitation) => <InvitationCard key={`${currentUser.id}${invitation.ownerid}`} invitation={invitation} rejectInvitation={rejectInvitation} acceptInvitation={acceptInvitation}/>)

    return (
        <div id="formation-array-container">
            <h1>Invitations</h1>
            {invitationDisplay}
        </div>
    );
};

export default Invitations;