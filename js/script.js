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
        clearInterval(modalTimeout);
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
        if (e.target === modal) {
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

});