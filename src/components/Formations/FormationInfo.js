import React, { useState } from "react";

function FormationInfo({ currentUser, formation, patchCurrentUser }) {

    const [pronounsShared, setPronounsShared] = useState(formation.pronouns);
    const [emailShared, setEmailShared] = useState(formation.email);
    const [phoneShared, setPhoneShared] = useState(formation.phone);
    const [addressShared, setAddressShared] = useState(formation.address);
    const [notesShared, setNotesShared] = useState(formation.notes);

    function handleInfoChange(e) {
        const info = e.target.name;
        switch(info) {
            case "pronouns":
                setPronounsShared(!pronounsShared);
                formation[info] = !pronounsShared
                break;
            case "email":
                setEmailShared(!emailShared);
                formation[info] = !emailShared
                break;
            case "phone":
                setPhoneShared(!phoneShared);
                formation[info] = !phoneShared
                break;
            case "address":
                setAddressShared(!addressShared);
                formation[info] = !addressShared
                break;
            case "notes":
                setNotesShared(!notesShared);
                formation[info] = !notesShared
                break;
            default:
                break;
        }
        const sansFormations = currentUser.formations.filter((el) => el.id !== formation.id);
        const newFormationsObj = [...sansFormations, formation];
        return patchCurrentUser({formations: newFormationsObj});
    };

    return (
        <div className="display-body form-card">
            <h1>Shared Information for {formation.name}</h1>
            <div>
                <p><b>Pronouns</b></p>
                <div>
                    <input
                        type="radio"
                        id="pronounshared"
                        name="pronouns"
                        value="shared"
                        checked={pronounsShared ? "checked" : ""}
                        onChange={handleInfoChange}
                    />
                    <label htmlFor="pronounshared">Shared</label>
                    <input
                        type="radio"
                        id="pronounsunshared"
                        name="pronouns"
                        value="unshared"
                        checked={pronounsShared ? "" : "checked"}
                        onChange={handleInfoChange}
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
                        onChange={handleInfoChange}
                    />
                    <label htmlFor="emailshared">Shared</label>
                    <input
                        type="radio"
                        id="emailunshared"
                        name="email"
                        value="unshared"
                        checked={emailShared ? "" : "checked"}
                        onChange={handleInfoChange}
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
                        onChange={handleInfoChange}
                    />
                    <label htmlFor="phoneshared">Shared</label>
                    <input
                        type="radio"
                        id="phoneunshared"
                        name="phone"
                        value="unshared"
                        checked={phoneShared ? "" : "checked"}
                        onChange={handleInfoChange}
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
                        onChange={handleInfoChange}
                    />
                    <label htmlFor="addressshared">Shared</label>
                    <input
                        type="radio"
                        id="addressunshared"
                        name="address"
                        value="unshared"
                        checked={addressShared ? "" : "checked"}
                        onChange={handleInfoChange}
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
                        onChange={handleInfoChange}
                    />
                    <label htmlFor="notesshared">Shared</label>
                    <input
                        type="radio"
                        id="notesunshared"
                        name="notes"
                        value="unshared"
                        checked={notesShared ? "" : "checked"}
                        onChange={handleInfoChange}
                    />
                    <label htmlFor="notesunshared">Unshared</label>
                </div>
            </div>
        </div>
    );
};

export default FormationInfo;