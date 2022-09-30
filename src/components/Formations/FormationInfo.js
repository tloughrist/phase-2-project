import React, { useState, useEffect } from "react";

function FormationInfo({ currentUser, formationId, patchUser, updateCurrentUser }) {

    const [pronounsShared, setPronounsShared] = useState(false);
    const [emailShared, setEmailShared] = useState(false);
    const [phoneShared, setPhoneShared] = useState(false);
    const [addressShared, setAddressShared] = useState(false);
    const [notesShared, setNotesShared] = useState(false);

    const currentFormation = currentUser.formations.filter((formation) => {
        return formation.uniqueid === formationId;
    });

    useEffect(() => {
        currentFormation[0].pronouns === "shared" ? setPronounsShared(true) : setPronounsShared(false);
        currentFormation[0].email === "shared" ? setEmailShared(true) : setEmailShared(false);
        currentFormation[0].phone === "shared" ? setPhoneShared(true) : setPhoneShared(false);
        currentFormation[0].address === "shared" ? setAddressShared(true) : setAddressShared(false);
        currentFormation[0].notes === "shared" ? setNotesShared(true) : setNotesShared(false);
    }, [currentUser]);

    function handlePronounChange() {
        setPronounsShared(!pronounsShared);
        const sansFormations = currentUser.formations.filter((formation) => {
            return formation.uniqueid !== formationId;
        });
        currentFormation[0].pronouns = pronounsShared ? "unshared" : "shared";
        const newFormationsObj = [...sansFormations, currentFormation[0]];
        return patchUser(currentUser.id, {formations: newFormationsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data));
    };

    function handleEmailChange() {
        setEmailShared(!emailShared);
        const sansFormations = currentUser.formations.filter((formation) => {
            return formation.uniqueid !== formationId;
        });
        currentFormation[0].email = emailShared ? "unshared" : "shared";
        const newFormationsObj = [...sansFormations, currentFormation[0]];
        return patchUser(currentUser.id, {formations: newFormationsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data));
    };

    function handlePhoneChange() {
        setPhoneShared(!phoneShared);
        const sansFormations = currentUser.formations.filter((formation) => {
            return formation.uniqueid !== formationId;
        });
        currentFormation[0].phone = phoneShared ? "unshared" : "shared";
        const newFormationsObj = [...sansFormations, currentFormation[0]];
        return patchUser(currentUser.id, {formations: newFormationsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data));
    };

    function handleAddressChange() {
        setAddressShared(!addressShared);
        const sansFormations = currentUser.formations.filter((formation) => {
            return formation.uniqueid !== formationId;
        });
        currentFormation[0].address = addressShared ? "unshared" : "shared";
        const newFormationsObj = [...sansFormations, currentFormation[0]];
        return patchUser(currentUser.id, {formations: newFormationsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data));
    };

    function handleNotesChange() {
        setNotesShared(!notesShared);
        const sansFormations = currentUser.formations.filter((formation) => {
            return formation.uniqueid !== formationId;
        });
        currentFormation[0].notes = notesShared ? "unshared" : "shared";
        const newFormationsObj = [...sansFormations, currentFormation[0]];
        return patchUser(currentUser.id, {formations: newFormationsObj})
        .then((response) => response.json())
        .then((data) => updateCurrentUser(data));
    };

    return (
        <div id="formation-array-container">
            <h1>Shared Information for {currentFormation[0].name}</h1>
            <div>
                <p><b>Pronouns</b></p>
                <div>
                    <input
                        type="radio"
                        id="pronounshared"
                        name="pronouns"
                        value="shared"
                        checked={pronounsShared ? "checked" : ""}
                        onChange={handlePronounChange}
                    />
                    <label htmlFor="pronounshared">Shared</label>
                    <input
                        type="radio"
                        id="pronounsunshared"
                        name="pronouns"
                        value="unshared"
                        checked={pronounsShared ? "" : "checked"}
                        onChange={handlePronounChange}
                    />
                    <label htmlFor="pronounsunshared">Unshared</label>
                </div>
            </div>
            <div>
                <p><b>Email</b></p>
                <div>
                    <input
                        type="radio"
                        id="emailshared"
                        name="email"
                        value="shared"
                        checked={emailShared ? "checked" : ""}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="emailshared">Shared</label>
                    <input
                        type="radio"
                        id="emailunshared"
                        name="email"
                        value="unshared"
                        checked={emailShared ? "" : "checked"}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="emailunshared">Unshared</label>
                </div>
            </div>
            <div>
                <p><b>Phone</b></p>
                <div>
                    <input
                        type="radio"
                        id="phoneshared"
                        name="phone"
                        value="shared"
                        checked={phoneShared ? "checked" : ""}
                        onChange={handlePhoneChange}
                    />
                    <label htmlFor="phoneshared">Shared</label>
                    <input
                        type="radio"
                        id="phoneunshared"
                        name="phone"
                        value="unshared"
                        checked={phoneShared ? "" : "checked"}
                        onChange={handlePhoneChange}
                    />
                    <label htmlFor="phoneunshared">Unshared</label>
                </div>
            </div>
            <div>
                <p><b>Address</b></p>
                <div>
                    <input
                        type="radio"
                        id="addressshared"
                        name="address"
                        value="shared"
                        checked={addressShared ? "checked" : ""}
                        onChange={handleAddressChange}
                    />
                    <label htmlFor="addressshared">Shared</label>
                    <input
                        type="radio"
                        id="addressunshared"
                        name="address"
                        value="unshared"
                        checked={addressShared ? "" : "checked"}
                        onChange={handleAddressChange}
                    />
                    <label htmlFor="addressunshared">Unshared</label>
                </div>
            </div>
            <div>
                <p><b>Notes</b></p>
                <div>
                    <input
                        type="radio"
                        id="notesshared"
                        name="notes"
                        value="shared"
                        checked={notesShared ? "checked" : ""}
                        onChange={handleNotesChange}
                    />
                    <label htmlFor="notesshared">Shared</label>
                    <input
                        type="radio"
                        id="notesunshared"
                        name="notes"
                        value="unshared"
                        checked={notesShared ? "" : "checked"}
                        onChange={handleNotesChange}
                    />
                    <label htmlFor="notesunshared">Unshared</label>
                </div>
            </div>
        </div>
    );
};

export default FormationInfo;