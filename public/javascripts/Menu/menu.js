import helpers from '../helpers/fetch.js';
class Menu {

    hideMenu() {
        const button = document.querySelector('.button__hide-nav'),
            nav = document.querySelector('.header__navigation'),
            navContainer = document.querySelector('.navigation__container'),
            headerContainer = document.querySelector('.header__container '),
            img = document.querySelector('.logo__container > img'),
            mainSection = document.querySelector('.main__section');


        button.addEventListener('click', (e) => {
            console.log(navContainer.classList)
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
    showSettings() {
        const button = document.querySelector('.navigation__element>a[href="/settings"]'),
            container = document.querySelector('.main__section');


        button.addEventListener('click', (e) => {
            e.preventDefault();
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
            closeButton.addEventListener('click',(e)=>{
                settingsContainer.remove();
            })
            belt.onmousedown = helpers.dragMouseDown.bind(null, this, settingsContainer);
            helpers.showSettings().then(data => {
                Object.values(data)
                    .map(val => {
                        const settingsElement = document.createElement('li'),
                            settingsAnchor = document.createElement('a');

                        settingsAnchor.innerText = val.name;
                        settingsAnchor.setAttribute('href', val.href);
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

export default Menu;