'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // tabs

    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {

            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {

        tabsContent[i].classList.add('show');
        tabsContent[i].classList.add('fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //timer

    const deadline = '2020-09-10';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        }
        return `${num}`;
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            timeInteval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            for (let key in t) {
                if (`#${key}` == "#total") {
                    if (t.total <= 0) {
                        clearInterval(timeInteval);
                    }
                } else {
                    timer.querySelector(`#${key}`).innerHTML = getZero(t[key]);
                }

            }

        }

    }

    setClock('.timer', deadline);

    //modal

    const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


    function actionModal(params = ['show', 'hide', 'hidden']) {
        modal.classList.add(params[0]);
        modal.classList.remove(params[1]);
        document.body.style.overflow = [2];
        if (params[0] === 'show') {
            clearInterval(modalTimeout);
        }

    }

    modalTriggers.forEach((elem) => {
        elem.addEventListener('click', () => {
            actionModal();
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        actionModal(['hide', 'show', '']);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            actionModal(['hide', 'show', '']);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            actionModal(['hide', 'show', '']);
        }
    });

    const modalTimeout = setTimeout(actionModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            actionModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // меню 

    class Menu {
        constructor(params) {
            this.img = params[0];
            this.alt = params[1];
            this.subtitle = params[2];
            this.descr = params[3];
            this.price = params[4];
            this.parent = params[5];
        }

        getMenu() {
            return `<div class="menu__item">
            <img src="img/tabs/${this.img}.jpg" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = this.getMenu();
            this.parent.append(element);
        }
    }

    const menu = document.querySelector('.menu .container');
    menu.innerHTML = "";

    const menuList = [
        ['vegy', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, menu],
        ['elite', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550, menu],
        ['post', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков!', 430, menu],
    ];

    for (let index = 0; index < menuList.length; index++) {
        const elem = menuList[index];
        // menu.innerHTML += new Menu(elem).getMenu();
        new Menu(elem).render();
    }

    //server

    const forms = document.querySelectorAll('form'),
        message = {
            loading: '/img/form/054 spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так..'
        };
    forms.forEach(item => {
        postData(item);
    });

    function sendServer(request, form, format = 'json') {
        if (format === 'json') {
            request.setRequestHeader('Content-type', 'applacation/json');
            const formData = new FormData(form);
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            request.send(json);
        } else {
            //так делать не нужно
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);
            request.send(formData);

        }
    }

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto`;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest(),
            //     method = 'POST',
            //     url = 'server.php',
            //     async = true,
            //         login = 'Sergey',
            //         pass = '1111';

            // request.open(method, url, async, login, pass);
            // sendServer(request, form);

            // request.addEventListener('load', () => {

            //     if (request.status === 200) {
            //         form.reset();
            //         console.log(request.response);
            //         statusMessage.remove();
            //         showThanksModal(message.success);
            //     } else {
            //         form.reset();
            //         showThanksModal(message.failure);
            //     }
            // });

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            fetch('server.php', {
                    method: "POST",
                    body: json,
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(data => data.text())
                .then(data => {
                    form.reset();
                    console.log(data.response);
                    statusMessage.remove();
                    form.reset();
                    showThanksModal(message.success);
                }).catch(() => {
                    form.reset();
                    showThanksModal(message.failure);

                }).finally(() => {
                    form.reset();
                });

        });
    }

    // nice modal

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        actionModal(['hide', 'show', '']);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">x</div>
            <div class="modal__title">${message}</div>
        </div>`;
        document.querySelector('.modal').append(thanksModal);
        actionModal(['show', 'hide', '']);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            actionModal(['hide', 'show', '']);
        }, 4000);

    }

    //API

    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json()) 
    //   .then(json => console.log(json));

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Sergey'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //    .then(response => response.json())
    //    .then(json => console.log(json));

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

});