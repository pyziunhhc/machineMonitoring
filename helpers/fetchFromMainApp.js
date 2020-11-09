const fetch = require('node-fetch');
const Server = require('../models/Server');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const testData = require('../config/testData.json')
const updateData = require('../config/testUpdateData.json')
const groups = require('../config/groups.json')
const machines = require('../config/machines.json')

function getCredentials() {
    return new Promise((resolve, reject) => {
        Server.find((err, document) => {
            if (document.length) {
                if (document[0].testMode) {
                    resolve('testMode')
                } else {
                    cache.mset([{
                            key: 'IP',
                            val: document[0].ip
                        },
                        {
                            key: 'PORT',
                            val: document[0].port
                        },
                        {
                            key: 'API_VERSION',
                            val: document[0].apiVersion
                        },
                        {
                            key: 'USER',
                            val: document[0].login
                        },
                        {
                            key: 'PASSWORD',
                            val: document[0].password
                        },

                    ])
                    resolve('notTestModeAndOk')
                }

            } else {
                getCredentials();
            }
        })
    })
}
const fetchData = (url) => {
    return getCredentials()
        .then((response) => {
            if (response == 'notTestModeAndOk') {
                const data = cache.mget(['IP', 'PORT', 'API_VERSION', 'USER', 'PASSWORD'])
                if (data == 'undefined') {
                    console.log(error)

                } else {
                    return fetch(`http://${data.IP}:${data.PORT}/api/v${data.API_VERSION}/${url}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Basic ${Buffer.from(`${data.USER}:${data.PASSWORD}`).toString('base64')}`
                            }
                        })
                        .then(res => res.json())
                        .catch(e => console.log(e))
                }
            } else if (response == 'testMode') {
                switch (url) {
                    case 'groups':
                        return groups;
                        break;
                    case 'groups/FIRST_HALL/equipment':
                        return machines;
                        break;
                    default:
                        return testData;
                        break;

                }
            }
        })
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



