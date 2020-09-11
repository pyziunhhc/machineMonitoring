const fetch = require('node-fetch');
const auth = require('../bin/password.json');
const API_VERSION = 1;
const fetchData = (url) => {
    return fetch(`http://192.168.2.98:3000/api/v${API_VERSION}/${url}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${auth[0].user}:${auth[0].password}`).toString('base64')}`
            }
        }).then(res => res.json())
        .catch(e => console.log(e));

}

const getGroups = () => fetchData('groups');
const getMachines = groupName => fetchData(`groups/${groupName}/equipment`);
const getData = (machineName, from, to) => {
    if (from && to) {
        return fetchData(`equipment/${machineName}/monitorings/conditionWithFeedAndPotentiometr/logs?from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}`)
    } else if (from) {
        return fetchData(`equipment/${machineName}/monitorings/conditionWithFeedAndPotentiometr/logs?from=${new Date(from).toISOString()}`);
    } else {
        return fetchData(`equipment/${machineName}/monitorings/conditionWithFeedAndPotentiometr/logs?`);
    }
}
const getStatuses = (machineName, from, to) => {
    this.from = new Date(from);
    this.to = new Date(to);
    if (this.from !== 'Invalid Date' && this.to != 'Invalid Date') {
        return fetchData(`equipment/${machineName}/monitorings/condition2/logs?from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}`)
    } else if (from) {
        return fetchData(`equipment/${machineName}/monitorings/condition2/logs?from=${new Date(from).toISOString()}`);
    } else {
        return fetchData(`equipment/${machineName}/monitorings/condition2/logs?`);
    }
}


module.exports = {
    getGroups,
    getMachines,
    getStatuses
}