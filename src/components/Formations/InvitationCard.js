import React, {useState} from "react";

function InvitationCard({ invitation, acceptInvitation, rejectInvitation }) {
    
    const [pronouns, setPronouns] = useState(false);
    const [email, setEmail] = useState(false);
    const [phone, setPhone] = useState(false);
    const [address, setAddress] = useState(false);
    const [notes, setNotes] = useState(false);

    function handleAccept() {
        const newFormationObj = {
            name: invitation.name,
            color: invitation.color,
            image: invitation.image,
            id: invitation.id,
            owner: invitation.owner,
            admin: invitation.admin,
            pronouns: pronouns,
            email: email,
            phone: phone,
            address: address,
            notes: notes
        };
        return acceptInvitation(newFormationObj);
    };

    function handleReject() {
        return rejectInvitation(invitation.id);
    };

    return (
        <div className="formation-card" style={{ background: `${invitation.color}` }}>
            <img className="formation-image" src={invitation.image} alt={`${invitation.name} picture`} style={{ background: "rgb(174, 174, 174)" }} />
            <h2>{invitation.name}</h2>
            <h3>Owner: {invitation.owner}</h3>
            <div>
                <h3>What information would you like to share with the owner of this formation?</h3>
                <div>
                        <p><b>Pronouns</b></p>
                        <input onChange={e => setPronouns(!pronouns)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Email</b></p>
                        <input onChange={e => setEmail(!email)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Phone</b></p>
                        <input onChange={e => setPhone(!phone)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Address</b></p>
                        <input onChange={e => setAddress(!address)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Notes</b></p>
                        <input onChange={e => setNotes(!notes)} type="checkbox" />
                    </div>
            </div>
            <div>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default InvitationCard;