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

    useEffect(() => {
        return fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
            setUserData(data);
            getToken(data);
        })
        .then(() => setIsLoaded(true));            
    }, []);

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
        if (currentUser[formationType].length > 0) {
            const validFormations = currentUser[formationType].filter((el1) => {
                const formationOwner = userData.find((el2) => el2.id === el1.admin);
                const ownerFormationIdArr = formationOwner.formations.map((el2) => el2.id);
                return ownerFormationIdArr.includes(el1.id);
            })
            return patchCurrentUser({formationType: validFormations});
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
        user.invitations = [...user.invitations, formationSubscriberObj]
        return patchUser(user.id, {invitations: user.invitations});
    };

    function rejectInvitation(invitationId) {
        currentUser.invitations = currentUser.invitations.filter((el) => el.id !== invitationId);
        return patchCurrentUser({invitations: currentUser.invitations});
    };

    function acceptInvitation(newFormationObj) {
        return handleSenderAcceptInvite(newFormationObj)
        .then(() => handleCurrentUserAcceptInvite(newFormationObj));
    };

    function handleCurrentUserAcceptInvite(newFormationObj) {
        setCurrentUser((prevUser)=> {
            const invitations = prevUser.invitations.filter((el) => el.id !== newFormationObj.id);
            const formations = [...prevUser.formations, newFormationObj];
            return {
                ...prevUser,
                invitations,
                formations
            };
        });
        
        return patchCurrentUser({invitations: currentUser.invitations, formations: currentUser.formations});
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
        user.requests = user.requests.filter((el) => el.id !== formationObj.id);
        user.requests = [...user.requests, formationRequestObj]
        return patchUser(user.id, {requests: user.requests});
    };

    function rejectRequest(requestId) {
        currentUser.requests = currentUser.requests.filter((el) => el.id !== requestId);
        return patchCurrentUser({requests: currentUser.requests});
    };

    function acceptRequest(newFormationObj, supplicant) {
        return handleSenderAcceptRequest(newFormationObj, supplicant)
        .then(() => handleCurrentUserAcceptRequest(newFormationObj, supplicant));
    };

    function handleCurrentUserAcceptRequest(newFormationObj, supplicant) {
        currentUser.requests = currentUser.requests.filter((el) => el.id !== newFormationObj.id);
        const modifiedFormationObj = currentUser.formations.find((el) => el.id === newFormationObj.id)
        modifiedFormationObj.users = [...modifiedFormationObj.users, supplicant];
        return patchCurrentUser({requests: currentUser.requests, formations: currentUser.formations});
    };

    function handleSenderAcceptRequest(newFormationObj, supplicant) {
        const sender = userData.find((el) => el.id === supplicant);
        sender.formations = [...sender.formations, newFormationObj];
        return patchUser(supplicant, {formations: sender.formations});
    };

    function leaveFormation(formation) {
        return handleOwnerLeave(formation)
        .then(() => handleCurrentUserLeave(formation));
    };

    function handleOwnerLeave(formation) {
        const owner = userData.find((el) => el.id === formation.admin);
        const ownerFormation = owner.formations.find((el) => el.id === formation.id);
        ownerFormation.users = ownerFormation.users.filter((el) => el !== currentUser.id);
        return patchUser(owner.id, {formations: owner.formations});
    };  

    function handleCurrentUserLeave(formation) {
        currentUser.formations = currentUser.formations.filter((el) => el.id !== formation.id);
        return patchCurrentUser({formations: currentUser.formations});
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