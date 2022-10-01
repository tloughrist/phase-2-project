import React, { useState, useEffect } from "react";

function FormationSettings({ currentUser, formation, patchUser, updateCurrentUser, userData, updateUserData }) {
    
    function handleFormationChange(e) {
        e.preventDefault();
        console.log("unwritten")
    };

    function handleDelFormation() {
        console.log("unwritten")
    };

    return (
        <div id="formation-array-container">
            <h1>Settings for {formation.name}</h1>
            <form onSubmit={handleFormationChange}>
                <label htmlFor="formationname">Formation Name</label>
                <input type="text" name="formationname" />
                <label htmlFor="formationcolor">Formation Color</label>
                <input type="color" name="formationcolor" />
                <label htmlFor="formationimage">Formation Image</label>
                <input type="url" name="formationimage" placeholder="image url" />
                <input type="submit" />
            </form>
            <div>
                <button onClick={handleDelFormation}>Delete Formation</button>
            </div>
        </div>
    );
};

export default FormationSettings;