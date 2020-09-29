import machines from '../helpers/fetch/machines.js';
import table from '../Table/table.js';
import message from '../helpers/messages.js';
import Table from '../Table/table.js';

window.onload = function () {
    const stats = new Stats()
    stats.getStats()
}

class Stats {
    constructor(type) {
        this.type = type
    }
    getStats() {
        const button = document.querySelector('button.choose-machine');
        button.addEventListener('click', () => {
            const start = new Date(document.querySelector('input[name="start"]').value),
                end = new Date(document.querySelector('input[name="end"]').value);

            machines.showUserStats({
                    start,
                    end
                })
                .then(res => {
                    if (res.status == 200) {
                        this.renderStats(res.data)
                    } else {
                        message.showMessage('error', res.message)

                    }

                })

        })

    }
    renderStats(stats) {
        const parent = document.querySelector('.stats'),
            isExist = document.querySelectorAll('.machine-stats__container');
        if (isExist) {
            isExist.forEach(element => {
                element.remove()
            })
        }
        stats.forEach(stat => {
            const container = document.createElement('div'),
                titleContainer = document.createElement('h2'),
                startContainer = document.createElement('h3'),
                endContainer = document.createElement('h3'),
                informationContainer = document.createElement('div');
            const start = new Date(stat.start),
                end = new Date(stat.end);

            container.classList.add('machine-stats__container');
            informationContainer.classList.add('information')
            titleContainer.innerText = stat.machine;
            startContainer.innerText = `${start.toLocaleDateString()} | ${start.toLocaleTimeString()}`;
            endContainer.innerText = `${end.toLocaleDateString()} | ${end.toLocaleTimeString()}`;
            informationContainer.appendChild(titleContainer)
            informationContainer.appendChild(startContainer)
            informationContainer.appendChild(endContainer)
            container.appendChild(informationContainer)

            const table = new Table(stat.data, stat.machine);
            table.create(container);
            parent.appendChild(container)
        });
    }
}

export default Stats