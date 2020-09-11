const {
    summaryMachineStatistics
} = require('../../helpers/processStatuses/process')

const whatMachineDoingTable = (data) => {
    let processedStatuses = [];
    data.map(machine => {
        switch (machine.statuses) {
            case 'ERODOWANIE': {
                processedStatuses.push({
                    name: machine.name,
                    status: machine.statuses,
                    class: 'eroding'
                })
            }
            break;
        case 'SZLIFOWANIE': {
            processedStatuses.push({
                name: machine.name,
                status: machine.statuses,
                class: 'grinding'
            })
        }
        break;
        case 'DISCONNECT': {
            processedStatuses.push({
                name: machine.name,
                status: 'WYŁĄCZONA',
                class: 'disconnect'
            })
        }
        break;
        case null: {
            processedStatuses.push({
                name: machine.name,
                status: 'WYŁĄCZONA',
                class: 'disconnect'
            })
        }
        break;
        case 'WARMUP': {
            processedStatuses.push({
                name: machine.name,
                status: 'ZAŁADUNEK RĘCZNY',
                class: 'manualLoading'
            })
        }

        break;
        case 'MANUAL': {
            processedStatuses.push({
                name: machine.name,
                status: 'ZAŁADUNEK ROBOTEM',
                class: 'robotLoading'
            })
        }
        break;
        case 'WYMIANA_SCIERNICY': {
            processedStatuses.push({
                name: machine.name,
                status: 'WYMIANA ŚCIERNICY',
                class: 'wheelReplacement'
            })
        }
        break;
        case 'STOP': {
            processedStatuses.push({
                name: machine.name,
                status: machine.statuses,
                class: 'stop'
            })
        }
        break;
        case 'SUSPEND': {
            processedStatuses.push({
                name: machine.name,
                status: 'POMIAR',
                class: 'measuring'
            })
        }
        break;
        case 'EMERGENCY': {
            processedStatuses.push({
                name: machine.name,
                status: 'ALARM',
                class: 'alarm'
            })
        }
        break;
        case 'ROZGRZEWKA': {
            processedStatuses.push({
                name: machine.name,
                status: machine.statuses,
                class: 'warmup'
            })
        }
        break;
        case 'ZATRZYMANIE': {
            processedStatuses.push({
                name: machine.name,
                status: machine.statuses,
                class: 'suspend'
            })
        }
        break;
        case 'PRACA': {
            processedStatuses.push({
                name: machine.name,
                status: machine.statuses,
                class: 'working'
            })
        }
        break;
        }
    })
    return processedStatuses;
}

const whatMachineDoingGraph = (data) => {
    let labels = [],
        values = [],
        colors = [];
    let processedStatuses = {
        ERODOWANIE: {
            name: 'ERODOWANIE',
            value: 0,
            color: 'rgba(0, 82, 20, 0.9)'
        },
        SZLIFOWANIE: {
            name: 'SZLIFOWANIE',
            value: 0,
            color: 'rgba(0, 209, 44, 0.9)'
        },
        DISCONNECT: {
            name: 'DISCONNECT',
            value: 0,
            color: 'rgba(145, 145, 145, 1)'
        },
        WARMUP: {
            name: 'WARMUP',
            value: 0,
            color: 'rgba(81, 182, 215,1)'
        },
        MANUAL: {
            name: 'MANUAL',
            value: 0,
            color: 'rgba(200,0,200,1)'
        },
        WYMIANA_SCIERNICY: {
            name: 'WYMIANA_SCIERNICY',
            value: 0,
            color: 'rgba(0,0,0,1)'
        },
        STOP: {
            name: 'STOP',
            value: 0,
            color: 'rgba(243, 230, 0, 1)'
        },
        SUSPEND: {
            name: 'SUSPEND',
            value: 0,
            color: 'rgba(255, 177, 51, 1)'
        },
        EMERGENCY: {
            name: 'EMERGENCY',
            value: 0,
            color: 'rgba(255,0,0,1)'
        },
        ROZGRZEWKA: {
            name: 'ROZGRZEWKA',
            value: 0,
            color: 'rgba(145,19,19,1)'
        },
        ZATRZYMANIE: {
            name: 'ZATRZYMANIE',
            value: 0,
            color: 'rgba(168,80,80,1)'
        },
        PRACA: {
            name: 'PRACA',
            value: 0,
            color: 'rgba(0, 82, 20, 0.9)'
        }
    }
    data.map(machine => {
        switch (machine.statuses) {
            case 'ERODOWANIE': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'SZLIFOWANIE': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'DISCONNECT': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case null: {
                processedStatuses['DISCONNECT'].value++;
            }
            break;
            case 'WARMUP': {
                processedStatuses[machine.statuses].value++;
            }

            break;
            case 'MANUAL': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'WYMIANA_SCIERNICY': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'STOP': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'SUSPEND': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'EMERGENCY': {

                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'ROZGRZEWKA': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'ZATRZYMANIE': {
                processedStatuses[machine.statuses].value++;
            }
            break;
            case 'PRACA': {
                processedStatuses[machine.statuses].value++;
            }
            break;
        }
    })
    let temp = Object.values(processedStatuses)
    temp.map(statuses => {
        labels.push(statuses.name)
        values.push(statuses.value)
        colors.push(statuses.color)
    })

    return [labels, values, colors]
}

const currentMachinesWork = (data) => {
    let currentMachinesWork = data,
        dataToSend = [];

    currentMachinesWork.map((element, index) => {
        if (index == 0) {
            element.statuses
        }
        let processedData = summaryMachineStatistics(element.statuses)
        dataToSend.push({
            name: element.name,
            data: processedData
        })
    });
    return dataToSend;

}

module.exports = {
    whatMachineDoingTable,
    whatMachineDoingGraph,
    currentMachinesWork
};