function getMachines() {
    return fetch('data/get/machines', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
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
    return fetch('stats/check', {
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

function unlockMachine(data) {
    return fetch('/stats/unlock', {
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

function whatMachinesDoingNow(time) {
    return fetch('/dashboard/get/table/whatMachinesDoingNow', {
            method: 'POST',
            body: JSON.stringify(time),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}

function summaryMachinesWork(time) {

    return fetch('/dashboard/get/table/summaryMachinesWork', {
            method: 'POST',
            body: JSON.stringify(time),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())

}

function whatMachinesDoingNowGraph(time) {

    return fetch('/dashboard/get/graph/whatMachinesDoingNow', {
            method: 'POST',
            body: JSON.stringify(time),
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.json()
        })

    return percentageChart;
}

function updateWhatMachinesDoingNowGraph(graph) {
    fetch('/dashboard/get/graph/whatMachinesDoingNow', {
            method: 'POST',
            body: JSON.stringify(time),
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.json()
        })
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
export default {
    getMachines,
    getAllStatuses,
    updateSummaryStatuses,
    getSummaryStatuses,
    updateStatuses,
    whatMachinesDoingNow,
    summaryMachinesWork,
    whatMachinesDoingNowGraph,
    saveStatusesForUser,
    updateStatusesForUser,
    unlockMachine,
    listLockedMachines,
    checkMachineIsLocked,
    lockStatusesForUser,
    checkUserStats,
    showUserStats
}