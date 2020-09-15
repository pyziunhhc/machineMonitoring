import message from '../helpers/messages.js'
import machines from '../helpers/fetch/machines.js'
import Movebelt from '../Movebelt/movebelt.js';
class LockedMachines {
    constructor(data, container) {
        this.data = data;
        this.container = container;
    }
    createDOM() {
        if (this.data.message) {
            message.showMessage('error', this.data.message)
        } else if (this.data.machines) {
            const machinesContainerWrapper = document.createElement('div'),
                machinesContainer = document.createElement('div');
            const minimizedPanel = document.querySelector('.minimized-panels');

            const movebelt = new Movebelt(null, machinesContainerWrapper, minimizedPanel, 'Zablokowane maszyny')
            movebelt.create()
            machinesContainerWrapper.classList.add('locked-machines__container--wrapper');
            machinesContainer.classList.add('locked-machines__container');

            this.data.machines.forEach(machine => {
                const machineContainer = document.createElement('div'),
                    machinePicture = document.createElement('img'),
                    machineTextContainer = document.createElement('div');

                const tempShortName = machine.name.split('_')[0],
                    shortName = tempShortName.slice(0, tempShortName.length - 1);
                const machineName = document.createElement('p'),
                    userName = document.createElement('p');
                const unlockButton = document.createElement('button');



                machineContainer.classList.add('panel__element');
                machineTextContainer.classList.add('panel__element--text')
                machinePicture.classList.add('panel__element--img');


                unlockButton.addEventListener('click', () => {
                    const data = {
                        user: machine.user,
                        name: machine.name
                    }
                    machines.unlockMachine(data)
                        .then(res => {
                            if (res.status == 200) {
                                machineContainer.remove();
                                message.showMessage('success', res.message)
                            } else {
                                message.showMessage('error', res.message)
                            }
                        })
                })
                //machineContainer.setAttribute('data-name', machine.name)
                machinePicture.setAttribute('src', `/images/machines/${shortName}.png`)
                machinePicture.setAttribute('alt', 'Zdjęcie maszyny');
                machinePicture.setAttribute('data-name', machine.name);

                userName.innerHTML = `Użytkownik: <span>${machine.user}</span>`;
                machineName.innerText = machine.name;
                unlockButton.innerText = 'Odblokuj';

                machineContainer.appendChild(machinePicture)
                machineTextContainer.appendChild(machineName)
                machineTextContainer.appendChild(userName)
                machineContainer.appendChild(machineTextContainer)
                machineContainer.appendChild(unlockButton)
                machinesContainer.appendChild(machineContainer)
                machinesContainerWrapper.appendChild(machinesContainer)
            })
            this.container.appendChild(machinesContainerWrapper);
        }

    }
}

export default LockedMachines;