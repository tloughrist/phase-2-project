import React from "react";

function Login({ userData, logIn }) {

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const userMatch = userData.filter((user) => user.token.username === username);
        if (userMatch[0].token.password === password) {
            return logIn(userMatch[0]);
        } else {
            return alert("Sorry, incorrect login information");
        }
    };
    
    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" name="username" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password" />
                </label>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Login;