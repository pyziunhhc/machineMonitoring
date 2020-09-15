import message from '../helpers/messages.js'
import machines from '../helpers/fetch/machines.js'
class LockedMachines {
    constructor(machines, container) {
        this.data = machines;
        this.container = container;
    }
    createDOM() {
        if (this.data.message) {
            message.showMessage('error', this.data.message)
        } else if (this.data.machines) {
            const machinesContainer = document.createElement('div');
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


                machineContainer.classList.add('monitoring__element');
                machineTextContainer.classList.add('monitoring__element--text')
                machinePicture.classList.add('monitoring__element--img');


                unlockButton.addEventListener('click', () => {
                    const data = {
                        user: machine.user,
                        name: machine.name
                    }
                    machines.unlockMachine(data)
                        .then(res => {
                            if (res.status == 200) {
                                message.showMessage('success', res.message)
                            } else {
                                message.showMessage('error', res.message)
                            }
                        })
                })

                machinePicture.setAttribute('src', `/images/machines/${shortName}.png`)
                machinePicture.setAttribute('alt', 'Zdjęcie maszyny');
                machinePicture.setAttribute('data-name', machine.name);

                userName.innerText = machine.user;
                machineName.innerText = machine.name;
                unlockButton.innerText = 'Odblokuj';

                machineContainer.appendChild(machinePicture)
                machineTextContainer.appendChild(machineName)
                machineTextContainer.appendChild(userName)
                machineContainer.appendChild(machineTextContainer)
                machineContainer.appendChild(unlockButton)
                machinesContainer.appendChild(machineContainer)
            })
            this.container.appendChild(machinesContainer);
        }

    }
}

export default LockedMachines;