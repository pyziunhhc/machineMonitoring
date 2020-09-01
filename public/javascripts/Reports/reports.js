import helpers from '../helpers/fetch.js'

class Report {
    constructor() {
        this.data = null;
        this.machines = null;
    }

    button() {
        const container = document.querySelector('.daily__report > .all-machines');
        const button = document.createElement('button');
        button.innerText = 'Pobierz'

        button.addEventListener('click', (e) => {
            this.generateDailyReport()
        })
        container.appendChild(button)
    }

    generateDailyReport() {
        helpers.getMachines()
            .then(data => {
                this.getSummaryStatuses(data).then(data => {
                    console.log(data)
                })

            })
    }
    getSummaryStatuses(machines) {
        const to = new Date(),
            from = new Date(to - 86400000);
        const data = {
            machines: machines.machines,
            from: from,
            to: to
        }
        return fetch('/data/get/reports/daily', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    helpers.showMessage('success', res.message)
                } else {
                    helpers.showMessage('error', res.message)
                }

            })

    }
}

export default Report;