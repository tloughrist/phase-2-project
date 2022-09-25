import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import About from "./About.js";
import AddContact from "./AddContact.js";
import ContactContainer from "./ContactContainer.js";
import ContactRequests from "./ContactRequests.js";
import Header from "./Header.js";
import Login from "./Login.js";
import MyContactCard from "./MyContactCard.js";
import Request from "./Request.js";
import SignUp from "./SignUp.js";

function App() {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState();

    const history = useHistory(); 

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => issueAccess(data))
        .then(() => setIsLoaded(true))
    }, []);

    function issueAccess(data) {
        setUserData(data);
        const accessUser = data.filter((user) => {
            return user.access;
        })
        return accessUser !== undefined ? setCurrentUser(accessUser[0]) : setCurrentUser({});
    };

    function handleLogIn(loggedUser) {
        userData.map((user) => {
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access: false
                })
            })
        })
        fetch(`http://localhost:3000/users/${loggedUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                access: true
            })
        })
        .then((response) => response.json())
        .then((data) => handleUserUpdate(data))
        .then(() => history.push('/mycard'))
    };

    function logOut() {
        userData.map((user) => {
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access: false
                })
            })
        })
        history.push('/');
        return setCurrentUser();
    }

    function handleSignUp(user) {
        return setUserData([...userData, user]);
    }

    function handleUserUpdate(updatedUser) {
        setCurrentUser(updatedUser);
        const filteredUserData = userData.filter((user) => user.id !== updatedUser.id);
        return setUserData([...filteredUserData, updatedUser]);
    };

    function updatePrivateNote(newNote, currentUser, alteredContactId) {
        const oldContactsObj = currentUser.contacts;
        const filteredContacts = oldContactsObj.filter((contact) => contact.contactid !== alteredContactId);
        const updatedContact = oldContactsObj.filter((contact) => contact.contactid === alteredContactId);
        updatedContact[0].privatenotes = newNote;
        const newContactsObj = [...filteredContacts, updatedContact[0]];

        fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    contacts: newContactsObj
                })
        })
        .then((response) => response.json())
        .then((data) => handleUserUpdate(data))
    };

    function updateCircle(newCircle, currentUser, alteredContactId) {
        const oldContactsObj = currentUser.contacts;
        const filteredContacts = oldContactsObj.filter((contact) => contact.contactid !== alteredContactId);
        const updatedContact = oldContactsObj.filter((contact) => contact.contactid === alteredContactId);
        updatedContact[0].circle = newCircle;
        const newContactsObj = [...filteredContacts, updatedContact[0]];

        fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    contacts: newContactsObj
                })
        })
        .then((response) => response.json())
        .then((data) => handleUserUpdate(data))
    };

    function deleteContact(currentUser, alteredContactId) {
        const oldContactsObj = currentUser.contacts;
        const filteredContacts = oldContactsObj.filter((contact) => contact.contactid !== alteredContactId);
        const newContactsObj = [...filteredContacts];

        fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    contacts: newContactsObj
                })
        })
        .then((response) => response.json())
        .then((data) => handleUserUpdate(data))
    };

    function search(value) {
        setSearchValue(value);
        return history.push('/addcontact');
    };

    function request(currentUser, targetUser) {
        const request = {
            userid: currentUser.id,
            name: currentUser.name,
            pic: currentUser.pic
        }
        const newRequests = [...targetUser.requests, request]; 
        
        fetch(`http://localhost:3000/users/${targetUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    requests: newRequests
                })
        })
        .then((response) => response.json())
        .then((data) => handleUserUpdate(data))
    };

    function acceptRequest() {
        console.log('here')
        return;
    };

    function rejectRequest() {
        return console.log("reject");
    };

    return (
        <div>
            <Header currentUser={currentUser} logOut={logOut} search={search} />
            <Switch>
                <Route path="/login">
                    <Login
                        handleLogIn={handleLogIn}
                        userData={userData}
                        search={search}
                    />
                </Route>
                <Route path="/contacts">
                    <ContactContainer
                        currentUser={currentUser}
                        userData={userData}
                        isLoaded={isLoaded}
                        updatePrivateNote={updatePrivateNote}
                        updateCircle={updateCircle}
                        deleteContact={deleteContact}
                    />
                </Route>
                <Route path="/mycard">
                    <MyContactCard
                        currentUser={currentUser}
                        handleUserUpdate={handleUserUpdate}
                        isLoaded={isLoaded}
                    />
                </Route>
                <Route path="/requests">
                    <ContactRequests
                        currentUser={currentUser}
                        userData={userData}
                        isLoaded={isLoaded}
                        handleAccept={acceptRequest}
                        handleReject={rejectRequest}
                    />
                </Route>
                <Route path="/addcontact">
                    <AddContact
                        currentUser={currentUser}
                        isLoaded={isLoaded}
                        userData={userData}
                        searchValue={searchValue}
                        handleRequest={request}
                    />
                </Route>
                <Route path="/signup">
                    <SignUp
                        handleLogIn={handleLogIn}
                        handleSignUp={handleSignUp}
                        userData={userData}
                    />
                </Route>
                <Route path="/">
                    <About />
                </Route>
            </Switch>
        </div>
    );
}

export default App;