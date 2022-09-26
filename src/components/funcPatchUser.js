function patchUser(userObj, patchObj) {
    return fetch(`http://localhost:3000/users/${userObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(patchObj)
    });
};

export default patchUser;