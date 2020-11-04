

function checkUserStats(data) {
    return fetch('stats/checkStats', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(error => {
            throw new Error(error)
        })
}

function saveStatusesForUser(data) {
    return fetch('/stats/save', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(error => {
            throw new Error(error)
        })
}

function lockStatusesForUser(data) {
    return fetch('/stats/lockStats', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(error => {
            throw new Error(error)
        })
}

function updateStatusesForUser(data) {
    return fetch('/stats/update', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function listLockedMachines(data) {
    return fetch('/stats/locked', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}



function showUserStats(data) {
    return fetch('stats/show/user', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}
function showAllStats(data) {
    return fetch('/stats/show/all', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}
export default {
    checkUserStats,
    showUserStats,
    showAllStats,
    listLockedMachines,
    updateStatusesForUser,
    lockStatusesForUser,
    saveStatusesForUser,
}