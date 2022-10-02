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
            return console.log("not yet")
        }
    }, [token])

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userData) {
            if (userToken) {
                const returningUser = userData.filter((user) => user.token.username === userToken.username && user.token.password === userToken.password);
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
            console.log(validInvitations);
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
        return handleSenderAccept(newFormationObj)
        .then(() => handleCurrentUserAccept(newFormationObj));
    };

    function handleCurrentUserAccept(newFormationObj) {
        const sansCurrentUserInvitations = currentUser.invitations.filter((el) => el.id !== newFormationObj.id);
        return patchCurrentUser({invitations: sansCurrentUserInvitations})
        .then(() => {
            const newCurrentUserFormations = [...currentUser.formations, newFormationObj];
            return patchCurrentUser({formations: newCurrentUserFormations})
        });
    };

    function handleSenderAccept(newFormationObj) {
        const sender = userData.find((el) => el.id === newFormationObj.admin);
        const sansSenderFormations = sender.formations.filter((el) => el.id !== newFormationObj.id);
        const senderCurrentFormation = sender.formations.find((el) => el.id === newFormationObj.id);
        senderCurrentFormation.users = [...senderCurrentFormation.users, currentUser.id];
        const newSenderFormationsArr = [...sansSenderFormations, senderCurrentFormation];
        return patchUser(sender.id, {formations: newSenderFormationsArr});
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