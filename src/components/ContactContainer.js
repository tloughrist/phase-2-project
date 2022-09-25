import React from "react";
import ContactCard from "./ContactCard";

let contactCardsDisplay = (
    <h1>Loading...</h1>
)

function ContactContainer({ currentUser, userData, isLoaded, updatePrivateNote, updateCircle, deleteContact}) {

    if (isLoaded) {

        const contactsIds = currentUser.contacts.map((contact) => contact.contactid);
        const contacts = userData.filter((user) => contactsIds.includes(user.id));
    
        contactCardsDisplay = contacts.map((contact) => {
            const currentUserContactData = currentUser.contacts.filter((userContact) => userContact.contactid === contact.id);
            const notes = currentUserContactData[0].privatenotes;
            const circ = currentUserContactData[0].circle;
            return <ContactCard
                key={`${contact.username}card`}
                user={contact}
                notes={notes}
                circle={circ}
                currentUser={currentUser}
                updatePrivateNote={updatePrivateNote}
                updateCircle={updateCircle}
                deleteContact={deleteContact}
            />;
        });
    }

    return (
        <div>
            <h1>Contacts</h1>
            {contactCardsDisplay}
        </div>
    );
};

export default ContactContainer;