import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MyFormations from "./MyFormations.js";
import NewFormation from "./NewFormation.js";
import FormationBar from "./FormationBar.js";
import Invitations from "./Invitations.js";
import Requests from "./Requests.js";
import FormationUsers from "./FormationUsers.js";
import FormationInfo from "./FormationInfo.js";
import FormationSettings from "./FormationSettings.js";
import Users from "./Users.js";

function Formations({ token, currentUser, patchCurrentUser, updateCurrentUser, userData, updateUserData, sendInvite, rejectInvitation, acceptInvitation, patchUser, isLoaded, sendRequest, acceptRequest, rejectRequest, leaveFormation}) {

    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();

    if (token === "valid") {

        const formationUsers = currentUser.formations.map((el) => {
            return (
                <Route key={`${el.id}users`} path={`/formations/${el.id}/users`}>
                    <FormationUsers
                        currentUser={currentUser}
                        userData={userData}
                        formation={el}
                        patchCurrentUser={patchCurrentUser}
                        patchUser={patchUser}
                        isLoaded={isLoaded}
                    />
                </Route> 
            );
        });

        const formationInfo = currentUser.formations.map((el) => {
            return (
                <Route key={`${el.id}info`} path={`/formations/${el.id}/info`}>
                    <FormationInfo
                        currentUser={currentUser}
                        formation={el}
                        token={token}
                        patchCurrentUser={patchCurrentUser}
                    />
                </Route> 
            );
        });

        const formationSettings = currentUser.formations.map((el) => {
            return (
                <Route key={`${el.id}settings`} path={`/formations/${el.id}/settings`}>
                    <FormationSettings
                        currentUser={currentUser}
                        formation={el}
                        patchCurrentUser={patchCurrentUser}
                        updateCurrentUser={updateCurrentUser}
                        userData={userData}
                        updateUserData={updateUserData}
                    />
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
                    <Route path="/formations/requests">
                        <Requests
                            currentUser={currentUser}
                            userData={userData}
                            acceptRequest={acceptRequest}
                            rejectRequest={rejectRequest}
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
                            sendRequest={sendRequest}
                        />
                    </Route>
                    {formationUsers}
                    {formationInfo}
                    {formationSettings}
                    <Route path="/formations">
                        <MyFormations
                            currentUser={currentUser}
                            searchValue={searchValue}
                            userData={userData}
                            patchCurrentUser={patchCurrentUser}
                            isLoaded={isLoaded}
                            leaveFormation={leaveFormation}
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