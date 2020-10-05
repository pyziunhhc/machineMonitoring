import helpers from '../helpers/auxiliaryFunctions.js';
class Table {
    constructor(data, name) {
        this._data = data;
        this._name = name;
        this._sumOfTimes = data.sumOfTimes.data.time;
        this._table = null;
    }


    create(parent) {
        try {
            let statusesName = ['Status'],
                statusesValues = ['Czas'],
                statusesPercent = [''],
                statusesClass = ['status'],
                table = document.createElement('table'),
                sumOfTimes = this._sumOfTimes;
            Object.values(this._data)
                .filter(val => {
                    return val.data.time > 0
                })
                .map(val => {
                    statusesName.push(val.displayName);
                    statusesClass.push(val.className);
                    statusesValues.push(helpers.parseMillisecondsIntoReadableTime(val.data.time));
                    statusesPercent.push(((val.data.time * 100) / sumOfTimes).toFixed(2));
                })
            table.classList.add(this._name);
            //tableContainer.classList.add(timeType);
            //if (tableType == 'vertical') {
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
            //} else if (tableType == 'horizontal') {
            // for (let i = 0; i < 3; i++) {
            //     let row = table.insertRow(i);
            //     if (i == 0) {
            //         for (let j in statusesName) {
            //             let cell = row.insertCell(j);
            //             cell.innerText = statusesName[j]
            //             cell.classList.add(statusesClass[j])
            //         }
            //     } else if (i == 1) {
            //         for (let j in statusesName) {
            //             let cell = row.insertCell(j);
            //             cell.innerText = statusesValues[j]
            //             cell.classList.add(statusesClass[j])
            //         }
            //     } else if (i == 2) {
            //         for (let j in statusesName) {
            //             let cell = row.insertCell(j);
            //             cell.innerText = `${statusesPercent[j]}%`
            //             cell.classList.add(statusesClass[j])
            //         }
            //     }

            // }
            //}
            //if (timeType) {
            // let parent = document.querySelector(`.${timeType}-table.${machineName}`),
            //     toChange = document.querySelector(`.${timeType}-table.${machineName} > table`);
            // parent.replaceChild(table, toChange)
            // document.querySelector(`.${timeType}-table.${machineName}`).appendChild(table);
            // }
            //parent.appendChild(table)
            parent.appendChild(table)



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
            const parent = document.querySelector(`.statuses-panel__container.${this._name}`),
                oldTable = document.querySelector(`.statuses-panel__container.${this._name} > table.${this._name}`);
            Object.values(data)
                .filter(val => {
                    return val.data.time > 0 || val.data.show
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
            parent.replaceChild(table, oldTable)
        } catch (e) {
            console.log(e)
        }
    }
}

export default Table;