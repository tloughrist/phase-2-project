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

    useEffect(() => loadInit(), []);

    async function loadInit() {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUserData(data);
        getToken(data);
        return setIsLoaded(true);
    };

    useEffect(() => {
        if (currentUser) {
            removeInvalidFormations("formations")
            removeInvalidFormations("invitations");
        } else {
            return;
        }
    }, [token]);

    function getToken(data) {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken) {
            const returningUser = data.find((el) => el.token.username === userToken.username && el.token.password === userToken.password);
            setCurrentUser(returningUser);
            return returningUser ? setToken("valid") : setToken("invalid");
        } else {
            return setToken("invalid");
        }
    };

    function login(userObj) {
        setCurrentUser(userObj);
        sessionStorage.setItem('token', JSON.stringify(userObj.token));
        setToken("valid");
        return history.push("/personalinfo");
    };

    function removeInvalidFormations(formationType) {
        const toBeChecked = formationType === "formations" ? currentUser.formations : currentUser.invitations;
        if (toBeChecked.length > 0) {
            const validFormations = toBeChecked.filter((el1) => {
                const formationOwner = userData.find((el2) => el2.id === el1.admin);
                const ownerFormationIdArr = formationOwner.formations.map((el2) => el2.id);
                return ownerFormationIdArr.includes(el1.id);
            })
            return formationType === "formations" ? patchCurrentUser({formations: validFormations}) : patchCurrentUser({invitations: validFormations});
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

    async function patchCurrentUser(patchObj) {
        const response = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchObj)
            });
        const data = await response.json();
        return updateCurrentUser(data);
    };

    async function patchUser(userId, patchObj) {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchObj)
            });
        const data = await response.json();
        return updateUserData(data);
    };
    
    function updateUserData(userObj) {
        const sansUserData = userData.filter((el) => el.id !== userObj.id);
        return setUserData([...sansUserData, userObj]);
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
        const addInvitations = [...user.invitations, formationSubscriberObj];
        alert("Invitation sent");
        return patchUser(user.id, {invitations: addInvitations});
    };

    function rejectInvitation(invitationId) {
        const sansInvitations = currentUser.invitations.filter((el) => el.id !== invitationId);
        return patchCurrentUser({invitations: sansInvitations});
    };

    async function acceptInvitation(newFormationObj) {
        await handleSenderAcceptInvite(newFormationObj);
        return handleCurrentUserAcceptInvite(newFormationObj);
    };

    function handleCurrentUserAcceptInvite(newFormationObj) {
        const userPlaceHolder = {...currentUser};
        userPlaceHolder.invitations = userPlaceHolder.invitations.filter((el) => el.id !== newFormationObj.id);
        userPlaceHolder.formations = [...userPlaceHolder.formations, newFormationObj];
        return patchCurrentUser(userPlaceHolder);
    };

    function handleSenderAcceptInvite(newFormationObj) {
        const sender = userData.find((el) => el.id === newFormationObj.admin);
        const senderCurrentFormation = sender.formations.find((el) => el.id === newFormationObj.id);
        senderCurrentFormation.users = [...senderCurrentFormation.users, currentUser.id];
        return patchUser(sender.id, {formations: sender.formations});
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
        const addRequests = [...sansRequests, formationRequestObj];
        alert("Request sent");
        return patchUser(user.id, {requests: addRequests});
    };

    function rejectRequest(requestId) {
        const sansRequests = currentUser.requests.filter((el) => el.id !== requestId);
        return patchCurrentUser({requests: sansRequests});
    };

    async function acceptRequest(newFormationObj, supplicant) {
        await handleSenderAcceptRequest(newFormationObj, supplicant);
        return handleCurrentUserAcceptRequest(newFormationObj, supplicant);
    };

    function handleCurrentUserAcceptRequest(newFormationObj, supplicant) {
        const sansRequests = currentUser.requests.filter((el) => el.id !== newFormationObj.id);
        const sansFormations = currentUser.formations.filter((el) => el.id !== newFormationObj.id);
        const modifiedFormationObj = currentUser.formations.find((el) => el.id === newFormationObj.id);
        modifiedFormationObj.users = [...modifiedFormationObj.users, supplicant];
        const addFormations = [...sansFormations, modifiedFormationObj];
        return patchCurrentUser({requests: sansRequests, formations: addFormations});
    };

    function handleSenderAcceptRequest(newFormationObj, supplicant) {
        const sender = userData.find((el) => el.id === supplicant);
        sender.formations = [...sender.formations, newFormationObj];
        return patchUser(supplicant, {formations: sender.formations});
    };

    async function leaveFormation(formation) {
        await handleOwnerLeave(formation);
        return handleCurrentUserLeave(formation);
    };

    function handleOwnerLeave(formation) {
        const owner = userData.find((el) => el.id === formation.admin);
        const ownerFormation = owner.formations.find((el) => el.id === formation.id);
        ownerFormation.users = ownerFormation.users.filter((el) => el !== currentUser.id);
        return patchUser(owner.id, {formations: owner.formations});
    };  

    function handleCurrentUserLeave(formation) {
        const sansFormations = currentUser.formations.filter((el) => el.id !== formation.id);
        return patchCurrentUser({formations: sansFormations});
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