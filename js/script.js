const numberOfLesson = +prompt("Введите номер занятия:", 15);

switch (numberOfLesson) {
    case 15:

        console.log('015 Практика, ч2. Применяем условия и циклы');

        const numberOfFilms = +prompt("Сколько фильмов вы уже просмотрели?", 0);

        const personalMovieDB = {
            count: numberOfFilms,
            movies: {},
            actors: {},
            genres: [],
            privat: false
        };

        if (personalMovieDB.count < 10) {
            alert('Просмотрено довольно мало фильмов!');
        } else if (personalMovieDB.count > 9 && personalMovieDB.count < 31) {
            alert('Вы классический зритель!');
        } else if (personalMovieDB.count > 30) {
            alert('Вы киноман!');
        } else {
            alert('Произошла ошибка!');
        }

        if (numberOfFilms > 0 && numberOfFilms < 5) {

            let i = 1;

            while (i <= numberOfFilms) {
                const a = prompt(`Название фильма № ${i}?`),
                    b = +prompt(`Оценка фильма "${a}"(1-5)?`);

                if (a == null||a.length== 0||a.length>50||b==null||b==0||b>5) {
                    continue;
                }

                personalMovieDB.movies[a] = b;

                i++;
            }

        }

        console.log(personalMovieDB);

        break;
    case 16:
         
    console.log('016 Функции, стрелочные ф-ции (ES6)');
  
        function ask(question, yes, no) {
            'use strict';
            if (confirm(question)) {
                yes();
            }
            else {no();
            }
        }

        ask(
            "Вы согласны?",
            () => alert("Вы согласились."),
            () => alert("Вы отменили выполнение.")
        );

        break;

    case 17:

        break;
    default:
        console.log('Занятия с таким номером не найдено!');
}