import React from "react";
import { Link } from "react-router-dom";

function Login({ handleLogIn, userData }) {
    
    function submitLogin(e) {
        e.preventDefault();
        const newUsername = e.target.firstChild.firstChild.value;
        const newPassword = e.target.firstChild.nextSibling.firstChild.value;
        const userMatch = userData.filter((user) => user.username === newUsername);
        const passwordVal = userMatch[0] !== undefined && userMatch[0].password === newPassword ? true : false;
        passwordVal === false? alert("Username/Password combination incorrect") : handleLogIn(userMatch[0]);
    }; 
    
    return (
        <div className="display-container">
            <form onSubmit={submitLogin}>
                <div>
                    <input type="text" name="username" placeholder="Username" autoComplete="username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" autoComplete="password" />
                </div>
                <input type="submit" value="Submit" />
            </form>
            <p>Not a current user? <Link to={`/signup`}>Sign up</Link></p>
        </div>
    );
};

export default Login;