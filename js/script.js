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

    const deadline = '2020-09-15';

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

    const menu = document.querySelector('.menu .container');
    menu.innerHTML = "";
    class Menu {
        constructor(params) {
            this.img = params[0];
            this.alt = params[1];
            this.subtitle = params[2];
            this.descr = params[3];
            this.price = params[4];
        }

        getMenu() {
            return `<div class="menu__item">
            <img src="${this.img}" alt="${this.alt}">
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
            menu.append(element);
        }
    }

    //server

    const forms = document.querySelectorAll('form'),
        message = {
            loading: '/img/form/054 spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так..'
        };
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();

    };

    const getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(obj => {
                new Menu(Object.values(obj)).render();
            });
        });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto`;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', JSON.stringify(json))
                .then(data => {
                    console.log(data);
                    form.reset();
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

    //slider

    const mySlider = true;

    const sliders = [
        'food-12',
        'olive-oil',
        'paprika',
        'pepper'
    ];

    const slider = document.querySelector('.offer__slider'),
        sliderCounter = slider.querySelector('.offer__slider-counter'),
        sliderPrev = sliderCounter.querySelector('.offer__slider-prev'),
        sliderNext = sliderCounter.querySelector('.offer__slider-next'),
        extention = 'jpg',
        path = 'img/slider';
    let current = 0;

    class Slider {
        constructor(sliders, key, extention, path) {
            this.img = path + '/' + sliders[key] + '.' + extention;
            this.length = sliders.length;
            this.key = key;
            this.alt = sliders[key];
            this.current = (key < 10) ? '0' + (key + 1) : '' + key;
            this.total = (this.length < 10) ? '0' + (this.length) : '' + this.length;
        }


        getCounter() {
            return `
             <span id="current">${this.current}</span>/<span id="total">${this.total}</span>`;
        }

        getWrapper() {
            return `
         <div class="offer__slider-wrapper">
            <div class="offer__slide">
                <img src="${this.img}" alt="${this.alt}">
            </div>
        </div>`;
        }

        render() {
            slider.innerHTML = "";
            sliderCounter.innerHTML = "";

            if (this.key != 0) {
                sliderCounter.append(sliderPrev);
            }
            let element1 = document.createElement('div');
            element1.innerHTML = this.getCounter();
            sliderCounter.append(element1);
            if (this.key != this.length - 1) {
                sliderCounter.append(sliderNext);
            }

            slider.append(sliderCounter);

            let element2 = document.createElement('div');
            element2.innerHTML = this.getWrapper();
            slider.append(element2);
        }
    }


    function actionSliderChange(i) {
        current = current + i;
        new Slider(sliders, current, extention, path, slider).render();
    }

    if (mySlider) {
        
        actionSliderChange(0);

        sliderPrev.addEventListener('click', () => {
            actionSliderChange(-1);
        });
        sliderNext.addEventListener('click', () => {
            actionSliderChange(1);
        });

    }


});