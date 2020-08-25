const over = document.querySelectorAll('.over')[0],
btn = over.querySelector('button'),
link = document.querySelector('a'),
btns = document.querySelectorAll('button');

// btn.addEventListener('click', () =>{
//     alert('Click');
// });

// btn.addEventListener('click', () =>{
//     alert('Second Click');
// });

let i = 0;
const deleteButton = (event) => {
    // event.target.remove();
    console.log(event.currentTarget);
    i++;
    if (i == 2) {
        btn.removeEventListener('click', deleteButton);
        over.removeEventListener('click', deleteButton);
    }
};

btn.addEventListener('click', deleteButton);
over.addEventListener('click', deleteButton);

link.addEventListener('click', function(event) {
    event.preventDefault();
});

btns.forEach(btn => {
    btn.addEventListener('click', deleteButton);
});
 