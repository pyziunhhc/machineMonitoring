const fetch = require('node-fetch');
const Server = require('../models/Server');
let IP = 0,
    PORT = 0,
    API_VERSION = 0,
    USER = null,
    PASSWORD = null;

(async function setCredentials() {
    await Server.find((err, document) => {
        if (document.length) {
            IP = document[0].ip;
            PORT = document[0].port;
            API_VERSION = document[0].apiVersion;
            USER = document[0].login;
            PASSWORD = document[0].password;
        } else {
            setCredentials();
        }
    })
})();






const fetchData = (url) => {

    return fetch(`http://${IP}:${PORT}/api/v${API_VERSION}/${url}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${USER}:${PASSWORD}`).toString('base64')}`
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