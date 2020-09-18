window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const tabs = require('./modules/tabs.js'),
        modal = require('./modules/modal.js'),
        timer = require('./modules/timer.js'),
        cards = require('./modules/cards.js'),
        calc = require('./modules/calc.js'),
        form = require('./modules/form.js'),
        slider = require('./modules/slider.js');

    tabs();
    modal();
    timer();
    cards();
    calc();
    form();
    slider();

});