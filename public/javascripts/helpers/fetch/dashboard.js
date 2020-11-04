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
        .catch(error => {
            console.log(error)
        })
}

function updateWhatMachinesDoingNowGraph(graph) {
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
        .catch(error => {
            console.log(error)
        })
}

export default {
    summaryMachinesWork,
    whatMachinesDoingNowGraph,
    whatMachinesDoingNow,
    updateWhatMachinesDoingNowGraph
}