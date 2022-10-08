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
        const sansRequests = currentUser.requests.filter((el) => el.id !== formation.id);
        return patchCurrentUser({formations: sansFormations, requests: sansRequests});
    };

    return (
        <div className="display-body">
            <h1>Settings for {formation.name}</h1>
            <div className="inset-card">
                <form className="display-body" onSubmit={handleFormationChange} style={{ background: "white" }}>
                    <label className="form-label" htmlFor="formationname">Formation Name</label>
                    <input className="form-element" onChange={e => setFormationName(e.target.value)} type="text" name="formationname" defaultValue={formationName}/>
                    <label className="form-label" htmlFor="formationcolor">Formation Color</label>
                    <input className="form-element" onChange={e => setFormationColor(e.target.value)}type="color" name="formationcolor" defaultValue={formationColor}/>
                    <label className="form-label" htmlFor="formationimage">Formation Image</label>
                    <input className="form-element" onChange={e => setFormationImage(e.target.value)}type="url" name="formationimage" placeholder="image url" />
                    <input className="form-element" type="submit" />
                </form>
                <div>
                    <button className="form-element" onClick={handleDelFormation}>Delete Formation</button>
                </div>
            </div>
        </div>
    );
};

export default FormationSettings;