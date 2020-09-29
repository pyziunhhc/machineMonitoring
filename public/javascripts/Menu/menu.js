import settings from '../helpers/fetch/appSettings.js';
import helpers from '../helpers/auxiliaryFunctions.js'
import User from '../Users/users.js';
import LockedMachines from '../Machines/lockedMachines.js';


class Menu {
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
                belt = document.createElement('div'),
                settingsList = document.createElement('ul'),
                closeButton = document.createElement('button'),
                minimizeButton = document.createElement('button'),
                controls = document.createElement('div'),
                header = document.createElement('h3');


            //Tekst
            header.innerText = 'Ustawienia'
            closeButton.innerText = 'X'
            minimizeButton.innerText = '_'
            //Klasy
            settingsContainer.classList.add('settings__container');
            belt.classList.add('move-belt');
            closeButton.classList.add('close');
            controls.classList.add('controls')
            //Akcje
            closeButton.addEventListener('click', (e) => {
                settingsContainer.remove();
            })
            belt.onmousedown = helpers.dragMouseDown.bind(null, this, settingsContainer);
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
                                case 'Moje konto': {
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
                                }
                                break;
                            case 'Zablokowane maszyny': {
                                settingsAnchor.addEventListener('click', e => {
                                    fetch('/stats/locked', {
                                            method: 'POST',
                                            credentials: 'include',
                                            headers: {
                                                'Accept': '*',
                                                'Content-Type': 'application/json',
                                            }
                                        }).then(res => res.json())
                                        .then(data => {
                                            const lockedMachines = new LockedMachines(data, container);
                                            lockedMachines.createDOM()
                                        })
                                })
                            }
                            break;
                            }


                        }

                        settingsElement.appendChild(settingsAnchor);
                        settingsList.appendChild(settingsElement);
                    })
                belt.appendChild(header)
                controls.appendChild(minimizeButton)
                controls.appendChild(closeButton)
                belt.appendChild(controls)
                settingsContainer.appendChild(belt);
                settingsContainer.appendChild(settingsList);
                container.appendChild(settingsContainer);

            })
        })
    }
}
const MENU = new Menu()
MENU.createMenu();