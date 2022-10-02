import React, { useState } from "react";

function FormationSettings({ currentUser, formation, patchCurrentUser }) {
    
    const [formationName, setFormationName] = useState(formation.name);
    const [formationColor, setFormationColor] = useState(formation.color);
    const [formationImage, setFormationImage] = useState(formation.image);

    function handleFormationChange(e) {
        e.preventDefault();
        formation.name = formationName;
        formation.color = formationColor;
        formation.image = formationImage;
        const sansFormations = currentUser.formations.filter((el) => el.id !== formation.id);
        const newFormationsArr = [...sansFormations, formation];
        return patchCurrentUser({formations: newFormationsArr});
    };

    function handleDelFormation() {
        const sansFormations = currentUser.formations.filter((el) => el.id !== formation.id);
        return patchCurrentUser({formations: sansFormations});
    };

    return (
        <div id="formation-array-container">
            <h1>Settings for {formation.name}</h1>
            <form onSubmit={handleFormationChange}>
                <label htmlFor="formationname">Formation Name</label>
                <input onChange={e => setFormationName(e.target.value)} type="text" name="formationname" defaultValue={formationName}/>
                <label htmlFor="formationcolor">Formation Color</label>
                <input onChange={e => setFormationColor(e.target.value)}type="color" name="formationcolor" defaultValue={formationColor}/>
                <label htmlFor="formationimage">Formation Image</label>
                <input onChange={e => setFormationImage(e.target.value)}type="url" name="formationimage" placeholder="image url" />
                <input type="submit" />
            </form>
            <div>
                <button onClick={handleDelFormation}>Delete Formation</button>
            </div>
        </div>
    );
};

export default FormationSettings;