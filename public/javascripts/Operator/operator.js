import Panel from '../Panel/panel.js';
import machines from '../helpers/fetch/machines.js';
import stats from '../helpers/fetch/stats.js';
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

class Operator extends Panel {
    constructor(currentChangeContainer, morningContainer, afternoonContainer, nightContainer) {
        //poparwić  pola klasy
        super(currentChangeContainer, morningContainer, afternoonContainer, nightContainer, null, 'operator')
        this._userData = null;
        this._data = null;
        this._currentStatus = null;
        this.intervals = {
            _statsID: null,
            _currentID: null,
        };
        this._containers = {
            currentChangeContainer: currentChangeContainer,
        };
        this._choosenMachine = null;
        this._statsID = null;
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
            monitoringContainer = this._containers.currentChangeContainer;
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
    createStartPanel(data) {
        const name = data.name;
        const startPanelWrapper = document.createElement('div'),
            startPanel = document.createElement('div'),
            title = document.createElement('h3'),
            agreeButton = document.createElement('button'),
            cancelButton = document.createElement('button'),
            container = this._containers.currentChangeContainer;
        startPanelWrapper.classList.add('accept__container--wrapper')
        startPanel.classList.add('accept__container')

        agreeButton.classList.add('accept')
        cancelButton.classList.add('cancel')

        title.innerText = `Czy na pewno chcesz wybrać maszynę ${name}?`;
        agreeButton.innerText = 'Tak';
        cancelButton.innerText = 'Nie';

        startPanel.appendChild(title);
        startPanel.appendChild(agreeButton);
        startPanel.appendChild(cancelButton);
        startPanelWrapper.appendChild(startPanel);
        container.appendChild(startPanelWrapper);

        agreeButton.addEventListener('click', () => {
            this._choosenMachine = name;
            this._machineName = name;
            this.createPanel(data, this._containers.currentChangeContainer, startPanelWrapper);
        })
        cancelButton.addEventListener('click', () => {
            startPanelWrapper.remove();
        })


    }
    createPanel(dataToSend, container, startPanelWrapper) {
        const machineName = dataToSend.name;
        const data = {
            name: machineName
        }
        machines.checkMachineIsLocked(data)
            .then(locked => {
                if (locked.status == 200) {
                    machines.getAllStatuses(dataToSend)
                        .then(json => {
                            this._data = json;
                            this._currentStatus = json.status;
                            this.createCurrentChangePanel();
                            this.createTable(this._data.summary, machineName);
                            this.createChartJS(this._data.chartJS, machineName, 'bar');
                            this.updateAllStatuses(machineName);
                            this.createChangesPanel(machineName);
                            startPanelWrapper.remove();
                            return;
                        })
                        .then(() => {
                            if (locked.new) {
                                const data = {
                                    name: this._machineName,
                                    from: new Date(),
                                    to: new Date(),
                                }
                                stats.checkUserStats({
                                        name: this._machineName
                                    })
                                    .then(json => {
                                        if (json.exist) {
                                            this.updateSummaryStatuses({
                                                data: json.data
                                            });
                                        } else {
                                            this.saveUserStats(data);
                                            this.updateSummaryStatuses();
                                        }
                                    })
                            } else {
                                const data = {
                                    name: this._machineName,
                                    from: new Date(),
                                    to: new Date(),
                                }
                                stats.checkUserStats({
                                        name: this._machineName
                                    })
                                    .then(json => {
                                        if (json.exist) {
                                            this.updateSummaryStatuses({
                                                data: json.data
                                            });
                                        } else {
                                            this.saveUserStats(data);
                                            this.updateSummaryStatuses();
                                        }
                                    })
                            }
                        })

                } else {
                    message.showMessage('error', res.message);
                    startPanelWrapper.remove();
                }

            })

    }

    updateAllStatuses(name) {
        try {
            this.intervals._currentID = setInterval(() => {
                const dataToSend = {
                    name: name,
                    from: new Date(),
                    to: new Date(),
                    oldData: this._data,
                    lastStatus: this._currentStatus
                };
                machines.updateStatuses(dataToSend)
                    .then(json => {
                        this._data = json;
                        this._currentStatus = json.status;
                        this.updateChartJS(json.chartJS)
                        this.updateTable(json.summary, dataToSend.name); //podmienia dane w tabelach jesli sa otwarte conajmniej dwa okna. Bierze dane z ostatnio otwartego
                        this.updateStatus()
                    })
            }, 1000)
        } catch (error) {
            console.log(error)
        }

    }
    updateSummaryStatuses(data) {
        try {
            this.intervals._statsID = setInterval(() => {
                if (!this._userData) {
                    this._userData = data;
                }
                if (this._userData) {
                    const dataToSend = {
                        name: this._machineName,
                        from: new Date(),
                        to: new Date(),
                        oldData: this._userData,
                        lastStatus: this._currentStatus
                    };
                    machines.updateSummaryStatuses(dataToSend)
                        .then(json => {
                            this._userData = json.update;
                            this._currentStatus = json.status;
                            this.updateUserStats({
                                name: this._machineName,
                                data: json.update
                            })
                        })
                }

            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    saveUserStats(data) {
        machines.getSummaryStatuses(data)
            .then(json => {
                const toSave = {
                    name: json.name,
                    data: json.data,
                    start: data.from,
                }
                this._userData = json.data;

                stats.saveStatusesForUser(toSave)
                    .then(res => {})
            })
    }
    updateUserStats(data) {
        const toSave = {
            name: this._machineName,
            data: data.data,
            start: data.start,
        }
        stats.updateStatusesForUser(toSave)
            .then(res => {
                if (!this._statsID) {
                    this._statsID = res.statsID;
                }
            })
    }

}

export default Operator