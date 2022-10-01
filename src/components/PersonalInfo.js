import React from "react";
import { Redirect } from "react-router-dom";

function PersonalInfo({ currentUser, token, patchUser, updateCurrentUser }) {

    function handleMyInfoSubmit(e) {
        e.preventDefault();
        const newUserObj = {
            name: e.target.name.value,
            dob: e.target.dob.value,
            pic: e.target.picurl.value,
            pronouns: e.target.pronouns.value,
            phone: e.target.phoneno.value,
            email: e.target.email.value,
            address: e.target.address.value,
            notes: e.target.addnotes.value
        };
        return (patchUser(currentUser.id, newUserObj)
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data)));
    };

    if (token === "valid" && currentUser) {
        return (
            <div className="display-container">
                <div className="user-card">
                    <img src={currentUser.pic} className="user-image" alt={`${currentUser.name} picture`} />
                    <div className="userinfo">
                        <h3>{currentUser.name}</h3>
                        <p><b>Username:</b> {currentUser.token.username}</p>
                        <p><b>Pronouns:</b> {currentUser.pronouns}</p>
                        <p><b>Date of Birth:</b> {currentUser.dob}</p>
                        <p><b>Email:</b> {currentUser.email}</p>
                        <p><b>Phone:</b> {currentUser.phone}</p>
                        <p><b>Address:</b> {currentUser.address}</p>
                        <p><b>Public Notes:</b> {currentUser.notes}</p>
                    </div>
                </div>
                <form className="form-card" id="myuserform" onSubmit={handleMyInfoSubmit} >
                    <h2 className="form-element">Change Information</h2>
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-element" type="text" name="name" defaultValue={currentUser.name} />
                    <label className="form-label" htmlFor="dob">Birthday</label>
                    <input className="form-element" type="date" name="dob" defaultValue={currentUser.dob} />
                    <label className="form-label" htmlFor="pronouns">Pronouns</label>
                    <input className="form-element" type="text" name="pronouns" defaultValue={currentUser.pronouns} />
                    <label className="form-label" htmlFor="phone1no">Phone Number</label>
                    <input className="form-element" type="tel" name="phoneno" defaultValue={currentUser.phone} />
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input className="form-element" type="email" name="email" defaultValue={currentUser.email} />
                    <label className="form-label" htmlFor="address">Address</label>
                    <input className="form-element" type="textbox" name="address" defaultValue={currentUser.address} />
                    <label className="form-label" htmlFor="picurl">Picture Url</label>
                    <input className="form-element" type="url" name="picurl" defaultValue={currentUser.pic} />
                    <label className="form-label" htmlFor="addnotes">Additional Notes</label>
                    <input className="form-element" type="textbox" name="addnotes" defaultValue={currentUser.notes} />
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