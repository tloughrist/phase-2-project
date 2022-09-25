import React from "react";
import { SideNavBar } from "./Navbar";
import ContactCard from "./ContactCard";

let contactCardsDisplay = <h1>Loading...</h1>;

function MyContactCard({ currentUser, handleUserUpdate, isLoaded }) {

    if (isLoaded) {
        contactCardsDisplay = <ContactCard user={currentUser} currentUser={currentUser}/>;
    }

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
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newUserObj)
        })
        .then((response) => response.json())
        .then((data) => handleUserUpdate(data))
    };

    if (isLoaded) {
        return (
            <div>
                <h1>My Contact Card</h1>
                {contactCardsDisplay}
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
                {contactCardsDisplay}
            </div>
        );
    }
    
};

export default MyContactCard;