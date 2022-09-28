import React from "react";
import CircleSelect from "./CircleSelect";

function MyContactCard({ currentUser, updateCurrentUser, isLoaded, patchUser, filterCircle }) {

    function handleMyInfoSubmit(e) {
        e.preventDefault();
        const newUserObj = {
            username: e.target.username.value,
            password: e.target.password.value,
            name: e.target.name.value,
            dob: e.target.dob.value,
            pic: e.target.picurl.value,
            pronouns: e.target.pronouns.value,
            phone: e.target.phoneno.value,
            email: e.target.email.value,
            address: e.target.address.value,
            addnotes: e.target.addnotes.value
        };
        return (patchUser(currentUser, newUserObj)
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data)));
    };

    if (isLoaded) {
        return (
            <div className="display-container">
                <div className="contact-card">
                    <img src={currentUser.pic} className="contact-image" alt={`${currentUser.name} picture`} />
                    <div className="contactinfo">
                        <h3>{currentUser.name}</h3>
                        <p><b>Username:</b> {currentUser.username}</p>
                        <p><b>Pronouns:</b> {currentUser.pronouns}</p>
                        <CircleSelect currentUser={currentUser} information={"pronouns"} filterCircle={filterCircle} /> 
                        <p><b>Date of Birth:</b> {currentUser.dob}</p>
                        <CircleSelect currentUser={currentUser} information={"dob"} filterCircle={filterCircle} /> 
                        <p><b>Email:</b> {currentUser.email}</p>
                        <CircleSelect currentUser={currentUser} information={"email"} filterCircle={filterCircle} /> 
                        <p><b>Phone:</b> {currentUser.phone}</p>
                        <CircleSelect currentUser={currentUser} information={"phone"} filterCircle={filterCircle} /> 
                        <p><b>Address:</b> {currentUser.address}</p>
                        <CircleSelect currentUser={currentUser} information={"address"} filterCircle={filterCircle} /> 
                        <p><b>Public Notes:</b> {currentUser.addnotes}</p>
                        <CircleSelect currentUser={currentUser} information={"addnotes"} filterCircle={filterCircle} /> 
                    </div>
                </div>
                <form className="form-card" id="mycontactform" onSubmit={handleMyInfoSubmit}>
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
                    <input className="form-element" type="textbox" name="addnotes" defaultValue={currentUser.addnotes} />
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-element" type="text" name="username" autoComplete="username" defaultValue={currentUser.username} />
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-element" type="password" name="password" autoComplete="password" defaultValue={currentUser.password} />
                    <input className="form-element" type="submit"></input>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
};

export default MyContactCard;