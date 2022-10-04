import React, { useState } from "react";

function NewFormation({ currentUser, patchCurrentUser, userData }) {
    
    const [pronouns, setPronouns] = useState(false);
    const [email, setEmail] = useState(false);
    const [phone, setPhone] = useState(false);
    const [address, setAddress] = useState(false);
    const [notes, setNotes] = useState(false);

    function handleFormationCreation(e) {
        e.preventDefault();
        const formationIdArr = userData.map((el1) => el1.formations.map((el2) => el2.uniqueid));
        let formationId = (Math.random() + Math.random());
        while(formationIdArr.includes(formationId)) {
            formationId = (Math.random() + Math.random());
        };
        const formationName = e.target.name.value;
        const formationColor = e.target.color.value;
        const formationImage = e.target.image.value ? e.target.image.value : "/inFormation.png";
        const newFormationObj = {
            name: formationName,
            color: formationColor,
            image: formationImage,
            id: formationId,
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
        .then(() => alert("New Formation Created"));
    };

    return (
        <div className="display-container">
            <form id="newformation-form" onSubmit={handleFormationCreation}>
                <div className="display-body">
                    <input className="form-element" name="name" type="text" placeholder="formation name" />
                    <label className="form-label" htmlFor="color">Select Formation Color</label>
                    <input className="form-element" name="color" type="color" defaultValue="#ffffff"/>
                    <input className="form-element" name="image" type="url" placeholder="image url" />
                </div>
                <div>
                    <h3>What would you like to share with this formation?</h3>
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