import helpers from '../helpers/auxiliaryFunctions.js'
import machines from '../helpers/fetch/machines.js';
import message from '../helpers/messages.js';

class Movebelt {
    constructor(machineName = null, panelContainer, minimizedPanelContainer, title, place, intervalID = null, statsIntervalID) {
        this.title = title;
        this.machineName = machineName;
        this.panelContainer = panelContainer;
        this.minimizedPanelContainer = minimizedPanelContainer;
        this.place = place;
        this.intervalID = intervalID;
        this.statsIntervalID = statsIntervalID
    }
    create() {
        const moveContainerBeam = document.createElement('div'),
            title = document.createElement('h3'),
            controls = document.createElement('div'),
            closePanelButton = document.createElement('button'),
            minimizedPanel = document.createElement('button'),
            minimizePanelButton = document.createElement('button');

        closePanelButton.innerText = 'X';
        minimizedPanel.innerText = this.title;
        title.innerText = this.title;
        minimizedPanel.setAttribute('name', this.machineName)

        moveContainerBeam.classList.add('move-belt');
        closePanelButton.classList.add('close');
        minimizePanelButton.classList.add('minimize');
        controls.classList.add('controls');

        moveContainerBeam.onmousedown = helpers.dragMouseDown.bind(null, this, this.panelContainer);
        minimizePanelButton.addEventListener('click', (e) => {
            this.panelContainer.classList.add('minimized');
            this.minimizedPanelContainer.appendChild(minimizedPanel);
        });
        closePanelButton.addEventListener('click', (e) => {
            if (this.place === 'operator') {
                machines.unlockMachine({
                    name: this.machineName
                }).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        message.showMessage('success', res.message)
                        machines.lockStatusesForUser({
                            name: this.machineName
                        })
                    } else {
                        message.showMessage('error', res.message)
                    }
                    clearInterval(this.intervalID)
                    clearInterval(this.statsIntervalID)
                })
            } else {
                clearInterval(this.intervalID)
                this.panelContainer.remove();
            }
            this.panelContainer.remove();
        })
        minimizedPanel.addEventListener('click', (e) => {
            this.panelContainer.classList.remove('minimized');
            minimizedPanel.remove();
        })
        moveContainerBeam.appendChild(title)
        moveContainerBeam.appendChild(controls);
        controls.appendChild(minimizePanelButton);
        controls.appendChild(closePanelButton);

        this.panelContainer.appendChild(moveContainerBeam);
    }
}

export default Movebelt