import React from "react";

function CircleSelect({currentUser, information, filterCircle }) {

    function handleCircleFilter(e) {
        e.preventDefault();
        return filterCircle(currentUser, information, e.target.value);
    };

    function checkChecked(value) {
        const filterKey = `${information}filter`;
        if (!currentUser[filterKey].includes(value)) {
            return "";
        } else {
            return "checked";
        }
    };

    return (
        <form className="circle-select">
            <div>
                <label htmlFor="familybox">Family</label> 
                <input className="circle-select-element" type="checkbox" value="family" name="familybox" onChange={handleCircleFilter} checked={checkChecked("family")} />
            </div>
            <div>
                <label htmlFor="friendbox">Friends</label> 
                <input className="circle-select-element" type="checkbox" value="friends" name="friendbox" onChange={handleCircleFilter} checked={checkChecked("friends")} />
            </div>
            <div>
                <label htmlFor="colleguebox">Collegues</label> 
                <input className="circle-select-element" type="checkbox" value="collegues" name="colleguebox" onChange={handleCircleFilter} checked={checkChecked("collegues")} />
            </div>
        </form>
    );
};

export default CircleSelect;