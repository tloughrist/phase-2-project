import React from "react";

function Login({ userData, login }) {

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const userMatch = userData.find((el) => el.token.username === username);
        userMatch.token.password === password ? login(userMatch) : alert("Sorry, incorrect login information");
    };
    
    return(
        <div className="display-container">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" name="username" />
                </label>
                <label>
                    <p>Password</p>
                    <input className="form-element" type="password" name="password" />
                </label>
                <div>
                    <button className="form-element" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;