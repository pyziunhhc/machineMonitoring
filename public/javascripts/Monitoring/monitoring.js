import machines from '../helpers/fetch/machines.js'
import Panel from '../Panel/panel.js';
window.onload = function () {
    const monitoringContainer = document.querySelector('.monitoring__container');
    const MONITORING = new Monitoring(monitoringContainer);
    MONITORING.createDOM();
}

class Monitoring extends Panel {
    constructor(container) {
        super(container, null, null, null, null, 'monitoring')
        this._data = null;
        this._currentStatus = null;
        this.intervals = {
            _statsID: null,
            _currentID: null,
        };
        this._container = container;
    }
    createDOM() {
        //Kontenery
        const containerForMachines = document.createElement('div'),
            productionErodingContainer = document.createElement('div'),
            sharpeningVHMContainer = document.createElement('div'),
            sharpeningErodingContainer = document.createElement('div'),
            drillSharpeningVHMContainer = document.createElement('div'),
            vhmProductionContainer = document.createElement('div'),
            bodyManufacturerContainer = document.createElement('div');
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
        this._container.appendChild(containerForMachines);


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

    getStatus(machine, status) {
        const dataToSend = {
            name: machine.name,
            from: new Date(),
            to: new Date()
        };
        setInterval(() => {
            machines.getAllStatuses(dataToSend).then(res => {
                //status.classList.add(res.status.toLowerCase())
                status.innerText = res.status;
            })
        }, 1000);

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
                    const data = {
                        name: e.target.dataset.name,
                        from: new Date(new Date() - 86400000),
                        to: new Date()
                    };
                    this._machineName = data.name;
                    machines.getAllStatuses(data).then(json => {
                        this._data = json;
                        this._currentStatus = json.status;
                        this.createCurrentChangePanel();
                        this.createChangesPanel(this._machineName);
                        this.createDygraph(json.dygraph, this._machineName);
                        this.createTable(json.summary, this._machineName)
                        this.createChartJS(json.chartJS, this._machineName, 'bar');

                    }).then(() => {
                        this.updateStatuses();
                    })
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
    updateStatuses() {
        try {
            this.intervals._currentID = setInterval(() => {
                const data = {
                    name: this._machineName,
                    from: new Date(),
                    to: new Date(),
                    oldData: this._data,
                    lastStatus: this._currentStatus
                };
                machines.updateStatuses(data).then(json => {
                    this._data = json;
                    this._currentStatus = json.status;
                    this.lastStatus = data.lastStatus;
                    this.updateDygraph(json.dygraph);
                    this.updateChartJS(json.chartJS);
                    this.updateTable(json.summary, data.name); //podmienia dane w tabelach jesli sa otwarte conajmniej dwa okna. Bierze dane z ostatnio otwartego
                    this.updateStatus();
                })
            }, 1000);



        } catch (error) {
            console.log(error)
        }
    }
}

export default Monitoring;