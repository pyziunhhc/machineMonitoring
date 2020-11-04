import helpers from '../helpers/auxiliaryFunctions.js';
class Table {
    constructor(data, name, container) {
        this._data = data;
        this._name = name;
        this._sumOfTimes = data.sumOfTimes.data.time;
        this._table = null;
        this._container = container;
    }
    create() {
        try {
            let statusesName = ['Status'],
                statusesValues = ['Czas'],
                statusesPercent = [''],
                statusesClass = ['status'],
                table = document.createElement('table'),
                sumOfTimes = this._sumOfTimes;
            Object.values(this._data)
                .filter(_data => {
                    return _data.data.time > 0
                })
                .forEach(_data => {
                    statusesName.push(_data.displayName);
                    statusesClass.push(_data.className);
                    statusesValues.push(helpers.parseMillisecondsIntoReadableTime(_data.data.time));
                    statusesPercent.push(((_data.data.time * 100) / sumOfTimes).toFixed(2));
                })
            table.classList.add(this._name);
            for (let i in statusesName) {
                let row = table.insertRow(i);
                for (let j = 0; j < 3; j++) {
                    if (j === 0) {
                        let cell = row.insertCell(j);
                        cell.innerText = statusesName[i];
                        cell.classList.add(statusesClass[i])
                    } else if (j === 1) {
                        let cell = row.insertCell(j);
                        cell.innerText = statusesValues[i];
                        cell.classList.add(statusesClass[i])
                    } else if (j === 2) {
                        let cell = row.insertCell(j);
                        cell.innerText = `${statusesPercent[i]}%`;
                        cell.classList.add(statusesClass[i])
                    }
                }
            }
            this._container.appendChild(table)
            this._table = table;

        } catch (e) {
            console.log(e)
        }
    };
    update(data) {
        try {
            let statusesName = ['Status'],
                statusesValues = ['Czas'],
                statusesPercent = [''],
                statusesClass = ['status'],
                table = document.createElement('table'),
                sumOfTimes = this._sumOfTimes;
            const oldTable = document.querySelector(`.statuses-panel__container.${this._name} > table.${this._name}`);
            Object.values(data)
                .filter(val => {
                    return val.data.time > 0;
                })
                .map(val => {
                    statusesName.push(val.displayName);
                    statusesClass.push(val.className);
                    statusesValues.push(helpers.parseMillisecondsIntoReadableTime(val.data.time));
                    statusesPercent.push(((val.data.time * 100) / sumOfTimes).toFixed(2));
                })

            table.classList.add(this._name);
            for (let i in statusesName) {
                let row = table.insertRow(i);
                for (let j = 0; j < 3; j++) {
                    if (j === 0) {
                        let cell = row.insertCell(j);
                        cell.innerText = statusesName[i];
                        cell.classList.add(statusesClass[i])
                    } else if (j === 1) {
                        let cell = row.insertCell(j);
                        cell.innerText = statusesValues[i];
                        cell.classList.add(statusesClass[i])
                    } else if (j === 2) {
                        let cell = row.insertCell(j);
                        cell.innerText = `${statusesPercent[i]}%`;
                        cell.classList.add(statusesClass[i])
                    }
                }
            }
            this._container.replaceChild(table, oldTable)
        } catch (e) {
            console.log(e)
        }
    }
}

export default Table;