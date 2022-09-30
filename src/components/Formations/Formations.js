import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MyFormations from "./MyFormations.js";
import NewFormation from "./NewFormation.js";
import FormationBar from "./FormationBar.js";
import Invitations from "./Invitations.js";
import FormationRequests from "./FormationRequests.js";
import FormationUsers from "./FormationUsers.js";
import FormationInfo from "./FormationInfo.js";
import FormationSettings from "./FormationSettings.js";

function Formations({ token, currentUser, patchUser, updateCurrentUser, userData }) {
    
    if (token === "valid") {
        const formationIds = currentUser.formations.map((formation) => formation.uniqueid);

        const formationUsers = formationIds.map((id) => {
            return (
                <Route key={`${id}users`} path={`/formations/${id}/users`}>
                    <FormationUsers currentUser={currentUser} userData={userData} formationId={id} />
                </Route> 
            );
        });

        const formationInfo = formationIds.map((id) => {
            return (
                <Route key={`${id}info`} path={`/formations/${id}/info`}>
                    <FormationInfo currentUser={currentUser} formationId={id} token={token} patchUser={patchUser} updateCurrentUser={updateCurrentUser} />
                </Route> 
            );
        });

        const formationSettings = formationIds.map((id) => {
            return (
                <Route key={`${id}settings`} path={`/formations/${id}/settings`}>
                    <FormationSettings currentUser={currentUser} formationId={id} patchUser={patchUser} updateCurrentUser={updateCurrentUser} userData={userData}/>
                </Route> 
            );
        });

        const formationRequests = formationIds.map((id) => {
            return (
                <Route key={`${id}requests`} path={`/formations/${id}/requests`}>
                    <FormationRequests currentUser={currentUser} formationId={id} patchUser={patchUser} updateCurrentUser={updateCurrentUser} />
                </Route> 
            );
        });
    
        return (
            <div className="display-container">
                <h1>Formations</h1>
                <FormationBar />
                <Switch>
                    <Route path="/formations/invitations">
                        <Invitations />
                    </Route>
                    <Route path="/formations/newformation">
                        <NewFormation currentUser={currentUser} patchUser={patchUser} updateCurrentUser={updateCurrentUser} userData={userData} />
                    </Route>
                    <Route path="/formations/users">
                        <FormationUsers userData={userData} />
                    </Route>
                    {formationUsers}
                    {formationInfo}
                    {formationRequests}
                    {formationSettings}
                    <Route path="/formations">
                        <MyFormations
                            currentUser={currentUser}
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