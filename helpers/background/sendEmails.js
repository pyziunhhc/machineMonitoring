const scheduler = require('node-schedule');
const Email = require('../../models/Email');
const {
    getGroups,
    getStatuses,
    getMachines
} = require('../../helpers/fetchFromMainApp');
const {
    summaryMachineStatistics
} = require('../processStatuses/process');
const {
    machineTypes
} = require('../../config/machineTypes');
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
const mailer = require('nodemailer')
const {
    parseMillisecondsIntoReadableTime
} = require('../helpers')

function sendEmails() {
    scheduler.scheduleJob('0 0 8 * * *', () => {
        sendEmail('daily')
    })

    scheduler.scheduleJob(`0 0 8 ${months[new Date().getMonth()].to} ${new Date().getMonth()} *`, () => {
        sendEmail('monthly')
    })
}
const sendEmail = type => {
    let dayFrom = null,
        dayTo = null,
        from = null,
        to = null,
        fromWho = null,
        subject = null;
    if (type == 'daily') {
        const now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
        dayFrom = now.getDate() - 1;
        dayTo = now.getDate();
        from = new Date(`${year}-${month}-${dayFrom}`);
        to = new Date(`${year}-${month}-${dayTo}`);
        fromWho = `"Raport Dzienny Monitoringu Maszyn" <m.pyz@itatools.pl>`;
        subject = `Raport Monitoringu Maszyn ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`

    } else if ('monthly') {
        const now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
        dayFrom = months[month].from
        dayTo = months[month].to
        from = new Date(`${year}-${month}-${dayFrom}`);
        to = new Date(`${year}-${month}-${dayTo}`);
        fromWho = `"Raport Miesięczny Monitoringu Maszyn" <m.pyz@itatools.pl>`;
        subject = `Raport Monitoringu Maszyn ${months[month-1].name}`
    }


    let transporter = mailer.createTransport({
        host: "serwer1376900.home.pl",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'm.pyz@itatools.pl', // generated ethereal user
            pass: 'BH9v,TqgB2NZ'
        }
    });
    getGroups()
        .then(groups => {
            const group = groups[0].name;
            getMachines(group)
                .then(machines => {
                    const promise = new Promise((resolve, reject) => {
                        let allStats = [];
                        machines.forEach((machine, index) => {
                            getStatuses(machine.name, from, to)
                                .then(data => {
                                    const summary = summaryMachineStatistics(data, from, to);
                                    machineTypes.forEach(data => {
                                        if (data.name == machine.name) {
                                            allStats.push({
                                                name: machine.name,
                                                type: data.type,
                                                stats: summary
                                            })
                                        }
                                    })
                                    if (allStats.length == machines.length) {
                                        const sortByName = allStats.sort((a, b) => {
                                            if (a.name > b.name) {
                                                return 1
                                            } else {
                                                return -1
                                            }
                                        })
                                        const sortByType = sortByName.sort((a, b) => {
                                            if (a.type > b.type) {
                                                return 1
                                            } else {
                                                return -1
                                            }
                                        })
                                        resolve(sortByType)
                                    }

                                })


                        })
                    })
                    promise
                        .then(data => {
                            if(type == 'daily'){
                                Email.find((error, document) => {
                                    if (error) {

                                    }
                                    if (document) {

                                        document.forEach((user, index) => {
                                            if (user.daily) {
                                                (async () => {
                                                    const message = prepareMail(data)

                                                    let info = await transporter.sendMail({
                                                        from: fromWho, // sender address
                                                        to: user.email, // list of receivers
                                                        subject: subject, // Subject line
                                                        html: message, // html body
                                                    });
                                                    console.log("Message sent: %s", info.messageId)
                                                    console.log("Preview URL: %s", mailer.getTestMessageUrl(info));
                                                })();

                                            }

                                        })
                                    }
                                })
                            } else {
                                Email.find((error, document) => {
                                    if (error) {

                                    }
                                    if (document) {
                                        document.forEach((user, index) => {
                                            if (user.monthly) {
                                                (async () => {
                                                    const message = prepareMail(data)
                                                    let info = await transporter.sendMail({
                                                        from: fromWho, // sender address
                                                        to: user.email, // list of receivers
                                                        subject: subject, // Subject line
                                                        html: message, // html body
                                                    });
                                                    console.log("Message sent: %s", info.messageId)
                                                    console.log("Preview URL: %s", mailer.getTestMessageUrl(info));
                                                })();

                                            }

                                        })
                                    }
                                })
                            }

                        })


                })

        })
}
const prepareMail = (data) => {
    let body = `<html>
                    <head>
                        <style>
                        .eroding,
                        .working,
                        .erodowanie {
                          background-color: rgba(0, 82, 20, 1);
                          color: white;
                        }

                        .grinding,
                        .szlifowanie {
                          background-color: rgba(0, 209, 44, 1);
                          color: white;
                        }

                        .measuring,
                        .pomiar {
                          background-color: rgba(255, 177, 51, 1);
                          color: white;
                        }

                        .robotLoading {
                          background-color: rgba(200, 0, 200, 1);
                          color: white;
                        }

                        .manualLoading {
                          background-color: rgba(81, 182, 215, 1);
                          color: white;
                        }

                        .stop {
                          background-color: rgba(255, 233, 40, 1);
                          color: black;
                        }

                        .alarm {
                          background-color: rgba(255, 0, 0, 1);
                          color: white;
                        }

                        .disconnect {
                          background-color: rgba(145, 145, 145, 1);
                          color: white;
                        }

                        .wheelReplacement {
                          background-color: rgba(0, 0, 0, 1);
                          color: white;
                        }

                        .toolChange {
                          background-color: rgba(206, 183, 119, 1);
                          color: white;
                        }

                        .transition {
                          background-color: rgba(255, 112, 183, 1);
                          color: white;
                        }

                        .warmup {
                          background-color: rgba(168, 80, 80, 1);
                          color: white;
                        }

                        .suspend {
                          background-color: rgba(145, 19, 19, 1);
                          color: white;
                        }




                        .mails__container {
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                            font-family: Roboto;
                        }
                        .machine-type__container{
                            display: flex;
                            flex-direction: column;

                        }
                        .type-title {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .mails {
                            display: flex;
                            justify-content: space-around;
                            flex-wrap: wrap;
                        }
                        .mail__container{
                            display:flex;
                            flex-direction: column;
                            flex: 1;
                            align-items: center;
                            justify-content: center;
                        }
                        .mail__container > table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                        .mail__container > table > tbody > tr > td,
                        .mail__container > table > tbody > tr > th {
                                  border: 1px solid black;
                                  text-align: center;
                                  font-size: 1em;
                                  font-weight: bold;
                                  position: relative;
                                }

                        </style>
                    </head>
                    <body><div class="mails__container">`;

    let bodyEroding = `<div class="machine-type__container"><div class="type-title"><h1>Ostrzenie-Erodowanie</h1></div><div class="mails">`,
        bodyVHM = `<div class="machine-type__container"><div class="type-title"><h1>Ostrzenie-VHM</h1></div><div class="mails">`,
        bodyVHM2 = `<div class="machine-type__container"><div class="type-title"><h1>Ostrzenie-Wiertła VHM</h1></div><div class="mails">`,
        bodyProductionVHM = `<div class="machine-type__container"><div class="type-title"><h1>Produkcja-VHM</h1></div><div class="mails">`,
        bodyProductionBodies = `<div class="machine-type__container"><div class="type-title"><h1>Produkcja-Korpusy</h1></div><div class="mails">`;
    data.forEach((data, index) => {
        const type = data.type;
        switch (type) {
            case 'Ostrzenie-Erodowanie':
                bodyEroding +=
                    `<div class="mail__container">
                        <h2>${data.name}</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Status</th>
                                    <th>Czas</th>
                                    <th>%</th>
                                </tr>`
                Object.values(data.stats)
                    .filter(stat => {
                        return stat.data.show && stat.data.time > 0;
                    })
                    .forEach((stat, index) => {
                        bodyEroding +=
                            `<tr class="${stat.className}">
                                <td>${stat.displayName}</td>
                                <td>${parseMillisecondsIntoReadableTime(stat.data.time)}</td>
                                <td>${stat.data.percentage}</td>
                             </tr>`
                    })
                bodyEroding += `</tbody></table></div>`
                break;
            case 'Ostrzenie-VHM':
                bodyVHM +=
                    `<div class="mail__container"><h2>${data.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <th>Czas</th>
                            <th>%</th>
                        </tr>`
                Object.values(data.stats)
                    .filter(stat => {
                        return stat.data.show && stat.data.time > 0;
                    })
                    .forEach((stat, index) => {
                        bodyVHM +=
                            `<tr class="${stat.className}">
                            <td>${stat.displayName}</td>
                            <td>${parseMillisecondsIntoReadableTime(stat.data.time)}</td>
                            <td>${stat.data.percentage}</td>
                        </tr>`
                    })
                bodyVHM += `</tbody></table></div>`
                break;
            case 'Ostrzenie-Wiertła VHM':
                bodyVHM2 +=
                    `<div class="mail__container"><h2>${data.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <th>Czas</th>
                            <th>%</th>
                        </tr>`
                Object.values(data.stats)
                    .filter(stat => {
                        return stat.data.show && stat.data.time > 0;
                    })
                    .forEach((stat, index) => {
                        bodyVHM2 +=
                            `<tr class="${stat.className}">
                            <td>${stat.displayName}</td>
                            <td>${parseMillisecondsIntoReadableTime(stat.data.time)}</td>
                            <td>${stat.data.percentage}</td>
                        </tr>`
                    })
                bodyVHM2 += `</tbody></table></div>`
                break;
            case 'Produkcja-VHM':
                bodyProductionVHM +=
                    `<div class="mail__container"><h2>${data.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <th>Czas</th>
                            <th>%</th>
                        </tr>`
                Object.values(data.stats)
                    .filter(stat => {
                        return stat.data.show && stat.data.time > 0;
                    })
                    .forEach((stat, index) => {
                        bodyProductionVHM +=
                            `<tr class="${stat.className}">
                            <td>${stat.displayName}</td>
                            <td>${parseMillisecondsIntoReadableTime(stat.data.time)}</td>
                            <td>${stat.data.percentage}</td>
                        </tr>`
                    })
                bodyProductionVHM += `</tbody></table></div>`
                break;
            case 'Produkcja-Korpusy':
                bodyProductionBodies +=
                    `<div class="mail__container"><h2>${data.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <th>Czas</th>
                            <th>%</th>
                        </tr>`
                Object.values(data.stats)
                    .filter(stat => {
                        return stat.data.show && stat.data.time > 0;
                    })
                    .forEach((stat, index) => {
                        bodyProductionBodies +=
                            `<tr class="${stat.className}">
                            <td>${stat.displayName}</td>
                            <td>${parseMillisecondsIntoReadableTime(stat.data.time)}</td>
                            <td>${stat.data.percentage}</td>
                        </tr>`
                    })
                bodyProductionBodies += `</tbody></table></div>`
                break;

        }

        //
    })




    bodyEroding += `</div></div>`
    bodyVHM += `</div></div>`
    bodyVHM2 += `</div></div>`
    bodyProductionVHM += `</div></div>`
    bodyProductionBodies += `</div></div>`
    body += bodyEroding;
    body += bodyVHM;
    body += bodyVHM2;
    body += bodyProductionVHM;
    body += bodyProductionBodies;
    body += `<div/></body></html>`
    return body;
}
module.exports = {
    sendEmails
};