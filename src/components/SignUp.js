import React, { useState } from "react";

function SignUp({ userData, login, updateUserData }) {

    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
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
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserObj)
            });
            const data = await response.json();
            updateUserData(data);
            return login(data);
        }
    };

    return(
        <div className="display-container">
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    <p>Username</p>
                    <input
                        type="text"
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label className="form-label">
                    <p>Password</p>
                    <input
                        className="form-element"
                        type="password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                    <div>
                    <button className="form-element" type="submit">Sign-up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;