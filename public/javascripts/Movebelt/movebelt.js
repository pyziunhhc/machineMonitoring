import helpers from '../helpers/auxiliaryFunctions.js'
import machines from '../helpers/fetch/machines.js';
import message from '../helpers/messages.js';

class Movebelt {
    constructor(machineName = null, panelContainer, minimizedPanelContainer, title) {
        this.title = title;
        this.machineName = machineName;
        this.panelContainer = panelContainer;
        this.minimizedPanelContainer = minimizedPanelContainer;
    }
    create(intervalID) {
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
            if (this.machineName) {
                machines.unlockMachine({
                    name: this.machineName
                }).then(res => {
                    if (res.status == 200) {
                        message.showMessage('success', res.message)
                    } else {
                        message.showMessage('error', res.message)
                    }
                    clearInterval(intervalID)
                })
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