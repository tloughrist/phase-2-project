import React from "react";
import { SideNavBar } from "./Navbar";
import ContactCard from "./ContactCard";

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
            <div className="form-card">
                <h1>My Contact Card</h1>
                <ContactCard user={currentUser} currentUser={currentUser} filterCircle={filterCircle} />
                <form id="mycontactform" onSubmit={handleMyInfoSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={currentUser.name} />
                    <label htmlFor="dob">Birthday</label>
                    <input type="date" name="dob" defaultValue={currentUser.dob} />
                    <label htmlFor="pronouns">Pronouns</label>
                    <input type="text" name="pronouns" defaultValue={currentUser.pronouns} />
                    <label htmlFor="phone1no">Phone Number</label>
                    <input type="tel" name="phoneno" defaultValue={currentUser.phone} />
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" defaultValue={currentUser.email} />
                    <label htmlFor="address">Address</label>
                    <input type="textbox" name="address" defaultValue={currentUser.address} />
                    <label htmlFor="picurl">Picture Url</label>
                    <input type="url" name="picurl" defaultValue={currentUser.pic} />
                    <label htmlFor="addnotes">Additional Notes</label>
                    <input type="textbox" name="addnotes" defaultValue={currentUser.addnotes} />
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" autoComplete="username" defaultValue={currentUser.username} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" autoComplete="password" defaultValue={currentUser.password} />
                    <input type="submit"></input>
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