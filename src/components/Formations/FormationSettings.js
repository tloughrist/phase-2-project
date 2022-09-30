import React from "react";

function FormationSettings({ currentUser, formationId, patchUser, updateCurrentUser, userData }) {
    
    const currentFormation = currentUser.formations.filter((formation) => {
        return formation.uniqueid === formationId;
    });

    const formationUsers = userData.filter((user) => {
        const formationIdArr = user.formations.map((formation) => formation.uniqueid);
        return formationIdArr.includes(formationId);
    });

    const adminUsers = formationUsers.map((user) => {
        return (
            <div key={`${user.token.username}admin`}>
                <span><b>{user.name}</b> ({user.token.username})</span>
                <input type="checkbox" />
            </div>
        )
    });

    return (
        <div id="formation-array-container">
            <h1>Settings for {currentFormation[0].name}</h1>
            <form>
                <h3>Appearance</h3>
                <input type="color" name="formationcolor" />
                <input type="url" name="formationimage" placeholder="image url" />
                <input type="submit" />
            </form>
            <form>
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
};

export default FormationSettings;