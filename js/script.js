/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Джокер"
    ]
};

const promoAdv = document.querySelector('.promo__adv');
promoAdv.remove();

const promoGenre = document.querySelector('.promo__genre');
promoGenre.textContent = 'ДРАМА';

const promoBG = document.querySelector('.promo__bg');
console.log(promoBG.backgroundImage);
promoBG.style.backgroundImage = "url('../img/bg.jpg')";

const promoList = document.querySelectorAll('.promo__interactive-item');
movieDB.movies.sort();
movieDB.movies.forEach((element, i) => {
    promoList[i].textContent = `${i + 1}. ${element}`;
});

