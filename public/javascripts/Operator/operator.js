import Panel from './panel.js';
import machines from '../helpers/fetch/machines.js';
import message from '../helpers/messages.js';
window.onload = function () {
    const currentChangeContainer = document.querySelector('.operator__container'),
        morningContainer = document.querySelector('.morning__container'),
        afternoonContainer = document.querySelector('.afternoon__container'),
        nightContainer = document.querySelector('.night__container');
    const operator = new Operator(currentChangeContainer, morningContainer, afternoonContainer, nightContainer);
    operator.createDOM();
}
/**TODO
 * Sprobowac ujednolicić klase operator -> panel. Funkcja saveStatuses powinna isc z panelu
 * Zmiana zmiany po zmianie zmiany :D
 * Po wylogowaniu ma zakończyć liczenie statystyk
 */

class Operator {
    constructor(currentChangeContainer, morningContainer, afternoonContainer, nightContainer) {
        //poparwić  pola klasy
        this.chartJS = null;

        this.table = null;

        this.dygraph = null;

        this.userData = null;
        this.data = null;

        this.currentStatus = null;

        this.intervalID = null;

        this.currentChangeContainer = currentChangeContainer;
        this.morningChangeContainer = morningContainer;
        this.afternoonChangeContainer = afternoonContainer;
        this.nightChangeContainer = nightContainer;
        this.choosenMachine = null;
    }

