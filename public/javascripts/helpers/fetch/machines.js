function getMachines() {
    return fetch('machines/get', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })
}

function getAllStatuses(data) {
    return fetch('data/get/all', {
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

function updateStatuses(data) {
    return fetch('data/update/all', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => {
            throw new Error(err)
        })
}

function getSummaryStatuses(data) {
    return fetch('data/get/summary', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(error => error)
}

function updateSummaryStatuses(data) {
    return fetch('data/update/summary', {
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

function checkMachineIsLocked(data) {
    return fetch('machines/check', {
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
function unlockMachine(data) {
    return fetch('/machines/unlock', {
            method: 'DELETE',
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
export default {
    getMachines,
    getAllStatuses,
    updateSummaryStatuses,
    getSummaryStatuses,
    updateStatuses,
    checkMachineIsLocked,
    unlockMachine
}