import React from "react";

function SignUp({ userData, login, updateUserData }) {

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const newUserObj = {
            token: {username: username, password: password},
            name: "",
            pronouns: "",
            pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/220px-Aristotle_Altemps_Inv8575.jpg",
            email: "",
            phone: "",
            address: "",
            notes: "",
            invitations: [],
            formations: [],
            requests: []
        };
        const userMatch = userData === undefined ? [] : userData.filter((user) => user.token.username === username);
        if (userMatch.length > 0) {
            return alert("Sorry, username already in use");
        } else {
            return fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserObj)
            })
            .then((response) => response.json())
            .then((data) => {
                updateUserData(data);
                return login(data);
            });
        }
    };

    return(
        <div className="display-container">
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    <p>Username</p>
                    <input type="text" name="username" />
                </label>
                <label className="form-label">
                    <p>Password</p>
                    <input className="form-element" type="password" name="password" />
                </label>
                    <div>
                    <button className="form-element" type="submit">Sign-up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;