    createDOM() {
        //Kontenery
        const containerForMachines = document.createElement('div'),
            productionErodingContainer = document.createElement('div'),
            sharpeningVHMContainer = document.createElement('div'),
            sharpeningErodingContainer = document.createElement('div'),
            drillSharpeningVHMContainer = document.createElement('div'),
            vhmProductionContainer = document.createElement('div'),
            bodyManufacturerContainer = document.createElement('div'),
            monitoringContainer = this.currentChangeContainer;
        //Treść
        const productionErodingHeader = document.createElement('h3'),
            sharpeningVHMHeader = document.createElement('h3'),
            sharpeningErodingHeader = document.createElement('h3'),
            drillSharpeningVHMHeader = document.createElement('h3'),
            vhmProductionHeader = document.createElement('h3'),
            bodyManufacturerHeader = document.createElement('h3');
        //Tekst
        productionErodingHeader.innerText = 'Produkcja-Erodowanie'
        sharpeningVHMHeader.innerText = 'Ostrzenie-VHM'
        sharpeningErodingHeader.innerText = 'Ostrzenie-Erodowanie'
        drillSharpeningVHMHeader.innerText = 'Ostrzenie-Wiertła VHM'
        vhmProductionHeader.innerText = 'Produkcja-VHM'
        bodyManufacturerHeader.innerText = 'Produkcja-Korpusy'
        //Klasy

        containerForMachines.classList.add('monitoring__machines');
        productionErodingContainer.classList.add('monitoring__group');
        sharpeningVHMContainer.classList.add('monitoring__group');
        sharpeningErodingContainer.classList.add('monitoring__group');
        drillSharpeningVHMContainer.classList.add('monitoring__group');
        vhmProductionContainer.classList.add('monitoring__group');
        bodyManufacturerContainer.classList.add('monitoring__group');


        productionErodingContainer.appendChild(productionErodingHeader)
        sharpeningVHMContainer.appendChild(sharpeningVHMHeader)
        sharpeningErodingContainer.appendChild(sharpeningErodingHeader)
        drillSharpeningVHMContainer.appendChild(drillSharpeningVHMHeader)
        vhmProductionContainer.appendChild(vhmProductionHeader)
        bodyManufacturerContainer.appendChild(bodyManufacturerHeader)
        containerForMachines.appendChild(productionErodingContainer);
        containerForMachines.appendChild(sharpeningVHMContainer);
        containerForMachines.appendChild(sharpeningErodingContainer);
        containerForMachines.appendChild(drillSharpeningVHMContainer);
        containerForMachines.appendChild(vhmProductionContainer);
        containerForMachines.appendChild(bodyManufacturerContainer);
        monitoringContainer.appendChild(containerForMachines);


        machines.getMachines().then(data => {
            data.machines.forEach(machine => {
                const machineContainer = document.createElement('div'),
                    machinePicture = document.createElement('img'),
                    machineTextContainer = document.createElement('div');
                const tempShortName = machine.name.split('_')[0],
                    shortName = tempShortName.slice(0, tempShortName.length - 1);

                machineContainer.classList.add('monitoring__element');
                machineTextContainer.classList.add('monitoring__element--text')
                machinePicture.classList.add('monitoring__element--img');
                machinePicture.setAttribute('src', `/images/machines/${shortName}.png`)


                machineContainer.appendChild(machinePicture)
                machinePicture.setAttribute('alt', 'Zdjęcie maszyny');
                machinePicture.setAttribute('data-name', machine.name);
                machinePicture.addEventListener('click', this.getData.bind(this));


                switch (machine.type) {
                    case 'Produkcja-Erodowanie': {
                        const machineName = document.createElement('p'),
                            machineStatus = document.createElement('p');
                        machineName.innerText = machine.name;
                        //this.getStatus(machine, machineStatus);
                        machineTextContainer.appendChild(machineName)
                        machineTextContainer.appendChild(machineStatus)
                        machineContainer.appendChild(machineTextContainer)
                        productionErodingContainer.appendChild(machineContainer)
                    }
                    break;
                case 'Ostrzenie-VHM': {
                    const machineName = document.createElement('p'),
                        machineStatus = document.createElement('p');
                    machineName.innerText = machine.name;
                    //this.getStatus(machine, machineStatus);
                    machineTextContainer.appendChild(machineName)
                    machineTextContainer.appendChild(machineStatus)
                    machineContainer.appendChild(machineTextContainer)
                    sharpeningVHMContainer.appendChild(machineContainer)
                }
                break;
                case 'Ostrzenie-Erodowanie': {
                    const machineName = document.createElement('p'),
                        machineStatus = document.createElement('p');
                    machineName.innerText = machine.name;
                    //this.getStatus(machine, machineStatus);
                    machineTextContainer.appendChild(machineName)
                    machineTextContainer.appendChild(machineStatus)
                    machineContainer.appendChild(machineTextContainer)
                    sharpeningErodingContainer.appendChild(machineContainer)
                }
                break;
                case 'Ostrzenie-Wiertła VHM': {
                    const machineName = document.createElement('p'),
                        machineStatus = document.createElement('p');
                    machineName.innerText = machine.name;
                    // this.getStatus(machine, machineStatus);
                    machineTextContainer.appendChild(machineName)
                    machineTextContainer.appendChild(machineStatus)
                    machineContainer.appendChild(machineTextContainer)
                    drillSharpeningVHMContainer.appendChild(machineContainer)
                }
                break;
                case 'Produkcja-VHM': {
                    const machineName = document.createElement('p'),
                        machineStatus = document.createElement('p');
                    machineName.innerText = machine.name;
                    //this.getStatus(machine, machineStatus);
                    machineTextContainer.appendChild(machineName)
                    machineTextContainer.appendChild(machineStatus)
                    machineContainer.appendChild(machineTextContainer)
                    vhmProductionContainer.appendChild(machineContainer)
                }
                break;
                case 'Produkcja-Korpusy': {
                    const machineName = document.createElement('p'),
                        machineStatus = document.createElement('p');
                    machineName.innerText = machine.name;
                    //this.getStatus(machine, machineStatus);
                    machineTextContainer.appendChild(machineName)
                    machineTextContainer.appendChild(machineStatus)
                    machineContainer.appendChild(machineTextContainer)
                    bodyManufacturerContainer.appendChild(machineContainer)
                }
                break;
                }
            })
        })

    }
    selectTimePeriod() {
        const now = new Date(),
            hour = now.getHours();
        if (hour >= 7 && hour <= 15) {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7)
        } else if (hour >= 15 && hour <= 23) {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15)
        } else if (hour >= 23 || hour <= 7) {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23)
        }


    }
    getData(e) {
        try {
            const isExist = document.querySelector(`.main-machine-panel__container.${e.target.dataset.name}.minimized`)
            if (isExist) {
                isExist.classList.remove('minimized');
                document.querySelector(`button[name=${e.target.dataset.name}]`).remove();
            } else {
                const isExist = document.querySelector(`.main-machine-panel__container`)
                if (!isExist) {
                    const from = new Date(this.selectTimePeriod())

                    const dataToSend = {
                        name: e.target.dataset.name,
                        from: from,
                        to: new Date()
                    };
                    this.createStartPanel(dataToSend)
                }

            }
        } catch (error) {
            console.log(error)
        }

    }
    createStartPanel(dataToSend) {
        const name = dataToSend.name;
        const startPanelWrapper = document.createElement('div'),
            startPanel = document.createElement('div'),
            title = document.createElement('h3'),
            agreeButton = document.createElement('button'),
            cancelButton = document.createElement('button'),
            container = this.currentChangeContainer;

        startPanelWrapper.classList.add('accept__container--wrapper')
        startPanel.classList.add('accept__container')

        agreeButton.classList.add('accept')
        cancelButton.classList.add('cancel')

        title.innerText = `Czy na pewno chcesz wybrać maszynę ${dataToSend.name}?`;
        agreeButton.innerText = 'Tak';
        cancelButton.innerText = 'Nie';

        startPanel.appendChild(title);
        startPanel.appendChild(agreeButton);
        startPanel.appendChild(cancelButton);
        startPanelWrapper.appendChild(startPanel);
        container.appendChild(startPanelWrapper);

        agreeButton.addEventListener('click', () => {
            this.choosenMachine = name;
            const panel = new Panel(name);
            this.createPanel(dataToSend, panel, this.currentChangeContainer, startPanelWrapper);
        })
        cancelButton.addEventListener('click', () => {
            startPanelWrapper.remove();
        })


    }
    createPanel(dataToSend, panel, container, startPanelWrapper) {
        const machineName = dataToSend.name;
        const data = {
            name: machineName
        }
        machines.checkMachineIsLocked(data)
            .then(res => {
                if (res.status == 200) {
                    machines.getAllStatuses(dataToSend).then(res => {
                        this.data = res;
                        this.currentStatus = res.status;
                        panel.data = res;
                        panel.currentStatus = res.status;
                        panel.createMachinePanel(dataToSend, container);
                        panel.createTable(this.data.summary, machineName);
                        panel.createChartJS(this.data.chartJS, machineName, 'bar');
                        this.updateAllStatuses(machineName, panel);
                        this.createChangePanel(machineName, panel);
                        startPanelWrapper.remove();

                        return;
                    })
                    if (res.new) {
                        console.log('Pierwszy raz')
                        message.showMessage('success', res.message)
                        const data = {
                            name: machineName,
                            from: new Date(),
                            to: new Date()
                        };
                        machines.getSummaryStatuses(data)
                            .then(res => {
                                const data = {
                                    name: machineName,
                                    start: new Date(),
                                    end: null,
                                    data: res.data
                                }
                                machines.saveStatusesForUser(data)
                                    .then(res => {
                                        if (res.status == 200) {
                                            message.showMessage('success', res.message)
                                        } else {
                                            message.showMessage('error', res.message)
                                        }
                                    })
                                    return data;
                            })
                            .then((data) => {
                                panel.statsIntervalID = setInterval(() => {
                                    const update = {
                                        name: machineName,
                                        from: data.start,
                                        to: new Date()
                                    };
                                    machines.getSummaryStatuses(update)
                                        .then(res => {
                                            const data = {
                                                name: machineName,
                                                data: res.data
                                            }
                                            machines.updateStatusesForUser(data)
                                        })
                                }, 1000)
                            })



                    } else {
                        console.log('Ponownie')
                        message.showMessage('success', res.message)
                        machines.checkUserStats({
                                name: machineName
                            })
                            .then(stats => {
                                if (stats.exist) {
                                    const data = {
                                        name: machineName,
                                        from: new Date(stats.start),
                                        to: new Date()
                                    }
                                    machines.getSummaryStatuses(data)
                                        .then(res => {
                                            const data = {
                                                name: machineName,
                                                data: res.data
                                            }
                                            machines.updateStatusesForUser(data)
                                                .then(res => {
                                                    if (res.status == 200) {
                                                        message.showMessage('success', res.message)
                                                    } else {
                                                        message.showMessage('error', res.message)
                                                    }
                                                })
                                                .then(() => {
                                                    panel.statsIntervalID = setInterval(() => {
                                                        const update = {
                                                            name: machineName,
                                                            from: new Date(stats.start), //blad, zle bierze date
                                                            to: new Date()
                                                        }
                                                        machines.getSummaryStatuses(update)
                                                            .then(res => {
                                                                const data = {
                                                                    name: machineName,
                                                                    data: res.data
                                                                }
                                                                machines.updateStatusesForUser(data)
                                                            })
                                                    }, 1000);
                                                })
                                        })
                                } else {
                                    const data = {
                                        name: machineName,
                                        from: new Date(),
                                        to: new Date()
                                    };
                                    machines.getSummaryStatuses(data)
                                        .then(res => {
                                            const data = {
                                                name: machineName,
                                                start: new Date(),
                                                end: null,
                                                data: res.data
                                            }
                                            machines.saveStatusesForUser(data)
                                                .then(res => {
                                                    if (res.status == 200) {
                                                        message.showMessage('success', res.message)
                                                    } else {
                                                        message.showMessage('error', res.message)
                                                    }
                                                })
                                        })
                                        .then(() => {
                                            panel.statsIntervalID = setInterval(() => {
                                                const update = {
                                                    name: machineName,
                                                    from: new Date(data.from),
                                                    to: new Date()
                                                }
                                                machines.getSummaryStatuses(update)
                                                    .then(res => {
                                                        const data = {
                                                            name: machineName,
                                                            data: res.data
                                                        }
                                                        machines.updateStatusesForUser(data)
                                                    })
                                            }, 1000);
                                        })
                                }
                            })
                    }
                } else {
                    message.showMessage('error', res.message);
                    startPanelWrapper.remove();
                }

            })

    }
    createChangePanel(name, panel) {
        const now = new Date();
        const morningChangeData = {
                name: name,
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 7),
                to: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 59, 59, 59)
            },
            afternoonChangeData = {
                name: name,
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 15),
                to: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22, 59, 59, 59)
            },
            nightChangeData = {
                name: name,
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23),
                to: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 59, 59, 59)
            };
        machines.getAllStatuses(morningChangeData).then(res => {
            panel.createChangesChartJS(res.chartJS, name, 'bar', 'morning');
            return panel;
        })
        machines.getAllStatuses(afternoonChangeData).then(res => {
            panel.createChangesChartJS(res.chartJS, name, 'bar', 'afternoon');
            return panel;
        })
        machines.getAllStatuses(nightChangeData).then(res => {
            panel.createChangesChartJS(res.chartJS, name, 'bar', 'night');
            return panel;
        })

    }
    updateAllStatuses(name, panel) {
        try {
            this.intervalID = setInterval(() => {
                const dataToSend = {
                    name: name,
                    from: new Date(),
                    to: new Date(),
                    oldData: this.data,
                    lastStatus: this.currentStatus
                };
                machines.updateStatuses(dataToSend).then(res => {
                    this.data = res;
                    panel.currentStatus = res.status;
                    panel.updateChartJS(res, panel.charts.chartJS.chart)
                    panel.updateTable(res.summary, dataToSend.name); //podmienia dane w tabelach jesli sa otwarte conajmniej dwa okna. Bierze dane z ostatnio otwartego
                    panel.updateStatus()
                })
                if (!panel.intervalID) {
                    panel.intervalID = this.intervalID;
                }
            }, 1000)
        } catch (error) {
            console.log(error)
        }

    }
    updateSummaryStatuses(name) {
        try {
            this.intervalID = setInterval(() => {
                const dataToSend = {
                    name: name,
                    from: new Date(),
                    to: new Date(),
                    oldData: this.data,
                    lastStatus: this.currentStatus
                };
                machines.updateStatuses(dataToSend).then(res => {
                    this.data = res;
                    panel.currentStatus = res.status;
                    panel.updateChartJS(res, panel.charts.chartJS.chart)
                    panel.updateTable(res.summary, dataToSend.name); //podmienia dane w tabelach jesli sa otwarte conajmniej dwa okna. Bierze dane z ostatnio otwartego
                    panel.updateStatus()
                })
                if (!panel.intervalID) {
                    panel.intervalID = this.intervalID;
                }
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

}

export default Operator