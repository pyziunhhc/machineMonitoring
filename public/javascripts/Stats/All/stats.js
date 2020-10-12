import machines from '../../helpers/fetch/machines.js';
import message from '../../helpers/messages.js';
import users from '/javascripts/helpers/fetch/user.js'
import Table from '../../Table/table.js';


window.onload = function () {
    const select = document.querySelector('select.select-user');
    const stats = new Stats(select)
    stats.getUsers()
}

class Stats {
    constructor(select) {
        this._select = select;
        this._user = null;
    }
    getUsers() {
        users.showUsers()
            .then(res => {
                if (res.status == 200) {
                    res.users.forEach((user, index) => {
                        !index ? this._user = user.login : null;

                        const option = document.createElement('option');
                        option.value = user.login;
                        option.innerText = user.login;
                        this._select.addEventListener('change', this.selectUser.bind(this))
                        this._select.appendChild(option);
                    })
                }
            })
            .then(() => {
                this.getStats()
            })
    }
    selectUser(e) {
        this._user = e.target.value;
    }
    getStats() {
        const button = document.querySelector('button.show-stats');
        button.addEventListener('click', () => {
            let start = new Date(document.querySelector('input[name="start"]').value),
                end = new Date(document.querySelector('input[name="end"]').value);

            if (start == 'Invalid Date' || end == 'Invalid Date') {
                message.showMessage('error', ['Musisz wybrać datę od i do!'])
            } else {
                console.log(this._user)
                machines.showAllStats({
                        start,
                        end,
                        user: this._user
                    })
                    .then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            this.renderStats(res.data)
                        } else {
                            message.showMessage('error', res.message)

                        }

                    })
            }

            // machines.showUserStats({
            //         start,
            //         end,
            //         user: this._user
            //     })
            //     .then(res => {
            //         if (res.status == 200) {
            //             this.renderStats(res.data)
            //         } else {
            //             message.showMessage('error', res.message)

            //         }

            //}


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

            let start = new Date(stat.start),
                end = new Date(stat.end);
            if (stat.end == null) {
                end = 'Praca wre..';
            }

            container.classList.add('machine-stats__container');
            informationContainer.classList.add('information')
            titleContainer.innerText = stat.machine;
            startContainer.innerText = `${start.toLocaleDateString()} | ${start.toLocaleTimeString()}`;
            endContainer.innerText = `${typeof end == 'string' ?  end : end.toLocaleDateString()} | ${typeof end == 'string' ?  end : end.toLocaleTimeString()}`;
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