function calc() {

// calc

const result = document.querySelector('.calculating__result span'),
chooseMedium = document.querySelector('.calculating__choose_medium'),
inputs = chooseMedium.querySelectorAll('.calculating__choose-item'),
activeClass = 'calculating__choose-item_active';

let sex = 'female',
_height = 0,
_weight = 0,
_age = 0,
ratio = 1.55;

sex = (localStorage.getItem('sex')) ? localStorage.getItem('sex') : sex;
ratio = (localStorage.getItem('ratio')) ? localStorage.getItem('ratio') : ratio;
_height = (localStorage.getItem('_height')) ? localStorage.getItem('_height') : _height;
_weight = (localStorage.getItem('_weight')) ? localStorage.getItem('_weight') : _weight;
_age = (localStorage.getItem('_age')) ? localStorage.getItem('_age') : _age;

const initDynamicSettings = () => {
inputs.forEach(input => {
    switch (input.getAttribute('id')) {
        case 'height':
            input.value = _height;
            break;
        case 'weight':
            input.value = _weight;
            break;
        case 'age':
            input.value = _age;
            break;
        default:
            break;
    }
});

};

initDynamicSettings();

const initStaticSettings = (selector) => {
const elements = document.querySelectorAll(selector);

elements.forEach(elem => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
    }
    if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
    }

});

};

initStaticSettings('#gender div');
initStaticSettings('.calculating__choose_big div');

const getDynamicInformation = () => {

inputs.forEach(input => {

    switch (input.getAttribute('id')) {
        case 'height':
            _height = +input.value;
            localStorage.setItem('_height', _height);
            break;
        case 'weight':
            _weight = +input.value;
            localStorage.setItem('_weight', _weight);
            break;
        case 'age':
            _age = +input.value;
            localStorage.setItem('_age', _age);
            break;
        default:
            break;
    }
});

};

const calcTotal = () => {

getDynamicInformation();

if (!sex || !_height || !_weight || !_age || !ratio) {
    result.textContent = "____";
    return;
}
if (sex === 'female') {
    result.textContent = Math.round((447.6 + (9.2 * _weight) + (3.1 * _height) - (5.7 * _age)) * ratio);
} else {
    result.textContent = Math.round((88.36 + (13.4 * _weight) + (4.8 * _height) - (4.3 * _age)) * ratio);
}

};

const setStaticEvents = (selector) => {
const elements = document.querySelectorAll(selector);

elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
        getStaticInformation(e);
    });

});

};

const getStaticInformation = (e) => {
let selector;

if (e.target.getAttribute('data-ratio')) {
    ratio = +e.target.getAttribute('data-ratio');
    selector = '.calculating__choose_big div';
    localStorage.setItem('ratio', ratio);
} else {
    sex = e.target.getAttribute('id');
    selector = '#gender div';
    localStorage.setItem('sex', sex);
}

const elements = document.querySelectorAll(selector);

elements.forEach(elem => {
    elem.classList.remove(activeClass);
});

e.target.classList.add(activeClass);

calcTotal();

};

setStaticEvents('#gender div');
setStaticEvents('.calculating__choose_big div');

const setDynamicEvents = (parentSelector) => {
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
            calcTotal();
        }

    });
});
};

setDynamicEvents();

calcTotal();

}

module.exports = calc;