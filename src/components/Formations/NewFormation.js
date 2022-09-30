import React from "react";


function NewFormation({ currentUser, patchUser, updateCurrentUser,
    userData }) {

    function handleFormationCreation(e) {
        e.preventDefault();
        const formationIdArr = [];
        userData.forEach((user) => {
            return user.formations.forEach((formation) => {
                return formationIdArr.push(formation.uniqueid);
            });
        });
        console.log(formationIdArr)
        let uniqueId = (Math.random() + Math.random());
        while(formationIdArr.includes(uniqueId)) {
            uniqueId = (Math.random() + Math.random());
        };
        const newFormationObj = {
            name: e.target.name.value,
            accesscode: e.target.accesscode.value,
            color: e.target.color.value,
            image: e.target.image.value,
            uniqueid: uniqueId
        };
        const formationsArr = [...currentUser.formations, newFormationObj];
        return patchUser(currentUser.id, {formations: formationsArr})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data))
        .then(() => e.target.reset())
        .then(() => alert("New Formation Created"));
    };

    return (
        <div id="formation-array-container">
            <h1>New Formation</h1>
            <form id="newformation-form" onSubmit={handleFormationCreation}>
                <input name="name" type="text" placeholder="formation name" />
                <input name="accesscode" type="text" placeholder="set access code" />
                <label htmlFor="color">Select Formation Color</label>
                <input name="color" type="color" defaultValue="#e66465"/>
                <input name="image" type="url" placeholder="image url" /> 
                <input type="submit" /> 
            </form>
        </div>
    );
};

export default NewFormation;