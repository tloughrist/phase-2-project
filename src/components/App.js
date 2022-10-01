import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import Banner from "./Banner/Banner.js";
import PersonalInfo from "./PersonalInfo.js";
import Formations from "./Formations/Formations.js";
import Home from "./Home.js";

function App() {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState();
    const [token, setToken] = useState("unchecked");
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();

    const initialLoad = useEffect(() => {
        return fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .then(() => setIsLoaded(true))
    }, []);

    Promise.all([initialLoad])
    .then(() => getToken());

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userData) {
            if (userToken) {
                const returningUser = userData.filter((user) => user.token.username === userToken.username && user.token.password === userToken.password);
                setCurrentUser(returningUser[0]);
                return returningUser.length > 0 ? setToken("valid") : setToken("invalid");
            } else {
                return setToken("invalid");
            }
        } else {
            return setToken("unchecked");
        }
    };

    function logIn(userObj) {
        setCurrentUser(userObj);
        sessionStorage.setItem('token', JSON.stringify(userObj.token));
        setToken("valid");
        return history.push("/personalinfo");
    };

    function logOut() {
        sessionStorage.clear();
        setToken("invalid");
        setCurrentUser();
        return history.push("/");
    };

    function patchUser(userId, patchObj) {
        return fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchObj)
            });
    };
    
    function updateUserData(userObj) {
        const userDataSans = userData.filter((user) => user.id !==userObj.id);
        return setUserData([...userDataSans, userObj]);
    };

    function updateCurrentUser(userObj) {
        updateUserData(userObj)
        return setCurrentUser(userObj);
    }

    return (
        <div>
            <Banner
                token={token}
                logOut={logOut}
                isLoaded={isLoaded}
            />
            <Switch>
                <Route path="/login">
                    <Login
                        userData={userData}
                        setToken={setToken}
                        logIn={logIn}
                    />
                </Route>
                <Route path="/formations">
                    <Formations
                        currentUser={currentUser}
                        token={token}
                        patchUser={patchUser}
                        updateCurrentUser={updateCurrentUser}
                        userData={userData}
                        updateUserData={updateUserData}
                    />
                </Route>
                <Route path="/personalinfo">
                    <PersonalInfo
                        currentUser={currentUser}
                        token={token}
                        patchUser={patchUser}
                        updateCurrentUser={updateCurrentUser}
                    />
                </Route>
                <Route path="/signup">
                    <SignUp
                        userData={userData}
                        logIn={logIn}
                        updateUserData={updateUserData}
                    />
                </Route>
                <Route path="/">
                    <Home
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;