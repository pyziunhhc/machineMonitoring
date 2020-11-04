const scheduler = require('node-schedule');
const Email = require('../../models/Email');
const fetchData = require('../../helpers/fetchFromMainApp');
const {
    summaryMachineStatistics
} = require('../processStatuses/process');

function sendEmails() {
    //sendDailyEmail()
    //sendMonthlyEmail()
}
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

function sendMonthlyEmail() {
    const now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
        from = new Date(`${year}-${month-1}-${months[month].from}`),
        to = new Date(`${year}-${month-1}-${months[month].to}`);
    console.log(from, to);
    fetchData.getGroups()
        .then(groups => {
            const group = groups[0].name;
            fetchData.getMachines(group)
                .then(machines => {
                    let stats = []
                    machines.forEach((machine, index) => {
                        fetchData.getStatuses(machine.name, from, to)
                            .then(data => {
                                const summary = summaryMachineStatistics(data, from, to);
                                stats.push({
                                    name: machine.name,
                                    data: summary
                                })

                                return stats

                            }).then(stats => {
                                let final = [];
                                if (stats.length == machines.length) {
                                    stats.forEach((stat, index) => {
                                        machineTypes.forEach(data => {
                                            if (data.name == stat.name) {
                                                final.push({
                                                    name: stat.name,
                                                    type: data.type,
                                                    stats: stat.data
                                                })
                                            }
                                        })
                                    })
                                }
                                return final;
                            })
                            .then(final => {
                                if (final.length) {
                                    const users = []
                                    Email.find((error, document) => {
                                        if (error) {

                                        }
                                        if (document) {

                                            document.forEach(user => {
                                                if (user.monthly) {
                                                   // console.log(user, final)
                                                }

                                            })
                                        }
                                    })
                                }
                            })

                    })

                })
        })
}


// function sendMonthlyEmail() {
//     Email.find((error, document) => {
//         if (error) {

//         }
//         if (document) {
//             //console.log(document)
//             document.forEach(user => {
//                 if (user.monthly) {
//                     //console.log(user)
//                 }
//             })
//         }
//     })
// }

module.exports = {
    sendEmails
};