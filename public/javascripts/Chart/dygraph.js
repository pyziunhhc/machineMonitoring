import helpers from '../helpers/fetch.js';
class myDygraph {
    constructor(data, name) {
        this.data = data;
        this.name = name;
        this.minDate = null;
        this.maxDate = null;
        this.isZoomed = null;
        this.toUpdateTable = null;
        this.toUpdateChart = null;
        this.labels = ['start', 'Posuw', 'Erodowanie', 'Szlifowanie', 'Wyłączona', 'Zał.Ręczny', 'Zał.Robotem', 'Stop', 'Pomiar', 'Alarm', 'Wymiana Ściernicy', 'Wymiana Narzędzia', 'Przejście', 'Rozgrzewka', 'Zatrzymanie', 'Praca'];
        this.colors = {
            erodowanie: {
                name: 'erodowanie',
                displayName: 'Erodowanie',
                className: 'eroding',
                color: 'rgba(0, 82, 20, 0.9)',
            },
            szlifowanie: {
                name: 'szlifowanie',
                displayName: 'Szlifowanie',
                color: 'rgba(0, 209, 44, 0.9)',
                className: 'grinding',

            },
            praca: {
                name: 'praca',
                displayName: 'Praca',
                className: 'working',
                color: 'rgba(0, 82, 20, 0.9)',

            },
            disconnect: {
                name: 'disconnect',
                displayName: 'Wyłączona',
                className: 'disconnect',
                color: 'rgba(145, 145, 145, 1)',

            },
            manual: {
                name: 'manual',
                displayName: 'Załadunek\nRobotem',
                className: 'robotLoading',
                color: 'rgba(200,0,200,1)',

            },
            warmup: {
                name: 'warmup',
                displayName: 'Załadunek Ręczny',
                className: 'manualLoading',
                color: 'rgba(81, 182, 215,1)',

            },
            stop: {
                name: 'stop',
                displayName: 'Stop',
                className: 'stop',
                color: 'rgba(243, 230, 0, 1)',

            },
            suspend: {
                name: 'suspend',
                displayName: 'Pomiar',
                className: 'measuring',
                color: 'rgba(255, 177, 51, 1)',

            },
            alarm: {
                name: 'alarm',
                displayName: 'Alarm',
                className: 'alarm',
                color: 'rgba(255,0,0,1)',

            },
            rozgrzewka: {
                name: 'rozgrzewka',
                displayName: 'Rozgrzewka',
                className: 'warmup',
                color: 'rgba(168,80,80,1)',

            },
            wymiana_sciernicy: {
                name: 'wymiana_sciernicy',
                displayName: 'Wymiana\nŚciernicy',
                className: 'wheelReplacement',
                color: 'rgba(0,0,0,1)',

            },
            wymianaNarzedzia: {
                name: 'wymianaNarzedzia',
                displayName: 'Wymiana\nNarzędzia',
                className: 'toolChange',
                color: 'rgba(206, 183, 119, 1)',

            },
            przejscie: {
                name: 'przejscie',
                displayName: 'Przejście',
                className: 'transition',
                color: 'rgba(255,112,183,1)',

            },
            zatrzymanie: {
                name: 'zatrzymanie',
                displayName: 'Zatrzymanie',
                className: 'suspend',
                color: 'rgba(145,19,19,1)',

            }

        };
    }
    updateChart() {

    }
    updateOptions(toUpdateTable = false, toUpdateChart = false, isZoomed = false) {
        this.toUpdateTable = toUpdateTable;
        this.toUpdateChart = toUpdateChart;
        this.isZoomed = isZoomed;
    }
    create() {
        const chart = document.createElement('div'),
            chartContainer = document.querySelector(`.dygraph__container.${this.name}`);
        const data = this.data,
            labels = this.labels,
            colors = this.colors,
            that = this;
        chartContainer.appendChild(chart);
        const finalData = data.map((arrays, index) => {
            let finalData = [];
            arrays.map((val, index) => {
                if (index == 0) {
                    finalData.push(new Date(val));
                } else {
                    finalData.push(val)
                }
                return finalData;
            })
            return finalData;

        })

        const myChart = new Dygraph(chart,
            finalData, {
                labels: labels,
                colors: [
                    colors.erodowanie.color,
                    colors.erodowanie.color,
                    colors.szlifowanie.color,
                    colors.disconnect.color,
                    colors.warmup.color,
                    colors.manual.color,
                    colors.stop.color,
                    colors.suspend.color,
                    colors.alarm.color,
                    colors.wymiana_sciernicy.color,
                    colors.wymianaNarzedzia.color,
                    colors.przejscie.color,
                    colors.rozgrzewka.color,
                    colors.zatrzymanie.color,
                    colors.praca.color
                ],
                visibility: [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                stepPlot: true,
                fillGraph: true,
                fillAlpha: 1,
                width: window.outerWidth > 1000 ? window.outerWidth * 0.65 : window.outerWidth * 0.91,
                height: 150,
                //legend: 'always',
                title: this.name,
                //labelsDiv: document.querySelector(`.${timeType}-graph-legend.${that.fullName}`),
                valueRange: [0, 0.01],
                displayAnnotations: true,
                axes: {
                    y: {
                        drawAxis: false
                    }
                },
                zoomCallback: function (minDate, maxDate) {
                    this.updateOptions({
                        valueRange: [0, 0.01]
                    });
                    let isZoomed = that.isZoomed;

                    const data = {
                        from: new Date(minDate),
                        to: new Date(maxDate),
                        name: that.name
                    }
                    if (typeof that.minDate == "number" && typeof that.maxDate == "number") { //Sprawdź czy maszyna ma zapisany ostatni stan
                        if (!isZoomed || (minDate > that.minDate && maxDate < that.maxDate)) { //jeżeli wykres nie jest przyblizony lub minDate z przyblizenia jest wieksza I maxDate jest mniejsza
                            that.updateOptions(false, false, true); //ustaw: nie aktualizuj tabeli, nie aktualizuj wykresu, jest zoom
                            that.minDate = minDate; //dodaj wartosci z zoomu jako minDate
                            that.maxDate = maxDate; // dodaj wartosci z zoomu jako maxDate
                            //const MACHINE = new Machine(that.fullName, that.shortName)
                            helpers.getStatuses(data).then(res => {
                                //processStatuses(res, MACHINE)
                                //createTable(MACHINE, timeType, 'vertical')
                            })
                        } else {
                            that.updateOptions(true, true, false);
                        }
                    } else if (!isZoomed || (minDate > that.minDate && maxDate < that.maxDate)) {
                        that.updateOptions(false, false, true);
                        that.minDate = minDate;
                        that.maxDate = maxDate;
                        //const MACHINE = new Machine(that.fullName, that.shortName)
                        helpers.getStatuses(data).then(res => {

                            //processStatuses(res, MACHINE)
                            //createTable(MACHINE, timeType, 'vertical')
                        })
                    } else {
                        that.updateOptions(true, true, false);
                    }
                },
                valueFormatter: function (value, opts, seriesName) {
                    if (seriesName != 'start') {
                        return `Czas: ${helpers.parseMillisecondsIntoReadableTime(value)}`;
                    } else {
                        return `Start: ${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`

                    }
                }

            });
        return myChart;
    }

    update(data){
        const finalData = data.map((arrays, index) => {
            let finalData = [];
            arrays.map((val, index) => {
                if (index == 0) {
                    finalData.push(new Date(val));
                } else {
                    finalData.push(val)
                }
                return finalData;
            })
            return finalData;

        })
        return finalData;
    }
}

export default myDygraph;