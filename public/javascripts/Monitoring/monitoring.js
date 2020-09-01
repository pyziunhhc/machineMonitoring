import Menu from '../Menu/menu.js';
import helpers from '../helpers/fetch.js'
import Panel from './panel.js'
window.onload = function () {
    const MENU = new Menu();
    MENU.hideMenu();
    MENU.showSettings()
    const MONITORING = new Monitoring();
    MONITORING.createDOM();
}

class Monitoring {
    constructor() {
        this.chartJS = null;
        this.table = null;
        this.dygraph = null;
        this.data = null;
        this.currentStatus = null;
        this.intervalID = null;
    }
    createDOM() {
        const monitoringContainer = document.querySelector('.monitoring__container');

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
        monitoringContainer.appendChild(containerForMachines);


        helpers.getMachines().then(data => {
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
                machinePicture.addEventListener('click', this.getStatuses.bind(this));
                switch (machine.type) {
                    case 'Produkcja-Erodowanie': {
                        const machineName = document.createElement('p');
                        machineName.innerText = machine.name;
                        machineTextContainer.appendChild(machineName)
                        machineContainer.appendChild(machineTextContainer)
                        productionErodingContainer.appendChild(machineContainer)
                    }
                    break;
                case 'Ostrzenie-VHM': {
                    const machineName = document.createElement('p');
                    machineContainer.appendChild(machineName)
                    machineName.innerText = machine.name;
                    sharpeningVHMContainer.appendChild(machineContainer)
                }
                break;
                case 'Ostrzenie-Erodowanie': {
                    const machineName = document.createElement('p');
                    machineContainer.appendChild(machineName)
                    machineName.innerText = machine.name;
                    sharpeningErodingContainer.appendChild(machineContainer)
                }
                break;
                case 'Ostrzenie-Wiertła VHM': {
                    const machineName = document.createElement('p');
                    machineContainer.appendChild(machineName)
                    machineName.innerText = machine.name;
                    drillSharpeningVHMContainer.appendChild(machineContainer)
                }
                break;
                case 'Produkcja-VHM': {
                    const machineName = document.createElement('p');
                    machineContainer.appendChild(machineName)
                    machineName.innerText = machine.name;
                    vhmProductionContainer.appendChild(machineContainer)
                }
                break;
                case 'Produkcja-Korpusy': {
                    const machineName = document.createElement('p');
                    machineContainer.appendChild(machineName)
                    machineName.innerText = machine.name;
                    bodyManufacturerContainer.appendChild(machineContainer)
                }
                break;
                }
            })
        })

    }


    getStatuses(e) {
        const dataToSend = {
            name: e.target.dataset.name,
            from: new Date(new Date() - 86400000),
            to: new Date()
        };
        const panel = new Panel();
        helpers.getStatuses(dataToSend).then(res => {
            panel.data = res;
            panel.currentStatus = res.currentStatus;

            panel.createMachinePanel(dataToSend, dataToSend.name);
            panel.createDygraph(res.dygraph, dataToSend.name);
            panel.createTable(res.summary, dataToSend.name)
            panel.createChartJS(res.chartJS, dataToSend.name, 'pie');

            return panel;
        }).then(panel => {
            //this.updateStatuses(dataToSend.name, panel);
        })
    }
    updateStatuses(name, panel) {
        this.intervalID = setInterval(() => {
            const dataToSend = {
                name: name,
                from: new Date(),
                to: new Date(),
                oldData: this.data,
                lastStatus: this.currentStatus
            };
            helpers.updateStatuses(dataToSend).then(res => {
                //this.data = res;
                //this.currentStatus = res.status;

                panel.data = res;
                panel.currentStatus = res.status;
                //console.log(res)
                // panel.updateDygraph(res, panel.dygraph)
                // panel.updateChartJS(res, panel.chartJS)
                panel.updateTable(res.summary, dataToSend.name); //podmienia dane w tabelach jesli sa otwarte conajmniej dwa okna. Bierze dane z ostatnio otwartego
            })
        }, 1000)
        panel.intervalID = this.intervalID
    }
}