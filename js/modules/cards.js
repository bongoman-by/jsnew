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