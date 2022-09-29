import React from "react";
import { Redirect } from "react-router-dom";

function Formations({ token }) {
    console.log(token)
    if (token === "valid") {
        return (
            <div className="display-container">
                <h1>Formations</h1>
            </div>
        );
    } else if (token === "invalid") {
        return <Redirect to="/login" />;
    } else {
        return <h1>Loading...</h1>;
    }};

export default Formations;