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