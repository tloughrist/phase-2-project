import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewFormation({ currentUser, patchCurrentUser, userData }) {
    
    const [dob, setDob] = useState(false);
    const [pronouns, setPronouns] = useState(false);
    const [email, setEmail] = useState(false);
    const [phone, setPhone] = useState(false);
    const [address, setAddress] = useState(false);
    const [notes, setNotes] = useState(false);

    const [formationName, setFormationName] = useState();
    const [formationColor, setFormationColor] = useState();
    const [formationImage, setFormationImage] = useState("/inFormation.png");

    const history = useHistory();

    function handleFormationCreation(e) {
        e.preventDefault();
        const formationIdArr = userData.map((el1) => el1.formations.map((el2) => el2.uniqueid));
        let formationId = (Math.random() + Math.random());
        while(formationIdArr.includes(formationId)) {
            formationId = (Math.random() + Math.random());
        };
        const newFormationObj = {
            name: formationName,
            color: formationColor,
            image: formationImage,
            id: formationId,
            dob: dob,
            pronouns: pronouns,
            email: email,
            phone: phone,
            address: address,
            notes: notes,
            admin: currentUser.id,
            users: []
        };
        const formationsArr = [...currentUser.formations, newFormationObj];
        return patchCurrentUser({formations: formationsArr})
        .then(() => e.target.reset())
        .then(() => history.push("/formations"));
    };

    return (
        <div className="display-container">
            <form className="form-card" onSubmit={handleFormationCreation}>
                <div className="display-body" style={{ background: "white" }}>
                    <input className="form-element" name="name" type="text" placeholder="formation name" onChange={e => setFormationName(e.target.value)}/>
                    <label className="form-label" htmlFor="color">Select Formation Color</label>
                    <input className="form-element" name="color" type="color" defaultValue="#ffffff" onChange={e => setFormationColor(e.target.value)}/>
                    <input className="form-element" name="image" type="url" placeholder="image url" onChange={e => setFormationPic(e.target.value)}/>
                </div>
                <div>
                    <h3>What would you like to share with this formation?</h3>
                    <div>
                        <p><b>Date of Birth</b></p>
                        <input className="form-element" onChange={e => setDob(!dob)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Pronouns</b></p>
                        <input className="form-element" onChange={e => setPronouns(!pronouns)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Email</b></p>
                        <input className="form-element" onChange={e => setEmail(!email)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Phone</b></p>
                        <input className="form-element" onChange={e => setPhone(!phone)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Address</b></p>
                        <input className="form-element" onChange={e => setAddress(!address)} type="checkbox" />
                    </div>
                    <div>
                        <p><b>Notes</b></p>
                        <input className="form-element" onChange={e => setNotes(!notes)} type="checkbox" />
                    </div>
                </div> 
                <input className="form-element" type="submit" /> 
            </form>
        </div>
    );
};

export default NewFormation;