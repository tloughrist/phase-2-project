import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login.js";
import Logout from "./Logout.js";
import SignUp from "./SignUp.js";
import Banner from "./Banner.js";
import PersonalInfo from "./PersonalInfo.js";
import Formations from "./Formations.js";
import Home from "./Home.js";

function App() {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState("xyz");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const history = useHistory(); 

    /*useEffect(() => {
        return (fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => initialSetUp(data))
        .then(() => setIsLoaded(true)))
    }, []);*/

    function logOut() {
        return console.log('logout');
    };

    function setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }

    setToken();

    function clearToken() {
        sessionStorage.clear();
    }

    clearToken();

    console.log('app')
    return (
        <div>
            <Banner isLoggedIn={isLoggedIn} logOut={logOut} />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/formations">
                    <Formations />
                </Route>
                <Route path="/personalinfo">
                    <PersonalInfo />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;