/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
// cards 

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

}

module.exports = cards; 

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {

}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {

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
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
    //slider

    const mySlider = false;

    const mySlides = [
        'food-12',
        'olive-oil',
        'paprika',
        'pepper'
    ];

    const slider = document.querySelector('.offer__slider'),
        sliderCounter = slider.querySelector('.offer__slider-counter'),
        prev = sliderCounter.querySelector('.offer__slider-prev'),
        next = sliderCounter.querySelector('.offer__slider-next'),
        current = sliderCounter.querySelector('#current'),
        total = sliderCounter.querySelector('#total'),
        slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
        slidesField = slider.querySelector('.offer__slider-inner'),
        slides = slider.querySelectorAll('.offer__slide'),
        // width = window.getComputedStyle(slidesWrapper).width,
        width = `${slider.clientWidth}px`,
        extension = 'jpg',
        path = 'img/slider';

    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
 position: absolute;
 right: 0;
 bottom: 0;
 left: 0;
 z-index: 15;
 display: flex;
 justify-content: center;
 margin-right: 15%;
 margin-left: 15%;
 list-style: none;
 `;

    slider.append(indicators);

    for (let index = 0; index < slides.length; index++) {
        const element = document.createElement('li');
        element.setAttribute('data-slide-to', index + 1);
        element.style.cssText = `
     box-sizing: content-box;
     flex: 0 1 auto;
     width: 30px;
     height: 6px;
     margin-right: 3px;
     margin-left: 3px;
     cursor: pointer;
     background-color: #fff;
     background-clip: padding-box;
     border-top: 10px solid transparent;
     border-bottom: 10px solid transparent;
     opacity: ${(index === 0)? '1' : '.5'};
     transition: opacity .6 s ease;
     `;

        indicators.append(element);

        dots.push(element);

    }

    class Slider {
        constructor(slides, key, extension, path) {
            this.img = path + '/' + slides[key] + '.' + extension;
            this.length = slides.length;
            this.key = key - 1;
            this.alt = slides[key - 1];
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
                sliderCounter.append(prev);
            }
            let element1 = document.createElement('div');
            element1.innerHTML = this.getCounter();
            sliderCounter.append(element1);
            if (this.key != this.length - 1) {
                sliderCounter.append(next);
            }

            slider.append(sliderCounter);

            let element2 = document.createElement('div');
            element2.innerHTML = this.getWrapper();
            slider.append(element2);
        }
    }

    const setSliderStyle = () => {
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.textContent = (slides.length < 10) ? `0${slideIndex}` : `${slideIndex}`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    };

    const changeWidthToNumber = () => +width.replace(/\D/g, '');

    function actionSliderChange(i) {
        slideIndex += slideIndex;
        new Slider(mySlides, slideIndex, extension, path, slider).render();
    }

    if (mySlider) {

        actionSliderChange(slideIndex);

        prev.addEventListener('click', () => {
            actionSliderChange(-1);
        });
        next.addEventListener('click', () => {
            actionSliderChange(1);
        });

    } else {

        total.textContent = (slides.length < 10) ? `0${slides.length}` : `${slides.length}`;
        current.textContent = (slides.length < 10) ? `0${slideIndex}` : `${slideIndex}`;

        next.addEventListener('click', () => {

            let widthToNumber = changeWidthToNumber();
            offset = (offset === widthToNumber * (slides.length - 1)) ? 0 : offset + widthToNumber;

            slideIndex = (slideIndex === slides.length) ? 1 : slideIndex + 1;
            setSliderStyle();

        });

        prev.addEventListener('click', () => {

            let widthToNumber = changeWidthToNumber();
            offset = (offset === 0) ? widthToNumber * (slides.length - 1) : offset - widthToNumber;

            slideIndex = (slideIndex === 1) ? slides.length : slideIndex - 1;
            setSliderStyle();

        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = +e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = changeWidthToNumber() * (slideTo - 1);
                setSliderStyle();

            });
        });

    }
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

 function tabs() {

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

 }

 module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    //timer

    const deadline = '2020-10-15';

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

}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const tabs = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js"),
        form = __webpack_require__(/*! ./modules/form.js */ "./js/modules/form.js"),
        slider = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    form();
    slider();

});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map