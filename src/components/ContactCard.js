import React, { useState } from "react";

function ContactCard({ user, notes, circle, currentUser, updatePrivateNote, updateCircle, deleteContact, search, handleRequest }) {

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

    function handleRequestClick() {
        return handleRequest(currentUser, user);
    };

    if (search) {
        return (
            <div className="contact-card">
                <h3>{user.name}</h3>
                <p>{user.username}</p>
                <img src={user.pic} alt={`${user.name} picture`} />
                <button onClick={handleRequestClick}>Request Information</button>
            </div>
        );
    } else if (user !== currentUser) {
        return (
            <div className="contact-card">
                <h3>{user.name}</h3>
                <p>{user.username}</p>
                <p>{user.pronouns}</p>
                <p>{user.dob}</p>
                <img src={user.pic} alt={`${user.name} picture`} />
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
                <p>Their Notes: {user.addnotes}</p>
                <form onSubmit={handlePrivNoteSubmit}>
                    <label htmlFor="privnotes">Your Notes:</label>
                    <textarea name="privnotes" value={privateNotes} onChange={handleNoteChange} />
                    <input type="submit" value="Submit Changes" />
                </form>
                <form onSubmit={handleCircleSubmit}>
                    <label htmlFor="circle">Circle:</label>
                    <select name="circle" value={currentCircle} onChange={handleCircleChange}>
                        <option value="family">Family</option>
                        <option value="friends">Friends</option>
                        <option value="collegues">Collegues</option>
                    </select>
                    <input type="submit" value="Submit Changes" />
                </form>
                <form onSubmit={handleDeleteSubmit}>
                    <input type="submit" value="Delete Contact" /> 
                </form>
            </div>
        );
    } else {
        return (
            <div className="contact-card">
                <h3>{user.name}</h3>
                <p>{user.username}</p>
                <p>{user.pronouns}</p>
                <p>{user.dob}</p>
                <img src={user.pic} alt={`${user.name} picture`} />
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
                <p>Your Notes: {user.addnotes}</p>
            </div>
        );
    }
};

export default ContactCard;