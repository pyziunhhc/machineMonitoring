import reports from '../helpers/fetch/reports.js'
import machines from '../helpers/fetch/machines.js'
import messages from '../helpers/messages.js';
/**
 *
 * TODO:
 * poprawić przesłanie daty, problem z formatowaniem ISOString --- OK
 * dodać powiadomienie o dacie, jeśli jest nowsza niż dziś --- OK
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

        const index = parseInt(e.target.value),
            year = new Date().getFullYear(),
            month = index >= 10 ? index : '0' + index,
            from = '0' + e.target[index - 1].dataset.from,
            to = e.target[index - 1].dataset.to;
        this._monthly._from = new Date(`${year}-${month}-${from}T00:00:00`);
        this._monthly._to = new Date(`${year}-${month}-${to}T23:59:59`);
        console.log(this._monthly._from, this._monthly._to)
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
                    this.createLoadingText()
                    reports.createXLSX({

                            machines: this._selectedMachines,
                            from,
                            to
                        })
                        .then(res => {
                            this.createExcel(res, `Statystyki wybranych maszyn ${from.toLocaleDateString()}-${to.toLocaleDateString()}`)
                        })
                }

            }

        } else {
            if (this._monthly._from.getTime() > new Date().getTime() || this._monthly._to.getTime() > new Date().getTime()) {
                messages.showMessage('error', [`Nie możesz wybrać miesiąca nowszego niż bieżący.`])
            } else {
                this.createLoadingText()
                reports.createXLSX({
                        machines: this._allMachines,
                        from,
                        to,
                    })
                    .then(res => {
                        this.createExcel(res, `Statystyki wszystkich maszyn ${from.toLocaleDateString()}-${to.toLocaleDateString()}`)
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
                this.createLoadingText()
                reports.createXLSX({
                        machines: this._selectedMachines,
                        from,
                        to
                    })
                    .then(res => {
                        this.createExcel(res, `Statystyki wybranych maszyn ${from.toLocaleDateString()}-${to.toLocaleDateString()}`)
                    })
            }


        } else {
            this.createLoadingText()
            reports.createXLSX({
                    machines: this._allMachines,
                    from,
                    to,
                })
                .then(res => {
                    this.createExcel(res, `Statystyki wszystkich maszyn ${from.toLocaleDateString()}-${to.toLocaleDateString()}`)
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
                    this.createLoadingText()
                    reports.createXLSX({
                            machines: this._selectedMachines,
                            from,
                            to
                        })
                        .then(res => {
                            this.createExcel(res, `Statystyki wybranych maszyn ${from.toLocaleDateString()}-${to.toLocaleDateString()}`)
                        })
                }
            } else {
                this.createLoadingText()
                reports.createXLSX({
                        machines: this._allMachines,
                        from,
                        to,
                    })
                    .then(res => {
                        this.createExcel(res, `Statystyki wszystkich maszyn ${from.toLocaleDateString()}-${to.toLocaleDateString()}`)
                    })

            }
        }

    }
    async createExcel(res, fileName) {
        //console.log(this)
        if (res.status == 200) {
            let workbook = new ExcelJS.Workbook();
            res.data.forEach(json => {
                let worksheet = workbook.addWorksheet(json.machineName);
                worksheet.columns = [{
                        header: 'Status',
                        key: 'status',
                        width: 20,
                        style: {
                            font: {
                                bold: true
                            }
                        }

                    },
                    {
                        header: 'Czas',
                        key: 'time',
                        width: 20,

                    },
                    {
                        header: '%',
                        key: 'percentage',
                        width: 20,

                    },
                ];
                worksheet.getRow(1).font = {
                    bold: true,
                    size: 16
                }
                json.data.forEach((data, index) => {
                    worksheet.addRow({
                        status: data.status,
                        time: data.time,
                        percentage: data.percentage
                    })
                })
                worksheet._rows.forEach(row => {
                    row._cells.forEach(cell => {
                        cell.border = {
                            top: {
                                style: 'thin'
                            },
                            right: {
                                style: 'thin'
                            },
                            bottom: {
                                style: 'thin'
                            },
                            left: {
                                style: 'thin'
                            },
                        }
                        // cell.fill = {
                        //     type: 'pattern',
                        //     pattern: 'none',
                        //     fgColor: {
                        //         argb: data.colors.argb
                        //     }
                        // }

                    })
                })
            })

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            saveAs(blob, `${fileName}.xlsx`)
            messages.showMessage('success', ['Zapisano plik'])




        }
    }
    createLoadingText() {
        const isExist = document.querySelector('.loading')
        if (isExist) {
            isExist.remove();
            this.createLoadingText()
        } else {
            const loadingText = document.createElement('p'),
                container = document.querySelector('.main__container');
            loadingText.innerText = 'ŁADOWANIE'
            loadingText.classList.add('loading')
            container.appendChild(loadingText)
        }

    }
}

export default Report;