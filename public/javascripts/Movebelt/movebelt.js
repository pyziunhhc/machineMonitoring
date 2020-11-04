import helpers from '../helpers/auxiliaryFunctions.js'
import machines from '../helpers/fetch/machines.js';
import message from '../helpers/messages.js';
import stats from '../helpers/fetch/stats.js'
class Movebelt {
    constructor(machineName = null, panelContainer, minimizedPanelContainer, title, place, intervalID = null, statsIntervalID = null) {
        this._title = title;
        this._machineName = machineName;
        this._panelContainer = panelContainer;
        this._minimizedPanelContainer = minimizedPanelContainer;
        this._place = place;
        this._intervalID = intervalID;
        this._statsIntervalID = statsIntervalID;
    }
    create() {
        const moveContainerBeam = document.createElement('div'),
            title = document.createElement('h3'),
            controls = document.createElement('div'),
            closePanelButton = document.createElement('button'),
            minimizedPanel = document.createElement('button'),
            minimizePanelButton = document.createElement('button');

        closePanelButton.innerText = 'X';
        minimizedPanel.innerText = this._title;
        title.innerText = this._title;
        minimizedPanel.setAttribute('name', this._machineName)

        moveContainerBeam.classList.add('move-belt');
        closePanelButton.classList.add('close');
        minimizePanelButton.classList.add('minimize');
        controls.classList.add('controls');

        moveContainerBeam.onmousedown = helpers.dragMouseDown.bind(null, this, this._panelContainer);
        minimizePanelButton.addEventListener('click', (e) => {
            this._panelContainer.classList.add('minimized');
            this._minimizedPanelContainer.appendChild(minimizedPanel);
        });
        closePanelButton.addEventListener('click', this.close.bind(this))
        minimizedPanel.addEventListener('click', (e) => {
            this._panelContainer.classList.remove('minimized');
            minimizedPanel.remove();
        })
        moveContainerBeam.appendChild(title)
        moveContainerBeam.appendChild(controls);
        controls.appendChild(minimizePanelButton);
        controls.appendChild(closePanelButton);

        this._panelContainer.appendChild(moveContainerBeam);
    }
    close(){
        if (this._place === 'operator') {
            machines.unlockMachine({
                name: this._machineName
            }).then(res => {
                if (res.status == 200) {
                    stats.lockStatusesForUser({
                        name: this._machineName
                    })
                } else {

                }
                clearInterval(this._intervalID)
                clearInterval(this._statsIntervalID)
            })
        } else {
            clearInterval(this._intervalID)
            this._panelContainer.remove();
        }
        this._panelContainer.remove();
    }
}

export default Movebelt