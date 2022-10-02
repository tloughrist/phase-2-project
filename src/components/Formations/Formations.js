import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MyFormations from "./MyFormations.js";
import NewFormation from "./NewFormation.js";
import FormationBar from "./FormationBar.js";
import Invitations from "./Invitations.js";
import FormationRequests from "./FormationRequests.js";
import FormationUsers from "./FormationUsers.js";
import FormationInfo from "./FormationInfo.js";
import FormationSettings from "./FormationSettings.js";
import Users from "./Users.js";

function Formations({ token, currentUser, patchCurrentUser, updateCurrentUser, userData, updateUserData, sendInvite, rejectInvitation, acceptInvitation, patchUser }) {

    const [searchValue, setSearchValue] = useState("");
    
    const history = useHistory();

    if (token === "valid") {

        const formationUsers = currentUser.formations.map((formation) => {
            return (
                <Route key={`${formation.id}users`} path={`/formations/${formation.id}/users`}>
                    <FormationUsers
                        currentUser={currentUser}
                        userData={userData}
                        formation={formation}
                        patchCurrentUser={patchCurrentUser}
                        patchUser={patchUser}
                    />
                </Route> 
            );
        });

        const formationInfo = currentUser.formations.map((formation) => {
            return (
                <Route key={`${formation.id}info`} path={`/formations/${formation.id}/info`}>
                    <FormationInfo currentUser={currentUser} formation={formation} token={token} patchCurrentUser={patchCurrentUser} />
                </Route> 
            );
        });

        const formationSettings = currentUser.formations.map((formation) => {
            return (
                <Route key={`${formation.id}settings`} path={`/formations/${formation.id}/settings`}>
                    <FormationSettings currentUser={currentUser} formation={formation} patchCurrentUser={patchCurrentUser} updateCurrentUser={updateCurrentUser} userData={userData} updateUserData={updateUserData} />
                </Route> 
            );
        });

        const formationRequests = currentUser.formations.map((formation) => {
            return (
                <Route key={`${formation.id}requests`} path={`/formations/${formation.id}/requests`}>
                    <FormationRequests currentUser={currentUser} formation={formation} patchCurrentUser={patchCurrentUser} updateCurrentUser={updateCurrentUser} />
                </Route> 
            );
        });

        function getSearchValue(mode, value) {
            setSearchValue(value);
            if (mode === "formation") {
                return history.push("/formations");
            } else if (mode === "user") {
                return history.push("/formations/users")
            }
        };
    
        return (
            <div className="display-container">
                <h1>Formations</h1>
                <FormationBar getSearchValue={getSearchValue} />
                <Switch>
                    <Route path="/formations/invitations">
                        <Invitations
                            currentUser={currentUser}
                            rejectInvitation={rejectInvitation}
                            acceptInvitation={acceptInvitation}
                        />
                    </Route>
                    <Route path="/formations/newformation">
                        <NewFormation
                            currentUser={currentUser}
                            patchCurrentUser={patchCurrentUser}
                            updateCurrentUser={updateCurrentUser}
                            userData={userData}
                        />
                    </Route>
                    <Route path="/formations/users">
                        <Users
                            userData={userData}
                            currentUser={currentUser}
                            searchValue={searchValue}
                            sendInvite={sendInvite}
                        />
                    </Route>
                    {formationUsers}
                    {formationInfo}
                    {formationRequests}
                    {formationSettings}
                    <Route path="/formations">
                        <MyFormations
                            currentUser={currentUser}
                            searchValue={searchValue}
                        />
                    </Route>
                </Switch>
            </div>
        );
    } else if (token === "invalid") {
        return <Redirect to="/login" />;
    } else {
        return <h1>Loading...</h1>;
    }};

export default Formations;