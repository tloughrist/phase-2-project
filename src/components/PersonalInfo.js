import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function PersonalInfo({ currentUser, token, patchCurrentUser }) {

    const [name, setName] = useState();
    const [dob, setDob] = useState();
    const [pic, setPic] = useState();
    const [pronouns, setPronouns] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [notes, setNotes] = useState();

    function handleMyInfoSubmit(e) {
        e.preventDefault();
        const newUserObj = {
            name: name,
            dob: dob,
            pic: pic,
            pronouns: pronouns,
            phone: phone,
            email: email,
            address: address,
            notes: notes
        };
        alert("Information updated");
        return patchCurrentUser(newUserObj);
    };

    if (token === "valid" && currentUser) {
        return (
            <div className="display-container">
                <div className="user-card">
                    <img src={currentUser.pic} className="user-image" alt={`${currentUser.name} picture`} />
                    <div className="userinfo inset-card">
                        <h3>{currentUser.name}</h3>
                        <p><b>Username:</b> {currentUser.token.username}</p>
                        <p><b>Pronouns:</b> {currentUser.pronouns}</p>
                        <p><b>Date of Birth:</b> {currentUser.dob}</p>
                        <p><b>Email:</b> {currentUser.email}</p>
                        <p><b>Phone:</b> {currentUser.phone}</p>
                        <p><b>Address:</b> {currentUser.address}</p>
                        <p><b>Notes:</b> {currentUser.notes}</p>
                    </div>
                </div>
                <form className="form-card" id="myuserform" onSubmit={handleMyInfoSubmit} >
                    <h2 className="form-element">Change Information</h2>
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-element" type="text" name="name" defaultValue={currentUser.name} onChange={e => setName(e.target.value)}/>
                    <label className="form-label" htmlFor="dob">Birthday</label>
                    <input className="form-element" type="date" name="dob" defaultValue={currentUser.dob} onChange={e => setDob(e.target.value)}/>
                    <label className="form-label" htmlFor="pronouns">Pronouns</label>
                    <input className="form-element" type="text" name="pronouns" defaultValue={currentUser.pronouns} onChange={e => setPronouns(e.target.value)}/>
                    <label className="form-label" htmlFor="phoneno">Phone Number</label>
                    <input className="form-element" type="tel" name="phoneno" defaultValue={currentUser.phone} onChange={e => setPhone(e.target.value)}/>
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input className="form-element" type="email" name="email" defaultValue={currentUser.email} onChange={e => setEmail(e.target.value)}/>
                    <label className="form-label" htmlFor="address">Address</label>
                    <input className="form-element" type="textbox" name="address" defaultValue={currentUser.address} onChange={e => setAddress(e.target.value)}/>
                    <label className="form-label" htmlFor="picurl">Picture Url</label>
                    <input className="form-element" type="url" name="picurl" defaultValue={currentUser.pic} onChange={e => setPic(e.target.value)}/>
                    <label className="form-label" htmlFor="addnotes">Additional Notes</label>
                    <input className="form-element" type="textbox" name="addnotes" defaultValue={currentUser.notes} onChange={e => setNotes(e.target.value)}/>
                    <input className="form-element" type="submit"></input>
                </form>
            </div>
        );
    } else if (token === "invalid") {
        return <Redirect to="/login" />;
    } else {
        return <h1>Loading...</h1>;
    }
};

export default PersonalInfo;