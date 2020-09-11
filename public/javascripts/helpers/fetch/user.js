function showUsers() {
    return fetch('/users/list', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function registerUser(data) {
    return fetch('/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function removeUser(data) {
    return fetch('/users/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function changePassword(data) {
    return fetch('/users/update/password', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function getUser(name) {
    return fetch('/users/user', {
            method: 'POST',
            body: JSON.stringify({
                name: name
            }),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

export default {
    showUsers,
    registerUser,
    removeUser,
    changePassword,
    getUser
}