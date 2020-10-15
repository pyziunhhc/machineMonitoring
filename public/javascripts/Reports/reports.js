import machines from '../helpers/fetch/machines.js'
import messages from '../helpers/messages.js';
/**
 *
 * TODO:
 * poprawić przesłanie daty, problem z formatowaniem ISOString --- OK
 * dodać powiadomienie o dacie, jeśli jest nowsza niż dziś
 */
const months = [{
    name: 'Styczeń',
    from: 1,
    to: 31
}, {
    name: 'Luty',
    from: 1,
    to: 28
}, {
    name: 'Marzec',
    from: 1,
    to: 31
}, {
    name: 'Kwiecień',
    from: 1,
    to: 30
}, {
    name: 'Maj',
    from: 1,
    to: 31
}, {
    name: 'Czerwiec',
    from: 1,
    to: 30
}, {
    name: 'Lipiec',
    from: 1,
    to: 31
}, {
    name: 'Sierpień',
    from: 1,
    to: 31
}, {
    name: 'Wrzesień',
    from: 1,
    to: 30
}, {
    name: 'Październik',
    from: 1,
    to: 31
}, {
    name: 'Listopad',
    from: 1,
    to: 30
}, {
    name: 'Grudzień',
    from: 1,
    to: 31
}, ]
class Report {
    constructor(select, machinesContainer) {
        this._select = select;
        this._machinesContainer = machinesContainer;
        this._allMachines = [];
        this._selectedMachines = [];
        this._monthly = {
            _from: new Date(),
            _to: new Date()
        };
        this._daily = {
            _from: new Date(),
            _to: new Date()
        }
        this.completeTheDates();
        this.getMachines();
    }
    completeTheDates() {
        this._select.forEach((select, index) => {
            for (let i = 1; i < 13; i++) {
                const option = document.createElement('option');
                option.innerText = months[i - 1].name;
                option.value = i;
                option.setAttribute('data-from', months[i - 1].from);
                option.setAttribute('data-to', months[i - 1].to);
                if (i == 1) {
                    const year = new Date().getFullYear(),
                        month = i > 10 ? i : '0' + i,
                        from = months[i - 1].from > 10 ? months[i - 1].from : '0' + months[i - 1].from,
                        to = months[i - 1].to > 10 ? months[i - 1].to : '0' + months[i - 1].to;
                    this._monthly._from = new Date(`${year}-${month}-${from}T00:00:00`);
                    this._monthly._to = new Date(`${year}-${month}-${to}T23:59:59`);
                }
                select.appendChild(option)
            }

            select.addEventListener('change', e => {
                this.selectTimePeriod(e)
            })

        });

    }
    getMachines() {
        this._machinesContainer.forEach((container, index) => {
            machines.getMachines()
                .then(json => {
                    const sortedMachines = json.machines.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                    sortedMachines.forEach(machine => {
                        const input = document.createElement('input'),
                            label = document.createElement('label');

                        index == 0 ? this._allMachines.push(machine) : null;
                        input.setAttribute('type', 'checkbox');
                        input.setAttribute('name', machine.name);
                        input.setAttribute('value', machine.name);
                        input.classList.add('machine')


                        label.innerText = machine.name;
                        label.setAttribute('for', machine.name);
                        label.appendChild(input);
                        container.appendChild(label);
                        // input.addEventListener('click', e => {
                        //     this.selectMachine(e)
                        // })

                        //input.addEventListener('click', this.selectMachine.bind(this))
                    })
                })
        })

    }
    selectTimePeriod(e) {
        const index = e.target.value,
            year = new Date().getFullYear(),
            month = index > 10 ? index : '0' + index,
            from = e.target[index - 1].dataset.from > 10 ? e.target[index - 1].dataset.from : '0' + e.target[index - 1].dataset.from,
            to = e.target[index - 1].dataset.to > 10 ? e.target[index - 1].dataset.to : '0' + e.target[index - 1].dataset.to;
        this._monthly._from = new Date(`${year}-${month}-${from}T00:00:00`);
        this._monthly._to = new Date(`${year}-${month}-${to}T23:59:59`);
    }
    getMonthSummaryStatuses(type) {
        const from = new Date(this._monthly._from),
            to = new Date(this._monthly._to);
        if (type == 'selected') {
            const selectedMachines = document.querySelectorAll('input.machine:checked');
            this._selectedMachines = [];
            if (selectedMachines.length == 0) {
                messages.showMessage('error', ['Musisz wybrać przynajmniej jedną maszynę'])
            } else {
                selectedMachines.forEach(machine => {
                    this._selectedMachines.push({
                        name: machine.value
                    })
                })
                if (this._monthly._from.getTime() > new Date().getTime() || this._monthly._to.getTime() > new Date().getTime()) {
                    messages.showMessage('error', [`Nie możesz wybrać miesiąca nowszego niż bieżący.`])
                } else {
                    machines.createXLSX({
                            machines: this._selectedMachines,
                            from,
                            to
                        })
                        .then(res => {
                            if (res.status == 200) {
                                messages.showMessage('success', res.message)
                            }
                        })
                }

            }

        } else {
            if (this._monthly._from.getTime() > new Date().getTime() || this._monthly._to.getTime() > new Date().getTime()) {
                messages.showMessage('error', [`Nie możesz wybrać miesiąca nowszego niż bieżący.`])
            } else {
                machines.createXLSX({
                        machines: this._allMachines,
                        from,
                        to,
                    })
                    .then(res => {
                        if (res.status == 200) {
                            messages.showMessage('success', res.message)
                        }
                    })

            }


        }
    }
    getDailySummaryStatuses(type) {
        const now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
            day = now.getDate(),
            from = new Date(`${year}-${month}-${day-1}`),
            to = new Date(`${year}-${month}-${day}`);

        if (type == 'selected') {
            const selectedMachines = document.querySelectorAll('input.machine:checked');
            this._selectedMachines = [];
            if (selectedMachines.length == 0) {
                messages.showMessage('error', ['Musisz wybrać przynajmniej jedną maszynę']);
            } else {
                selectedMachines.forEach(machine => {
                    this._selectedMachines.push({
                        name: machine.value
                    })
                })

                machines.createXLSX({
                        machines: this._selectedMachines,
                        from,
                        to
                    })
                    .then(res => {
                        if (res.status == 200) {
                            messages.showMessage('success', res.message);
                        }
                    })
            }


        } else {
            machines.createXLSX({
                    machines: this._allMachines,
                    from,
                    to,
                })
                .then(res => {
                    if (res.status == 200) {
                        messages.showMessage('success', res.message)
                    }
                })

        }
    }
    getAnySummaryStatuses(type) {
        const from = new Date(document.querySelector('input[name="from"]').value),
            to = new Date(document.querySelector('input[name="to"]').value);
        if (from.getTime() > to.getTime()) {
            messages.showMessage('error', ['Data od nie może być większa niż data do!'])
        } else if (from == 'Invalid Date' || to == 'Invalid Date') {
            messages.showMessage('error', ['Musisz wybrać datę od-do!'])
        } else {
            if (type == 'selected') {
                const selectedMachines = document.querySelectorAll('input.machine:checked');
                this._selectedMachines = [];
                if (selectedMachines.length == 0) {
                    messages.showMessage('error', ['Musisz wybrać przynajmniej jedną maszynę']);
                } else {
                    selectedMachines.forEach(machine => {
                        this._selectedMachines.push({
                            name: machine.value
                        })
                    })

                    machines.createXLSX({
                            machines: this._selectedMachines,
                            from,
                            to
                        })
                        .then(res => {
                            if (res.status == 200) {
                                messages.showMessage('success', res.message);
                            }
                        })
                }
            } else {
                machines.createXLSX({
                        machines: this._allMachines,
                        from,
                        to,
                    })
                    .then(res => {
                        if (res.status == 200) {
                            messages.showMessage('success', res.message)
                        }
                    })

            }
        }

    }
}

export default Report;