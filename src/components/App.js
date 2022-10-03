import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import Banner from "./Banner/Banner.js";
import PersonalInfo from "./PersonalInfo.js";
import Formations from "./Formations/Formations.js";
import Home from "./Home.js";

function App() {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState();
    const [token, setToken] = useState("unchecked");
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();

    const initialLoad = useEffect(() => {
        return fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .then(() => setIsLoaded(true))
    }, []);

    Promise.all([initialLoad])
    .then(() => getToken());

    useEffect(() => {
        if (currentUser) {
            removeInvalidFormations();
            return removeInvalidInvitations();
        } else {
            return;
        }
    }, [token])

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userData) {
            if (userToken) {
                const returningUser = userData.filter((el) => el.token.username === userToken.username && el.token.password === userToken.password);
                setCurrentUser(returningUser[0]);
                return returningUser.length > 0 ? setToken("valid") : setToken("invalid");
            } else {
                return setToken("invalid");
            }
        } else {
            return setToken("unchecked");
        }
    };

    function login(userObj) {
        setCurrentUser(userObj);
        sessionStorage.setItem('token', JSON.stringify(userObj.token));
        setToken("valid");
        return history.push("/personalinfo");
    };

    function removeInvalidFormations() {
        if (currentUser.formations.length > 0) {
            const validFormations = currentUser.formations.filter((el1) => {
                const formationOwner = userData.find((el2) => el2.id === el1.admin);
                const ownerFormationIdArr = formationOwner.formations.map((el2) => el2.id);
                return ownerFormationIdArr.includes(el1.id);
            })
            return patchCurrentUser({formations: validFormations});
        } else {
            return;
        }
    };

    function removeInvalidInvitations() {
        if (currentUser.invitations.length > 0) {
            const validInvitations = currentUser.invitations.filter((el1) => {
                const formationOwner = userData.find((el2) => el2.id === el1.admin);
                const ownerFormationIdArr = formationOwner.formations.map((el2) => el2.id);
                return ownerFormationIdArr.includes(el1.id);
            })
            return patchCurrentUser({invitations: validInvitations});
        } else {
            return;
        }
    };

    function logout() {
        sessionStorage.clear();
        setToken("invalid");
        setCurrentUser();
        return history.push("/");
    };

    function patchCurrentUser(patchObj) {
        return fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchObj)
            })
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data));
    };

    function patchUser(userId, patchObj) {
        return fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchObj)
            })
        .then((response) => response.json())
        .then((data) => updateUserData(data));
    };
    
    function updateUserData(userObj) {
        const userDataSans = userData.filter((el) => el.id !==userObj.id);
        return setUserData([...userDataSans, userObj]);
    };

    function updateCurrentUser(userObj) {
        updateUserData(userObj)
        return setCurrentUser(userObj);
    };

    function sendInvite(formationObj, user, sender) {
        const formationSubscriberObj = {
            name: formationObj.name,
            color: formationObj.color,
            image: formationObj.image,
            id: formationObj.id,
            owner: `${sender.name} (${sender.token.username})`,
            admin: sender.id
        };
        const sansInvitations = user.invitations.filter((el) => el.id !== formationObj.id);
        const newInvitationsArr = [...sansInvitations, formationSubscriberObj]
        return patchUser(user.id, {invitations: newInvitationsArr});
    };

    function rejectInvitation(invitationId) {
        const sansCurrentUserInvitations = currentUser.invitations.filter((el) => el.id !== invitationId);
        return patchCurrentUser({invitations: sansCurrentUserInvitations});
    };

    function acceptInvitation(newFormationObj) {
        return handleSenderAcceptInvite(newFormationObj)
        .then(() => handleCurrentUserAcceptInvite(newFormationObj));
    };

    function handleCurrentUserAcceptInvite(newFormationObj) {
        const sansCurrentUserInvitations = currentUser.invitations.filter((el) => el.id !== newFormationObj.id);
        return patchCurrentUser({invitations: sansCurrentUserInvitations})
        .then(() => {
            const newCurrentUserFormations = [...currentUser.formations, newFormationObj];
            return patchCurrentUser({formations: newCurrentUserFormations})
        });
    };

    function handleSenderAcceptInvite(newFormationObj) {
        const sender = userData.find((el) => el.id === newFormationObj.admin);
        const sansSenderFormations = sender.formations.filter((el) => el.id !== newFormationObj.id);
        const senderCurrentFormation = sender.formations.find((el) => el.id === newFormationObj.id);
        senderCurrentFormation.users = [...senderCurrentFormation.users, currentUser.id];
        const newSenderFormationsArr = [...sansSenderFormations, senderCurrentFormation];
        return patchUser(sender.id, {formations: newSenderFormationsArr});
    };

    function sendRequest(formationObj, user, sender) {
        const formationRequestObj = {
            name: formationObj.name,
            color: formationObj.color,
            id: formationObj.id,
            owner: `${user.name} (${user.token.username})`,
            image: formationObj.image,
            admin: user.id,
            supplicant: sender.id
        };
        const sansRequests = user.requests.filter((el) => el.id !== formationObj.id);
        const newRequestsArr = [...sansRequests, formationRequestObj]
        return patchUser(user.id, {requests: newRequestsArr});
    };

    function rejectRequest(requestId) {
        const sansCurrentUserRequests = currentUser.requests.filter((el) => el.id !== requestId);
        return patchCurrentUser({requests: sansCurrentUserRequests});
    };

    function acceptRequest(newFormationObj, supplicant) {
        return handleSenderAcceptRequest(newFormationObj, supplicant)
        .then(() => handleCurrentUserAcceptRequest(newFormationObj, supplicant));
    };

    function handleCurrentUserAcceptRequest(newFormationObj, supplicant) {
        const sansCurrentUserRequests = currentUser.requests.filter((el) => el.id !== newFormationObj.id);
        const sansCurrentUserFormations = currentUser.formations.filter((el) => el.id !== newFormationObj.id);
        const modifiedFormationObj = currentUser.formations.find((el) => el.id === newFormationObj.id)
        modifiedFormationObj.users = [...modifiedFormationObj.users, supplicant];
        const newFormationsArr = [...sansCurrentUserFormations, modifiedFormationObj];
        return patchCurrentUser({requests: sansCurrentUserRequests, formations: newFormationsArr});
    };

    function handleSenderAcceptRequest(newFormationObj, supplicant) {
        const sender = userData.find((el) => el.id === supplicant);
        const newSenderFormationsArr = [...sender.formations, newFormationObj];
        return patchUser(supplicant, {formations: newSenderFormationsArr});
    };

    function leaveFormation(formation) {
        return handleOwnerLeave(formation)
        .then(() => handleCurrentUserLeave(formation));
    };

    function handleOwnerLeave(formation) {
        const owner = userData.find((el) => el.id === formation.admin);
        const sansOwnerFormations = owner.formations.filter((el) => el.id !== formation.id);
        const ownerFormation = owner.formations.find((el) => el.id === formation.id);
        const sansOwnerFormUsers = ownerFormation.users.filter((el) => el !== currentUser.id);
        ownerFormation.users = sansOwnerFormUsers;
        const newOwnerFormationsArr = [...sansOwnerFormations, ownerFormation];
        return patchUser(owner.id, {formations: newOwnerFormationsArr});
    };  

    function handleCurrentUserLeave(formation) {
        const sansCurrentUserFormations = currentUser.formations.filter((el) => el.id !== formation.id);
        return patchCurrentUser({formations: sansCurrentUserFormations});
    };

    return (
        <div>
            <Banner
                token={token}
                logout={logout}
                isLoaded={isLoaded}
            />
            <Switch>
                <Route path="/login">
                    <Login
                        userData={userData}
                        login={login}
                    />
                </Route>
                <Route path="/formations">
                    <Formations
                        currentUser={currentUser}
                        token={token}
                        patchCurrentUser={patchCurrentUser}
                        updateCurrentUser={updateCurrentUser}
                        userData={userData}
                        updateUserData={updateUserData}
                        sendInvite={sendInvite}
                        rejectInvitation={rejectInvitation}
                        acceptInvitation={acceptInvitation}
                        patchUser={patchUser}
                        isLoaded={isLoaded}
                        sendRequest={sendRequest}
                        rejectRequest={rejectRequest}
                        acceptRequest={acceptRequest}
                        leaveFormation={leaveFormation}
                    />
                </Route>
                <Route path="/personalinfo">
                    <PersonalInfo
                        currentUser={currentUser}
                        token={token}
                        patchCurrentUser={patchCurrentUser}
                    />
                </Route>
                <Route path="/signup">
                    <SignUp
                        userData={userData}
                        login={login}
                        updateUserData={updateUserData}
                    />
                </Route>
                <Route path="/">
                    <Home
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;