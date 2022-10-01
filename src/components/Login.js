import React from "react";

function Login({ userData, login }) {

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const userMatchArr = userData.filter((user) => user.token.username === username);
        const userMatch = userMatchArr[0];
        userMatch.token.password === password ? login(userMatch) : alert("Sorry, incorrect login information");
    };
    
    return(
        <div className="login-wrapper">
            <h1>Please Login</h1>
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
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;