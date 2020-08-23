   "use strict";

   const numberOfLesson = +prompt("Введите номер занятия:", 15);

   switch (numberOfLesson) {
       case 14:

           console.log('Function Expression');

           function sayHi() {
               alert("Привет");
           }

           alert(sayHi); // выведет код функции

           sayHi();


           let sayGoogbay = function () {
               alert("Прощай");
           };

           alert(sayGoogbay); // выведет код функции

           sayGoogbay();

           let func = sayHi; // (2) копируем

           func(); // Привет    // (3) вызываем копию (работает)!
           sayHi();

           break;
       case 15:

           console.log('015 Практика, ч2. Применяем условия и циклы');

           let numberOfFilms = start(null);

           let personalMovieDB = rememberMyFilms(numberOfFilms);

           console.log(numberOfFilms);

           detectPersonalLevel(personalMovieDB);

           if (numberOfFilms > 0 && numberOfFilms < 5) {

               let i = 1;

               while (i <= numberOfFilms) {
                   const a = prompt(`Название фильма № ${i}?`),
                       b = +prompt(`Оценка фильма "${a}"(1-5)?`);

                   if (a == null || a.length == 0 || a.length > 50 || b == null || b == 0 || b > 5) {
                       continue;
                   }

                   personalMovieDB.movies[a] = b;

                   i++;
               }

           }

           writeYourGenres(personalMovieDB);

           showMyDB(personalMovieDB);

           break;
       case 16:

           console.log('016 Функции, стрелочные ф-ции (ES6)');

           let ask = (question, yes, no) => (confirm(question)) ? yes() : no();

           ask(
               "Вы согласны?",
               () => alert("Вы согласились."),
               () => alert("Вы отменили выполнение.")
           );

           break;

       case 17:

           console.log('018 Практика , ч3. Используем функции');

           let userName = 'Вася';



           function showMessage() {
               userName = "Петя"; // (1) изменяем значение внешней переменной

               let message = 'Привет, ' + userName;
               alert(message);
           }

           alert(userName); // Вася перед вызовом функции

           showMessage();

           alert(userName); // Петя

           break;
       case 20:

           console.log('Объекты: основы');

           let user = {};
           user.name = 'John';
           user.surname = 'Smith';
           user.name = 'Pete';
           delete user.name;

           let schedule = {};

           alert(isEmpty(schedule)); // true

           schedule["8:30"] = "get up";

           alert(isEmpty(schedule)); // false

           function isEmpty(someObject) {


               if (typeof (someObject) != "object") {
                   return true;
               }

               if (Object.keys(someObject).length == 0) {
                   return true;
               }

               return false;
           }

           break;
       case 23:

           let anyUser = {
               name: "John",
               surname: "Smith",

               set fullName(value) {
                   [this.name, this.surname] = value.split(" ");
               },

               get fullName() {
                   return `${this.name} ${this.surname}`;
               }
           };


           let admin = Object.create(anyUser);
           admin.isAdmin = true;

           alert(admin.fullName); // John Smith (*)

           // срабатывает сеттер!
           admin.fullName = "Alice Cooper"; // (**)
           alert(admin.name); // Alice
           alert(admin.surname); // Cooper
           break;
       default:
           console.log('Занятия с таким номером не найдено!');
   }

   function start(numberOfFilms) {

       while (numberOfFilms == null || numberOfFilms == 0 || isNaN(numberOfFilms)) {

           return +prompt("Сколько фильмов вы уже просмотрели?");

       }
   }

   function rememberMyFilms(numberOfFilms) {

       return {
           count: numberOfFilms,
           movies: {},
           actors: {},
           genres: [],
           privat: false
       };

   }

   function detectPersonalLevel(personalMovieDB) {

       if (personalMovieDB.count < 10) {
           alert('Просмотрено довольно мало фильмов!');
       } else if (personalMovieDB.count > 9 && personalMovieDB.count < 31) {
           alert('Вы классический зритель!');
       } else if (personalMovieDB.count > 30) {
           alert('Вы киноман!');
       } else {
           alert('Произошла ошибка!');
       }
   }

   function writeYourGenres(personalMovieDB) {

       for (let i = 1; i <= 3; i++) {

           const a = prompt(`Ваш любимый жанр под № ${i}?`);

           if (a == null || a.length == 0) {
               i--;
               continue;
           }

           personalMovieDB.genres[i - 1] = a;

       }

   }

   function showMyDB(personalMovieDB) {

       if (personalMovieDB.privat == false) {
           console.log(personalMovieDB);
       }
   }