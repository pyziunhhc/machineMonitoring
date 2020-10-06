const summaryMachineStatistics = (data, from) => {
    const DATA = data;
    let summaryMachineStatistics = {
        firstStatus: {
            name: '',
            data: {
                time: 0,
                show: false
            }
        },
        lastStatus: {
            name: '',
            data: {
                time: 0,
                show: false
            }
        },
        erodowanie: {
            name: 'erodowanie',
            displayName: 'Erodowanie',
            className: 'eroding',
            color: 'rgba(0, 82, 20, 0.9)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }

        },
        szlifowanie: {
            name: 'szlifowanie',
            displayName: 'Szlifowanie',
            color: 'rgba(0, 209, 44, 0.9)',
            className: 'grinding',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        praca: {
            name: 'praca',
            displayName: 'Praca',
            className: 'working',
            color: 'rgba(0, 82, 20, 0.9)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        disconnect: {
            name: 'disconnect',
            displayName: 'Wyłączona',
            className: 'disconnect',
            color: 'rgba(145, 145, 145, 1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        manual: {
            name: 'manual',
            displayName: 'Załadunek\nRobotem',
            className: 'robotLoading',
            color: 'rgba(200,0,200,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        warmup: {
            name: 'warmup',
            displayName: 'Załadunek Ręczny',
            className: 'manualLoading',
            color: 'rgba(81, 182, 215,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        stop: {
            name: 'stop',
            displayName: 'Stop',
            className: 'stop',
            color: 'rgba(243, 230, 0, 1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        suspend: {
            name: 'suspend',
            displayName: 'Pomiar',
            className: 'measuring',
            color: 'rgba(255, 177, 51, 1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        emergency: {
            name: 'emergency',
            displayName: 'Alarm',
            className: 'alarm',
            color: 'rgba(255,0,0,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        rozgrzewka: {
            name: 'rozgrzewka',
            displayName: 'Rozgrzewka',
            className: 'warmup',
            color: 'rgba(168,80,80,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        wymiana_sciernicy: {
            name: 'wymiana_sciernicy',
            displayName: 'Wymiana\nŚciernicy',
            className: 'wheelReplacement',
            color: 'rgba(0,0,0,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        wymianaNarzedzia: {
            name: 'wymianaNarzedzia',
            displayName: 'Wymiana\nNarzędzia',
            className: 'toolChange',
            color: 'rgba(206, 183, 119, 1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        przejscie: {
            name: 'przejscie',
            displayName: 'Przejście',
            className: 'transition',
            color: 'rgba(255,112,183,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        zatrzymanie: {
            name: 'zatrzymanie',
            displayName: 'Zatrzymanie',
            className: 'suspend',
            color: 'rgba(145,19,19,1)',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0
            }
        },
        sumOfTimes: {
            displayName: 'Suma',
            data: {
                time: 0,
                show: false
            }
        },

    };

    DATA.map((data, index) => {
        let start = new Date(data.start),
            end = new Date(data.end),
            time = end - start,
            status = `${data.value}`;

        if (index == 0) {
            if (start != new Date(from)) {
                let newStart = new Date(from);
                if (data.end == null) {
                    time = new Date() - newStart;
                    summaryMachineStatistics.sumOfTimes.data.time += time;
                } else {
                    time = end - newStart;
                    summaryMachineStatistics.sumOfTimes.data.time += time;
                }
            } else {
                summaryMachineStatistics.sumOfTimes.data.time += time;
            }
        } else {
            if (data.end == null) {
                time = new Date() - start;
                console.log('Początek', time, data)
                summaryMachineStatistics.sumOfTimes.data.time += time;
                summaryMachineStatistics.lastStatus.name = data.value;
            } else {
                summaryMachineStatistics.sumOfTimes.data.time += time;
            }
        }



        switch (status) {
            case 'ERODOWANIE':
                summaryMachineStatistics.erodowanie.data.time += time;

                break;
            case 'SZLIFOWANIE':
                summaryMachineStatistics.szlifowanie.data.time += time;

                break;
            case 'DISCONNECT':
                summaryMachineStatistics.disconnect.data.time += time;

                break;
            case 'null':
                summaryMachineStatistics.disconnect.data.time += time;

                break;
            case 'WARMUP':
                summaryMachineStatistics.warmup.data.time += time;


                break;
            case 'MANUAL':
                summaryMachineStatistics.manual.data.time += time;

                break;
            case 'WYMIANA':
                summaryMachineStatistics.wymianaSciernicy.data.time += time;

                break;
            case 'STOP':
                summaryMachineStatistics.stop.data.time += time;

                break;
            case 'SUSPEND':
                summaryMachineStatistics.suspend.data.time += time;
                break;


            case 'EMERGENCY':
                summaryMachineStatistics.emergency.data.time += time;

                break;
            case 'ROZGRZEWKA':
                summaryMachineStatistics.rozgrzewka.data.time += time;

                break;
            case 'ZATRZYMANIE':
                summaryMachineStatistics.zatrzymanie.data.time += time;

                break;
            case 'PRACA':
                summaryMachineStatistics.praca.data.time += time;

                break;
        }
    });

    return summaryMachineStatistics;
}
const statusesForDygraph = (data) => {
    const DATA = data;
    let machineStatsForDygraph = [];
    DATA.forEach(data => {
        let start = new Date(data.start),
            end = new Date(data.end),
            time = end - start,
            feedValue = 0,
            status = `${data.value}`;
        if (data.end == null) {
            time = new Date() - start;
        }
        switch (status) {
            case 'ERODOWANIE': {
                machineStatsForDygraph.push([start, feedValue, time, null, null, null, null, null, null, null, null, null, null, null, null, null]);
            }
            break;
        case 'SZLIFOWANIE': {
            machineStatsForDygraph.push([start, feedValue, null, time, null, null, null, null, null, null, null, null, null, null, null, null]);

        }
        break;
        case 'DISCONNECT': {
            machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
        }
        break;
        case 'null': {
            machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
        }
        break;
        case 'WARMUP': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, time, null, null, null, null, null, null, null, null, null, null]);
        }
        break;
        case 'MANUAL': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, time, null, null, null, null, null, null, null, null, null]);

        }
        break;
        case 'WYMIANA': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, time, null, null, null, null, null]);

        }
        break;
        case 'STOP': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, time, null, null, null, null, null, null, null, null]);
        }
        break;
        case 'SUSPEND': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, time, null, null, null, null, null, null, null]);

        }
        break;
        case 'EMERGENCY': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, time, null, null, null, null, null, null]);
        }
        break;
        case 'ROZGRZEWKA': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, time, null, null]);
        }
        break;
        case 'ZATRZYMANIE': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, time, null]);
        }
        break;
        case 'PRACA': {
            machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, null, time]);
        }
        break;
        }
    })
    return machineStatsForDygraph;

}
const statusesForChartJS = (data) => {
    let avaibleLabels = [],
        statusesColors = [],
        percentageValuesForChartJS = [],
        timeValuesForChartJS = [];
    Object.values(data)
        .filter(val => {
            return val.data.time > 0;
        })
        .map(val => {
            if (val.name) {
                avaibleLabels.push(`${val.displayName}`);
                statusesColors.push(val.color)
            }

            return val;
        })
        .map((val, index) => {
            if (val.name) {
                percentageValuesForChartJS.push((parseFloat(val.data.time) * 100 / data.sumOfTimes.data.time).toFixed(2));
            }
            return val;
        })
        .map(val => {
            if (val.name) {
                timeValuesForChartJS.push(new Date(val.data.time));
            }

            return val;
        })
    return {
        labels: avaibleLabels,
        colors: statusesColors,
        percentage: percentageValuesForChartJS,
        time: timeValuesForChartJS
    }

}
const updateSummaryMachineStatistics = (newData, oldData, currentStatus, lastStatus) => {
    try {
        if (currentStatus != lastStatus) {
            const sumMachineStats = oldData,
                data = newData[0],
                status = `${data.value}`;
            switch (status) {
                case 'ERODOWANIE': {
                    sumMachineStats.erodowanie.data.time += 1000;
                }
                break;
            case 'SZLIFOWANIE': {
                sumMachineStats.szlifowanie.data.time += 1000;
            }
            break;
            case 'PRACA': {
                sumMachineStats.praca.data.time += 1000;
            }
            break;
            case 'DISCONNECT': {
                sumMachineStats.disconnect.data.time += 1000;
            }
            break;
            case 'null': {
                sumMachineStats.disconnect.data.time += 1000;
            }
            break;
            case 'MANUAL': {
                sumMachineStats.manual.data.time += 1000;
            }
            break;
            case 'WARMUP': {
                sumMachineStats.warmup.data.time += 1000;
            }
            break;
            case 'WYMIANA_SCIERNICY': {
                sumMachineStats.wymiana_sciernicy.data.time += 1000;
            }
            break;
            case 'STOP': {
                sumMachineStats.stop.data.time += 1000;
                break;
            }
            case 'SUSPEND': {
                sumMachineStats.suspend.data.time += 1000;

            }
            break;
            case 'EMERGENCY': {
                sumMachineStats.emergency.data.time += 1000;
            }
            break;
            case 'ROZGRZEWKA': {
                sumMachineStats.rozgrzewka.data.time += 1000;
            }
            break;
            case 'ZATRZYMANIE': {
                sumMachineStats.suspend.data.time += 1000;
            }
            break;
            }
            return sumMachineStats;
        } else {
            const sumMachineStats = oldData;
            if (currentStatus == 'null') {
                sumMachineStats.disconnect.data.time += 1000;
            } else {
                sumMachineStats[currentStatus.toLowerCase()].data.time += 1000;
            }
            sumMachineStats.sumOfTimes.data.time += 1000;

            return sumMachineStats;
        }

    } catch (e) {
        //sumMachineStats.disconnect.data.time += 1000;
        console.log(e)
    }

}
const updateStatusesForDygraph = (newData, oldData, currentStatus, lastStatus) => {
    try {
        if (currentStatus != lastStatus) {
            const DATA = newData;
            let machineStatsForDygraph = oldData;
            DATA.forEach(data => {
                const start = new Date(data.start),
                    end = new Date(),
                    time = end - start,
                    status = `${data.value}`,
                    feedValue = 0;

                switch (status) {
                    case 'ERODOWANIE': {
                        machineStatsForDygraph.push([start, feedValue, time, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                    }
                    break;
                case 'SZLIFOWANIE': {
                    machineStatsForDygraph.push([start, feedValue, null, time, null, null, null, null, null, null, null, null, null, null, null, null]);

                    break;
                }
                case 'DISCONNECT': {
                    machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                }
                break;
                case 'null': {
                    machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                }
                break;
                case 'WARMUP': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, time, null, null, null, null, null, null, null, null, null, null]);
                }

                break;
                case 'MANUAL': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, time, null, null, null, null, null, null, null, null, null]);
                }
                break;
                case 'WYMIANA': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, time, null, null, null, null, null])
                }
                break;
                case 'STOP': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, time, null, null, null, null, null, null, null, null]);
                }
                break;
                case 'SUSPEND': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, time, null, null, null, null, null, null, null]);
                    break;
                }

                case 'EMERGENCY': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, time, null, null, null, null, null, null]);
                }
                break;
                case 'ROZGRZEWKA': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, time, null, null]);
                }
                break;
                case 'ZATRZYMANIE': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, time, null]);
                }
                break;
                case 'PRACA': {
                    machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, null, time]);
                }
                break;
                }
            })
            return machineStatsForDygraph;
        } else {
            return oldData;
        }
    } catch (e) {
        console.log(e)
    }


}
const updateStatusesForChartJS = (data) => {
    let avaibleLabels = [],
        statusesColors = [],
        percentageValuesForChartJS = [],
        timeValuesForChartJS = [];
    Object.values(data)
        .filter(val => {
            return val.data.time > 0;
        })
        .map(val => {
            if (val.name) {
                avaibleLabels.push(`${val.displayName}`);
                statusesColors.push(val.color)
            }

            return val;
        })
        .map((val, index) => {

            //data[val.name].data.percentage = parseFloat(data[val.name].data.time * 100 / data.sumOfTimes.data.time).toFixed(2);
            if (val.name) {
                percentageValuesForChartJS.push((parseFloat(val.data.time) * 100 / data.sumOfTimes.data.time).toFixed(2));
            }

            return val;
        })
        .map(val => {
            if (val.name) {
                timeValuesForChartJS.push(new Date(val.data.time));
            }

            return val;
        })
    return {
        labels: avaibleLabels,
        colors: statusesColors,
        percentage: percentageValuesForChartJS,
        time: timeValuesForChartJS
    }
}
const updateStatusesForTable = (data, newData) => {

}
module.exports = {
    summaryMachineStatistics,
    statusesForDygraph,
    statusesForChartJS,
    updateSummaryMachineStatistics,
    updateStatusesForDygraph,
    updateStatusesForChartJS
};