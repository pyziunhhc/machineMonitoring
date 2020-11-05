const summaryMachineStatistics = (data, from, to) => {

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
            colors: {
                rgba: 'rgba(0, 82, 20, 0.9)',
                argb: '005214'
            },
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }

        },
        szlifowanie: {
            name: 'szlifowanie',
            displayName: 'Szlifowanie',
            colors: {
                rgba: 'rgba(0, 209, 44, 0.9)',
                argb: '00D12C'
            },

            className: 'grinding',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        praca: {
            name: 'praca',
            displayName: 'Praca',
            className: 'working',
            colors: {
                rgba: 'rgba(0, 82, 20, 0.9)',
                argb: '005214'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        disconnect: {
            name: 'disconnect',
            displayName: 'Wyłączona',
            className: 'disconnect',
            colors: {
                rgba: 'rgba(145, 145, 145, 1)',
                argb: '919191'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        manual: {
            name: 'manual',
            displayName: 'Załadunek\nRobotem',
            className: 'robotLoading',
            colors: {
                rgba: 'rgba(200,0,200,1)',
                argb: 'C800C8'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        warmup: {
            name: 'warmup',
            displayName: 'Załadunek Ręczny',
            className: 'manualLoading',
            colors: {
                rgba: 'rgba(81, 182, 215,1)',
                argb: '51B6D7'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        stop: {
            name: 'stop',
            displayName: 'Stop',
            className: 'stop',
            colors: {
                rgba: 'rgba(243, 230, 0, 1)',
                argb: 'F3E600'
            },
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        suspend: {
            name: 'suspend',
            displayName: 'Pomiar',
            className: 'measuring',
            colors: {
                rgba: 'rgba(255, 177, 51, 1)',
                argb: 'FFB133'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        emergency: {
            name: 'emergency',
            displayName: 'Alarm',
            className: 'alarm',
            colors: {
                rgba: 'rgba(255,0,0,1)',
                argb: 'FF0000'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        rozgrzewka: {
            name: 'rozgrzewka',
            displayName: 'Rozgrzewka',
            className: 'warmup',
            colors: {
                rgba: 'rgba(168,80,80,1)',
                argb: 'A85050'
            },
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        wymiana_sciernicy: {
            name: 'wymiana_sciernicy',
            displayName: 'Wymiana\nŚciernicy',
            className: 'wheelReplacement',
            colors: {
                rgba: 'rgba(0,0,0,1)',
                argb: '000000'
            },

            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        wymianaNarzedzia: {
            name: 'wymianaNarzedzia',
            displayName: 'Wymiana\nNarzędzia',
            className: 'toolChange',
            colors: {
                rgba: 'rgba(206, 183, 119, 1)',
                argb: 'CEB777'
            },
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        przejscie: {
            name: 'przejscie',
            displayName: 'Przejście',
            className: 'transition',
            colors: {
                rgba: 'rgba(255,112,183,1)',
                argb: 'FF70B7'
            },
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        zatrzymanie: {
            name: 'zatrzymanie',
            displayName: 'Zatrzymanie',
            className: 'suspend',
            colors: {
                rgba: 'rgba(145,19,19,1)',
                argb: '911313'
            },
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            }
        },
        sumOfTimes: {
            displayName: 'Suma',
            colors: {
                rgba: 'rgba(255,255,255,1)',
                argb: 'FFFFFF'
            },
            data: {
                time: 0,
                show: true
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
                    if (isNaN(time)) {}
                    summaryMachineStatistics.sumOfTimes.data.time += time;
                } else {
                    time = end - newStart;
                    if (isNaN(time)) {}
                    summaryMachineStatistics.sumOfTimes.data.time += time;
                }
            } else {
                if (isNaN(time)) {}
                summaryMachineStatistics.sumOfTimes.data.time += time;
            }
        } else {
            if (data.end == null) {
                time = new Date() - start;
                if (isNaN(time)) {

                }
                summaryMachineStatistics.sumOfTimes.data.time += time;
                summaryMachineStatistics.lastStatus.name = data.value;
                if (end > new Date(to)) {
                    time = new Date(to) - new Date(start)
                    summaryMachineStatistics.sumOfTimes.data.time += time;
                }
            } else {
                if (isNaN(time)) {}
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
    Object.values(summaryMachineStatistics)
        .forEach(stat => {
            stat.data.percentage = ((stat.data.time * 100) / summaryMachineStatistics.sumOfTimes.data.time).toFixed(2)
        })
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
            case 'ERODOWANIE':
                machineStatsForDygraph.push([start, feedValue, time, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'SZLIFOWANIE':
                machineStatsForDygraph.push([start, feedValue, null, time, null, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'DISCONNECT':
                machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'null':
                machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'WARMUP':
                machineStatsForDygraph.push([start, feedValue, null, null, null, time, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'MANUAL':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, time, null, null, null, null, null, null, null, null, null]);
                break;
            case 'WYMIANA':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, time, null, null, null, null, null]);
                break;
            case 'STOP':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, time, null, null, null, null, null, null, null, null]);
                break;
            case 'SUSPEND':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, time, null, null, null, null, null, null, null]);
                break;
            case 'EMERGENCY':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, time, null, null, null, null, null, null]);
                break;
            case 'ROZGRZEWKA':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, time, null, null]);
                break;
            case 'ZATRZYMANIE':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, time, null]);
                break;
            case 'PRACA':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, null, time]);
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
                statusesColors.push(val.colors.rgba)
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
                status = `${newData[0].value}`;
            switch (status) {
                case 'ERODOWANIE':
                    sumMachineStats.erodowanie.data.time += 1000;
                    break;
                case 'SZLIFOWANIE':
                    sumMachineStats.szlifowanie.data.time += 1000;
                    break;
                case 'PRACA':
                    sumMachineStats.praca.data.time += 1000;
                    break;
                case 'DISCONNECT':
                    sumMachineStats.disconnect.data.time += 1000;
                    break;
                case 'null':
                    sumMachineStats.disconnect.data.time += 1000;
                    break;
                case 'MANUAL':
                    sumMachineStats.manual.data.time += 1000;
                    break;
                case 'WARMUP':
                    sumMachineStats.warmup.data.time += 1000;
                    break;
                case 'WYMIANA_SCIERNICY':
                    sumMachineStats.wymianaSciernicy.data.time += 1000;
                    break;
                case 'STOP':
                    sumMachineStats.stop.data.time += 1000;
                    break;
                case 'SUSPEND':
                    sumMachineStats.suspend.data.time += 1000;
                    break;
                case 'EMERGENCY':
                    sumMachineStats.emergency.data.time += 1000;
                    break;
                case 'ROZGRZEWKA':
                    sumMachineStats.rozgrzewka.data.time += 1000;
                    break;
                case 'ZATRZYMANIE':
                    sumMachineStats.suspend.data.time += 1000;
                    break;
            }
            sumMachineStats.sumOfTimes.data.time += 1000;
            Object.values(summaryMachineStatistics)
                .forEach(stat => {
                    stat.data.percentage = ((stat.data.time * 100) / summaryMachineStatistics.sumOfTimes.data.time).toFixed(2)
                })
            return sumMachineStats;
        } else {
            const sumMachineStats = oldData;
            if (currentStatus == 'null') {
                sumMachineStats.disconnect.data.time += 1000;
            } else {
                sumMachineStats[currentStatus.toLowerCase()].data.time += 1000;
            }
            sumMachineStats.sumOfTimes.data.time += 1000;
            Object.values(summaryMachineStatistics)
                .forEach(stat => {
                    stat.data.percentage = ((stat.data.time * 100) / summaryMachineStatistics.sumOfTimes.data.time).toFixed(2)
                })
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
                    case 'ERODOWANIE':
                        machineStatsForDygraph.push([start, feedValue, time, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'SZLIFOWANIE':
                        machineStatsForDygraph.push([start, feedValue, null, time, null, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'DISCONNECT':
                        machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'null':
                        machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'WARMUP':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, time, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'MANUAL':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, time, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'WYMIANA':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, time, null, null, null, null, null])
                        break;
                    case 'STOP':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, time, null, null, null, null, null, null, null, null]);
                        break;
                    case 'SUSPEND':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, time, null, null, null, null, null, null, null]);
                        break;
                    case 'EMERGENCY':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, time, null, null, null, null, null, null]);
                        break;
                    case 'ROZGRZEWKA':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, time, null, null]);
                        break;
                    case 'ZATRZYMANIE':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, time, null]);
                        break;
                    case 'PRACA':
                        machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, null, time]);
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
                statusesColors.push(val.colors.rgba)
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
module.exports = {
    summaryMachineStatistics,
    statusesForDygraph,
    statusesForChartJS,
    updateSummaryMachineStatistics,
    updateStatusesForDygraph,
    updateStatusesForChartJS
};