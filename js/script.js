'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const maxLength = 21,
        film = 'Полет над гнездом кукушки',
        advlist = document.querySelectorAll(".promo__adv img"),
        genre = document.querySelector(".promo__genre"),
        poster = document.querySelector(".promo__bg"),
        movielist = document.querySelector(".promo__interactive-list"),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    function checkFilm(newFilm, maxLength) {

        if (newFilm.length > maxLength) {
            return `${newFilm.slice(0, maxLength)}...`;
        }

        return newFilm;

    }

    function createMovieList(films, parent) {

        parent.innerHTML = "";

        films.sort();

        films.forEach((film, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1}. ${film.toUpperCase()}
            <div class="delete"></div>
        </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                
                btn.parentElement.remove();
                films.splice(i, 1);
                createMovieList(films, parent);

            });
        });

    }

    const deleteAdv = (arr) => {

        arr.forEach((item) => {
            item.remove();
        });

    };

    const makeChanges = () => {
        
        genre.textContent = 'DRAMA';
          poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value,
            favorite = checkbox.checked;

        if (newFilm) {

            movieDB.movies.push(checkFilm(newFilm, maxLength));
            createMovieList(movieDB.movies, movielist);
            event.target.reset();

            if (favorite) {
                console.log('Добавляем новый фильм!');
            }

        }

    });

    createMovieList(movieDB.movies, movielist);
    deleteAdv(advlist);
    makeChanges();

});