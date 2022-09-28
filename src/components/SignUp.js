import React from "react";
import { Link } from "react-router-dom";


function SignUp({ handleLogIn, userData, handleSignUp }) {

    function submitSignUp(e) {
        e.preventDefault();
        const newUsername = e.target.username.value;
        const newPassword = e.target.password.value;
        const userMatch = userData.filter((user) => user.username === newUsername);
        userMatch[0] === newUsername? alert("Username already in use") : createNewUser(newUsername, newPassword);
    };

    function createNewUser(newUsername, newPassword) {
        const newUserObj = {
            username: newUsername,
            password: newPassword,
            contacts: [],
            requests: [],
            pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/220px-Aristotle_Altemps_Inv8575.jpg",
            pronounsfilter: [],
            dobfilter: [],
            emailfilter: [],
            phonefilter: [],
            addressfilter: [],
            addnotesfilter: []
        };
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newUserObj)
        })
        .then((response) => response.json())
        .then((data) => updateUsers(data))
    };

    function updateUsers(data) {
        handleSignUp(data);
        return handleLogIn(data);
    };

    return (
        <div className="display-container">
            <form onSubmit={submitSignUp}>
                <div>
                    <input type="text" name="username" placeholder="Username" autoComplete="username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" autoComplete="password" />
                </div>
                <input type="submit" value="Submit" />
            </form>
            <p>Already a current user? <Link to={`/login`}>Login</Link></p>
            <p>WARNING: This app is in development and data is not secured. Do not reuse a password or enter real personal information.</p>
        </div>
    );
};

export default SignUp;