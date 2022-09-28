import React, { useState } from "react";

function ContactCard({ user, notes, circle, currentUser, updatePrivateNote, updateCircle, deleteContact }) {

    const [privateNotes, setPrivateNotes] = useState(notes);
    const [currentCircle, setCurrentCircle] = useState(circle);


    function handlePrivNoteSubmit(e) {
        e.preventDefault();
        return updatePrivateNote(e.target.privnotes.value, currentUser, user.id);
    };

    function handleCircleSubmit(e) {
        e.preventDefault();
        return updateCircle(e.target.circle.value, currentUser, user.id);
    };

    function handleDeleteSubmit(e) {
        e.preventDefault();
        return deleteContact(currentUser, user.id);
    };

    function handleNoteChange(e) {
        return setPrivateNotes(e.target.value);
    };

    function handleCircleChange(e) {
        return setCurrentCircle(e.target.value);
    };

    const informationDisplay = [];

    let proxy = 0;
    const userContact = user.contacts.filter((contact) => contact.contactid === currentUser.id);
    const userCircle = userContact[0].circle;
    user.pronounsfilter.includes(userCircle) ? informationDisplay.push(<p key={`${user.name}pronouns`}><b>Pronouns:</b> {user.pronouns}</p>) : proxy = 0;
    user.dobfilter.includes(userCircle) ? informationDisplay.push(<p key={`${user.name}dob`}><b>Date of Birth:</b> {user.dob}</p>) : proxy = 0;
    user.emailfilter.includes(userCircle) ? informationDisplay.push(<p key={`${user.name}email`}><b>Email:</b> {user.email}</p>) : proxy = 0;
    user.phonefilter.includes(userCircle) ? informationDisplay.push(<p key={`${user.name}phone`}><b>Phone:</b> {user.phone}</p>) : proxy = 0;
    user.addressfilter.includes(userCircle) ? informationDisplay.push(<p key={`${user.name}address`}><b>Address:</b> {user.address}</p>) : proxy = 0;
    user.addnotesfilter.includes(userCircle) ? informationDisplay.push(<p key={`${user.name}addnotes`}><b>Public Notes:</b> {user.addnotes}</p>) : proxy = 0;

    return (
        <div className="contact-card">
            <img key={`${user.name}pic`} className="contact-image" src={user.pic} alt={`${user.name} picture`} />
            <div key={`${user.name}contactinfo`} className="contactinfo">
                <h3>{user.name}</h3>
                <p><b>Username:</b> {user.username}</p>
                {informationDisplay}
                <form className="contact-card-form" onSubmit={handlePrivNoteSubmit}>
                    <label htmlFor="privnotes"><b>Your Notes</b></label>
                    <textarea name="privnotes" value={privateNotes} onChange={handleNoteChange} />
                    <input type="submit" value="Submit Changes" />
                </form>
                <form className="contact-card-form" onSubmit={handleCircleSubmit}>
                    <label htmlFor="circle"><b>Circle</b></label>
                    <select name="circle" value={currentCircle} onChange={handleCircleChange}>
                        <option value="family">Family</option>
                        <option value="friends">Friends</option>
                        <option value="collegues">Collegues</option>
                    </select>
                    <input type="submit" value="Submit Changes" />
                </form>
                <hr></hr>
                <form className="contact-card-form delete" onSubmit={handleDeleteSubmit}>
                    <input type="submit" value="Delete Contact" /> 
                </form>
            </div>
        </div>
    );
};

export default ContactCard;