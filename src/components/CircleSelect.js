import React from "react";

function CircleSelect({currentUser, information, filterCircle }) {

    function handleCircleFilter(e) {
        return filterCircle(currentUser, information, e.target.value);
    };

    function checkChecked(value) {
        const filterKey = `${information}filter`;
        if (currentUser[filterKey] === undefined || !currentUser[filterKey].includes(value)) {
            return "";
        } else {
            return "checked";
        }
    };

    return (
        <form>
            <h3>Show to...</h3>
            <label htmlFor="familybox">Family</label> 
            <input type="checkbox" value="family" name="familybox" onChange={handleCircleFilter} checked={checkChecked("family")} />
            <label htmlFor="friendbox">Friends</label> 
            <input type="checkbox" value="friends" name="friendbox" onChange={handleCircleFilter} checked={checkChecked("friends")} />
            <label htmlFor="colleguebox">Collegues</label> 
            <input type="checkbox" value="collegues" name="colleguebox" onChange={handleCircleFilter} checked={checkChecked("collegues")} />
        </form>
    );
};

export default CircleSelect;