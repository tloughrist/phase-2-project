import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import About from "./About.js";
import AddContact from "./AddContact.js";
import ContactContainer from "./ContactContainer.js";
import ContactRequests from "./ContactRequests.js";
import Header from "./Header.js";
import Login from "./Login.js";
import MyContactCard from "./MyContactCard.js";
import SignUp from "./SignUp.js";

function App() {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState();

    const history = useHistory(); 

    useEffect(() => {
        return (fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => initialSetUp(data))
        .then(() => setIsLoaded(true)))
    }, []);

    function initialSetUp(data) {
        setUserData(data);
        const accessUser = data.filter((user) => user.access);
        return accessUser !== undefined ? setCurrentUser(accessUser[0]) : setCurrentUser();
    };

    function handleLogIn(loggedUser) {
        clearAccess(userData);
        grantAccess(loggedUser);
        setCurrentUser(loggedUser);
        return history.push('/mycard');
    };

    function clearAccess() {
        const accessUsers = userData.filter((user) => user.access === true)
        return accessUsers.map((user) => patchUser(user, {access: false}));
    };

    function grantAccess(userObj) {
        setIsLoaded(false)
        return (patchUser(userObj, {access: true})
        .then((response) => response.json())
        .then((data) => updateUserData(data))
        .then(() => setIsLoaded(true)))
    };

    function logOut() {
        setIsLoaded(false);
        patchUser(currentUser, {access: false})
        .then(() => setIsLoaded(true));
        history.push('/')
        return setCurrentUser();
    };

    function handleSignUp(user) {
        handleLogIn(user);
        return setUserData([...userData, user]);
    };

    function updateCurrentUser(updatedCurrentUserObj) {
        setCurrentUser(updatedCurrentUserObj);
        const filteredUserData = userData.filter((user) => user.id !== updatedCurrentUserObj.id);
        return setUserData([...filteredUserData, updatedCurrentUserObj]);
    };

    function updateUserData(updatedUser) {
        const filteredUserData = userData.filter((user) => user.id !== updatedUser.id);
        return setUserData([...filteredUserData, updatedUser]);
    };

    function updatePrivateNote(newNote, currentUser, alteredContactId) {
        const oldContactsObj = currentUser.contacts;
        const filteredContacts = oldContactsObj.filter((contact) => contact.contactid !== alteredContactId);
        const updatedContact = oldContactsObj.filter((contact) => contact.contactid === alteredContactId);
        updatedContact[0].privatenotes = newNote;
        const newContactsObj = [...filteredContacts, updatedContact[0]];
        setIsLoaded(false);
        return (patchUser(currentUser, {contacts: newContactsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data))
        .then(() => setIsLoaded(true)));
    };

    function updateCircle(newCircle, currentUser, alteredContactId) {
        const oldContactsObj = currentUser.contacts;
        const filteredContacts = oldContactsObj.filter((contact) => contact.contactid !== alteredContactId);
        const updatedContact = oldContactsObj.filter((contact) => contact.contactid === alteredContactId);
        updatedContact[0].circle = newCircle;
        const newContactsObj = [...filteredContacts, updatedContact[0]];
        setIsLoaded(false);
        return (patchUser(currentUser, {contacts: newContactsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data))
        .then(() => setIsLoaded(true)));
    };

    function deleteContact(currentUser, alteredContactId) {
        const oldContactsObj = currentUser.contacts;
        const filteredContacts = oldContactsObj.filter((contact) => contact.contactid !== alteredContactId);
        const newContactsObj = [...filteredContacts];
        setIsLoaded(false);
        return (patchUser(currentUser, {contacts: newContactsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data))
        .then(() => setIsLoaded(true)));
    };

    function search(value) {
        setSearchValue(value);
        return history.push('/addcontact');
    };

    function makeRequest(currentUser, targetUser, requestedCircle) {
        const request = {
            userid: currentUser.id,
            name: currentUser.name,
            pic: currentUser.pic,
            reqcircle: requestedCircle
        }
        const newRequests = [...targetUser.requests, request];
        setIsLoaded(false); 
        return (patchUser(currentUser, {requests: newRequests})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data))
        .then(() => setIsLoaded(true)));
    };

    function acceptRequest(currentUser, requestingUserId, currentUserCircle, requestedCircle) {
        const currentUserObj = {contactid: currentUser.id, circle: requestedCircle, privatenotes: ""};
        const requestingUserObj = {contactid: requestingUserId, circle: currentUserCircle, privatenotes: ""};
        const requestingUser = userData.filter((user) => user.id === requestingUserId);
        const currentUserContacts = [...currentUser.contacts, requestingUserObj];
        const requestingUserContacts = [...requestingUser[0].contacts, currentUserObj];
        const currentUserRequests = currentUser.requests.filter((request) => request.userid !== requestingUserId);
        setIsLoaded(false); 
        patchUser(requestingUser, {contacts: requestingUserContacts})
        .then((response) => response.json())
        .then((data) => updateUserData(data))
        return (patchUser(currentUser, {requests: currentUserRequests, contacts: currentUserContacts})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data))
        .then(() => setIsLoaded(true)));
    };

    function rejectRequest() {
        return console.log("reject");
    };

    function patchUser(userObj, patchObj) {
        return fetch(`http://localhost:3000/users/${userObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(patchObj)
        });
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
                        updateCurrentUser={updateCurrentUser}
                        isLoaded={isLoaded}
                    />
                </Route>
                <Route path="/requests">
                    <ContactRequests
                        currentUser={currentUser}
                        userData={userData}
                        isLoaded={isLoaded}
                        acceptRequest={acceptRequest}
                        rejectRequest={rejectRequest}
                    />
                </Route>
                <Route path="/addcontact">
                    <AddContact
                        currentUser={currentUser}
                        isLoaded={isLoaded}
                        userData={userData}
                        searchValue={searchValue}
                        makeRequest={makeRequest}
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