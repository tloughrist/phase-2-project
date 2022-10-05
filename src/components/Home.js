import React from "react";

function Home({ isLoaded }) {
    return (
        <div className="display-container">
            <div>
                <h1>Welcome to inFormation!</h1>
                <h3>This is an app to help people stay in contact with one another.</h3>
                <h3>By creating or joining formations, you'll be able to keep track of whatever information your contacts want to share with you.</h3> <h3>Likewise, you have control over what information you share with others.</h3>
            </div>
        </div>
    );
};

export default Home;