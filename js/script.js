'use strict';

const box = document.getElementById('box'),
      btns = document.body.querySelectorAll('button');

box.style.backgroundColor = 'grey';
box.style.width = '100px';

console.log(btns);

btns.forEach(element => {
    element.style.borderRadius = '70%';
    element.style.backgroundColor = 'green';
});

const div = document.createElement('div');

div.classList.add('black');

btns[0].before(div);

div.innerHTML = "<h1>Hello</h1>";