
const numberOfFilms = +prompt("Сколько фильмов вы уже просмотрели?", 0);

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let i = 0;
while (i < 2) { // выводит 0, затем 1, затем 2
    const a = prompt("Один из последних просмотренных фильмов?"),
          b = +prompt(`Оценка фильма ${a} (1-5)?`);

          personalMovieDB.movies[a] = b;

  i++;
}

console.log(personalMovieDB);