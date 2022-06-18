"use strict";

const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elMovieForm = document.querySelector(".movie__form");
const elMovieSelect = document.querySelector(".movie__select");
const elMarkList = document.querySelector(".mark-list");

elResult.textContent = films.length;

const markedFilms = [];

//  todo: place all genres into  select elements

// const nimad = films.map(film => film.genres).

const renderGenres = (arr) => {
  const allGenres = [];

  arr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre);
      }
    });
  });

  allGenres.forEach((genre) => {
    const genreOption = document.createElement("option");

    genreOption.textContent = genre;
    genreOption.value = genre;

    elMovieSelect.appendChild(genreOption);
  });
};

renderGenres(films);

// todo: place all films into movies list
const renderMovies = function (filmsArr, htmlElement) {
  filmsArr.forEach((movie) => {
    movie.isMark = false;
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");
    const newMarkBtn = document.createElement("button");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newButton.setAttribute("class", "btn btn-danger");
    newButton.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );
    newMarkBtn.classList.add("mark-btn");

    newMarkBtn.dataset.markBtn = movie.id;
    newTitle.textContent = movie.title;
    newYear.textContent = movie.overview;
    newButton.textContent = "Watch Trailer";
    newMarkBtn.textContent = "Mark";

    const genresList = document.createElement("ul");

    movie.genres.forEach((genre) => {
      const newGenre = document.createElement("li");

      newGenre.textContent = genre;

      genresList.appendChild(newGenre);
    });

    //APPEND
    htmlElement.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(genresList);
    newDiv.appendChild(newLanguage);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newMarkBtn);
  });
};

renderMovies(films, elMovieList);

// todo: add addEventListener for filter films

elMovieForm.addEventListener("submit", function (ent) {
  ent.preventDefault();

  elMovieList.innerHTML = null;

  const selectValue = elMovieSelect.value;

  const filteredFilms = [];

  films.forEach((film) => {
    if (film.genres.includes(selectValue)) {
      filteredFilms.push(film);
    }
  });

  elResult.textContent = filteredFilms.length;

  renderMovies(filteredFilms, elMovieList);
});

// !  --------------

const renderMark = (marked, element) => {
  marked.forEach((movie) => {
    const newMarkLi = document.createElement("li");
    const newMarkName = document.createElement("p");
    const newRemoveBtn = document.createElement("button");

    newRemoveBtn.setAttribute("class", "btn btn-warning");
    newMarkName.setAttribute("class", "fs-1 fw-bold");

    newMarkName.textContent = movie.title;
    newRemoveBtn.textContent = "Remove";
    newRemoveBtn.dataset.removeBtnId = movie.id;

    if (movie.isMark) {
      elMarkList.appendChild(newMarkLi);
      newMarkLi.appendChild(newMarkName);
      newMarkLi.appendChild(newRemoveBtn);
    } else {
    }
  });
};

renderMark(films, elMarkList);

// todo:
elMovieList.addEventListener("click", (ent) => {
  elMarkList.innerHTML = null;

  const markBtnId = ent.target.dataset.markBtn * 1;

  films.forEach((movie) => {
    if (movie.id * 1 === markBtnId) {
      movie.isMark = !movie.isMark;
    }
  });

  renderMark(films, elMarkList);
});

// todo:
elMarkList.addEventListener("click", (ent) => {
  elMarkList.innerHTML = null;

  const removeBtnId = ent.target.dataset.removeBtnId * 1;

  films.forEach((movie) => {
    if (movie.id * 1 === removeBtnId) {
      movie.isMark = !movie.isMark;
    }
  });

  renderMark(films, elMarkList);
});
