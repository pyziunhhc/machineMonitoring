import settings from '../helpers/fetch/appSettings.js';
import User from '../Users/users.js';
import LockedMachines from '../Machines/lockedMachines.js';
import Movebelt from '../Movebelt/movebelt.js';
import Server from '../Settings/settings.js'
//import notifications from '../helpers/fetch/notification.js'
// import {
//     notification
// } from '../helpers/fetch/notification.js'
class Menu {
    constructor() {
        this._messages = []
    }
    createMenu() {
        const menu = document.querySelector('.header__navigation > ul');
        return fetch('/api/menu', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(res => {
                Object.values(res)
                    .forEach(element => {
                        const menuElement = document.createElement('li'),
                            menuAnchor = document.createElement('a');

                        menuElement.classList.add('navigation__element')
                        menuAnchor.innerText = element.name;
                        menuAnchor.setAttribute('href', element.href);
                        if (element.name == 'Ustawienia') {
                            this.showSettings(menuAnchor)
                        }
                        menuElement.appendChild(menuAnchor);
                        menu.appendChild(menuElement);
                    })
                this.hideMenu()
            })
            .catch(e => console.log(e))
    }
    hideMenu() {
        const button = document.querySelector('.button__hide-nav'),
            nav = document.querySelector('.header__navigation'),
            navContainer = document.querySelector('.navigation__container'),
            headerContainer = document.querySelector('.header__container '),
            img = document.querySelector('.logo__container > img'),
            mainSection = document.querySelector('.main__section');


        button.addEventListener('click', (e) => {
            if (navContainer.classList[1] == 'hidden') {
                nav.classList.add('unhidden');
                navContainer.classList.add('unhidden')
                headerContainer.classList.add('unhidden');
                img.classList.add('unhidden');
                mainSection.classList.add('normal');

                nav.classList.remove('hidden');
                navContainer.classList.remove('hidden');
                headerContainer.classList.remove('hidden');
                img.classList.remove('hidden');
                mainSection.classList.remove('reduced');
            } else {
                nav.classList.add('hidden');
                navContainer.classList.add('hidden');
                headerContainer.classList.add('hidden');
                img.classList.add('hidden');
                mainSection.classList.add('reduced');

                nav.classList.remove('unhidden');
                navContainer.classList.remove('unhidden');
                headerContainer.classList.remove('unhidden');
                img.classList.remove('unhidden');
                mainSection.classList.remove('normal');

            }

        })

    }
    showSettings(button) {
        const container = document.querySelector('.main__section');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const settingsContainer = document.createElement('div'),
                settingsList = document.createElement('ul');
            const minimizedPanel = document.querySelector('.minimized-panels');
            const moveBelt = new Movebelt(null, settingsContainer, minimizedPanel, 'Ustawienia');
            moveBelt.create();

            //Klasy
            settingsContainer.classList.add('settings__container');
            //Akcje
            settings.showSettings().then(data => {
                Object.values(data)
                    .map(val => {
                        const settingsElement = document.createElement('li'),
                            settingsAnchor = document.createElement('a');

                        settingsAnchor.innerText = val.name;
                        if (val.href) {
                            settingsAnchor.setAttribute('href', val.href);
                        } else {
                            switch (val.name) {
                                case 'Moje konto':
                                    settingsAnchor.addEventListener('click', e => {
                                        fetch('/users/myAccount', {
                                                method: 'POST',
                                                credentials: 'include',
                                                headers: {
                                                    'Accept': '*',
                                                    'Content-Type': 'application/json',
                                                }
                                            }).then(res => res.json())
                                            .then(data => {
                                                const user = new User();
                                                user.editPanel(data, container)
                                            })
                                    })

                                    break;
                                case 'Zablokowane maszyny':
                                    settingsAnchor.addEventListener('click', e => {
                                        //przeniesc fetche do osobnej funkcji
                                        fetch('/stats/locked', {
                                                method: 'GET',
                                                credentials: 'include',
                                                headers: {
                                                    'Accept': '*',
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                            .then(res => res.json())
                                            .then(data => {
                                                const lockedMachines = new LockedMachines(data, container);
                                                lockedMachines.createDOM()
                                            })
                                    })
                                    break;
                                case 'Serwer':
                                    settingsAnchor.addEventListener('click', e => {
                                        fetch('/api/server', {
                                                method: 'GET',
                                                credentials: 'include',
                                                headers: {
                                                    'Accept': '*',
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                            .then(res => res.json())
                                            .then(json => {
                                                if (json.status == 200) {
                                                    const server = new Server(container, json.config);
                                                    server.createDOM();
                                                } else {
                                                    const server = new Server(container);
                                                    server.createDOM()
                                                }

                                            })
                                    })
                                    break;
                            }


                        }

                        settingsElement.appendChild(settingsAnchor);
                        settingsList.appendChild(settingsElement);
                    })
                settingsContainer.appendChild(settingsList);
                container.appendChild(settingsContainer);

            })
        })
    }
    getStartNotifications() {
        notifications.getNotification()
            .then(res => {
                if (res.status == 200) {
                    let notificationsArray = res.notifications;
                    const counter = document.querySelector('.notification>.counter'),
                        notificationsContainer = document.querySelector('.notification'),
                        bell = document.querySelector('.notification > img');

                    bell.classList.add('exist')
                    counter.classList.add('exist')
                    bell.addEventListener('dblclick', () => {
                        const messagesWrapper = document.createElement('div'),
                            messagesContainer = document.createElement('div'),
                            messageList = document.createElement('ul');

                        messagesWrapper.classList.add('messages__wrapper')
                        messagesContainer.classList.add('messages__container')
                        messagesWrapper.appendChild(messagesContainer);
                        messagesContainer.appendChild(messageList);

                        notificationsArray.forEach((notification) => {
                            const messageElement = document.createElement('li'),
                                removeButton = document.createElement('button');
                            messageElement.innerText = notification.message;
                            removeButton.innerText = 'X'
                            messageElement.classList.add('message')
                            removeButton.classList.add('remove')
                            messageElement.appendChild(removeButton)
                            messageList.appendChild(messageElement)

                            removeButton.addEventListener('click', () => {
                                notifications.updateNotification({
                                    _id: notification._id,
                                    read: true
                                })
                                // notificationsArray = notificationsArray.map(oldNotification => {
                                //     if (notification._id != oldNotification) {
                                //         return oldNotification
                                //     }
                                // })
                                messageElement.remove()
                            })

                        })
                        notificationsContainer.appendChild(messagesWrapper)
                    })
                    res.notifications.forEach((notification, index) => {
                        counter.dataset.count++;
                        counter.innerText = counter.dataset.count;
                        if (index == res.notifications.length - 1) {
                            const messageContainer = document.createElement('div'),
                                message = document.createElement('p');
                            messageContainer.classList.add('message-popup')
                            message.innerText = `Masz ${index+1} wiadomości do odczytania.`
                            messageContainer.appendChild(message)
                            setTimeout(() => {
                                bell.appendChild(messageContainer)
                                setTimeout(() => {
                                    messageContainer.remove()
                                }, 5000)
                            }, 3000)
                        }
                    })


                }

            })

        // const socket = io();
        // socket.on('notify-user', () => {
        //     const counter = document.querySelector('.notification > .counter');
        //     let count = parseInt(counter.dataset.count);
        //     if (count > 0) {
        //         count++;
        //         counter.dataset.count = count;
        //         counter.innerText = count;
        //     } else {
        //         counter.dataset.count = 1;
        //         counter.innerText = 1
        //     }
        // })
    }
}
const MENU = new Menu()
MENU.createMenu();
//MENU.getStartNotifications()
//MENU.handleMessage()