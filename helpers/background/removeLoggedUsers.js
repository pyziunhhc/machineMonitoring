const LoggedUser = require('../../models/LoggedUser');
const schedule = require('node-schedule')

function removeLoggedUsers() {
    let rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    LoggedUser.find((error, loggedUsers) => {
        if (loggedUsers) {
            loggedUsers.forEach(user => {
                const loggedAt = new Date(user.loggedAt).getTime(),
                    logout = new Date(loggedAt + 3600000);
                if (logout.getTime() < new Date().getTime()) {
                    LoggedUser.findOneAndDelete({
                        _id: user._id
                    }, (error, document) => {

                    })
                } else {
                    schedule.scheduleJob(logout, () => {
                        LoggedUser.findOneAndDelete({
                            _id: user._id
                        }, (error, document) => {

                        })
                    })
                }
            })
        }
    })

    schedule.scheduleJob(rule, () => {
        LoggedUser.find((error, loggedUsers) => {
            if (loggedUsers) {
                loggedUsers.forEach(user => {
                    const loggedAt = new Date(user.loggedAt).getTime(),
                        logout = new Date(loggedAt + 3600000);

                    if (logout > new Date()) {
                        schedule.scheduleJob(new Date(), () => {
                            LoggedUser.findOneAndDelete({
                                _id: user._id
                            }, (error, document) => {

                            })
                        })
                    } else {
                        schedule.scheduleJob(logout, () => {
                            LoggedUser.findOneAndDelete({
                                _id: user._id
                            }, (error, document) => {

                            })
                        })
                    }
                })
            }
        })
    })
}

module.exports = {
    removeLoggedUsers
}