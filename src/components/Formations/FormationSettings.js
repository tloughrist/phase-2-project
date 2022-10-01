import React, { useState, useEffect } from "react";

function FormationSettings({ currentUser, formationId, patchUser, updateCurrentUser, userData, updateUserData }) {

    const [admin, setAdmin] = useState();
    const [currentUserAdmin, setCurrentUserAdmin] = useState();
    
    const currentFormation = currentUser.formations.filter((formation) => formation.uniqueid === formationId);

    const formationUsers = userData.filter((user) => {
        const formationIdArr = user.formations.map((formation) => formation.uniqueid);
        return formationIdArr.includes(formationId);
    });

    const adminUsers = formationUsers.map((user) => {
        const userFormation = user.formations.filter((formation) => formation.uniqueid === formationId);
        const isChecked = userFormation[0].admin ? "checked" : "";
        return (
            <div key={`${user.token.username}admin`}>
                <span><b>{user.name}</b> </span>
                <span>{user.token.username}</span>
                <input onChange={e => handleAdminCheck(user.token.username)} type="checkbox" checked={isChecked} />
            </div>
        )
    });

    useEffect(() => setAdmin([...formationUsers]), []);
    useEffect(() => setCurrentUserAdmin(currentFormation[0].admin), []);

    useEffect(() => {
        if (admin !== undefined) {
            const adminArr = admin.filter((user) => {
                const userFormation = user.formations.filter((formation) => formation.uniqueid === formationId);
                return userFormation[0].admin;
            });
            if (adminArr.length < 1) {
                handleAdminCheck(currentUser.token.username);
                return alert("Formation requires at least one admin");
            } else {
                return;
            }
        } else {
            return;
        }
    }, [admin]);
    

    

    function handleAdminCheck(username) {
        const userObj = userData.filter((user) => user.token.username === username);
        const sansFormations = userObj[0].formations.filter((formation) => formation.uniqueid !== formationId);
        const thisFormation = userObj[0].formations.filter((formation) => formation.uniqueid === formationId);
        thisFormation[0].admin = !thisFormation[0].admin;
        const formationsObj = [...sansFormations, thisFormation[0]];
        userObj[0].formations = formationsObj;
        const sansAdmin = admin.filter((user) => user.token.username !== userObj[0].token.username);
        const newAdmin = [...sansAdmin, userObj[0]];
        setAdmin(newAdmin);
    };

    function handleAdmin(e) {
        e.preventDefault();
        admin.map((user) => {
            if (user.id === currentUser.id) {
                return patchUser(user.id, {formations: user.formations})
                .then((response) => response.json())
                .then((data) => updateCurrentUser(data));
            } else {
                return patchUser(user.id, {formations: user.formations})
                .then((response) => response.json())
                .then((data) => updateUserData(data));
            }
        });
    };

    if (currentUserAdmin) {
        return (
            <div id="formation-array-container">
                <h1>Settings for {currentFormation[0].name}</h1>
                <form>
                    <h3>Appearance</h3>
                    <input type="color" name="formationcolor" />
                    <input type="url" name="formationimage" placeholder="image url" />
                    <input type="submit" />
                </form>
                <form onSubmit={handleAdmin}>
                    <h3>Admin</h3>
                    <span><b>User</b></span>
                    <span><b>Admin?</b></span>
                    {adminUsers}
                    <input type="submit" />
                </form>
                <div>
                    <button value="leave">Leave Formation</button>
                </div>
            </div>
        );
    } else {
        return (
            <div id="formation-array-container">
                <h1>Settings for {currentFormation[0].name}</h1>
                <form>
                    <h3>Appearance</h3>
                    <input type="color" name="formationcolor" />
                    <input type="url" name="formationimage" placeholder="image url" />
                    <input type="submit" />
                </form>
                <div>
                    <button value="leave">Leave Formation</button>
                </div>
            </div>
        );
    }
};

export default FormationSettings;