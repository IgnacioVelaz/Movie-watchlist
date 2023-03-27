const movies = document.querySelector('.movies-container')
let savedMovies = []
savedMovies = JSON.parse(localStorage.getItem('movies'))

function renderWatchList() {
    // Generate HTML for each movie in the watch list
    
    let moviesHtml = "";
    if(savedMovies.length > 0) {
        moviesHtml  = savedMovies.map(movie => {
            const {Title, Rating, Genre, Plot, Runtime} = movie
            const Image = movie.Image === "N/A" ? "/images/unavailable.jpg" : movie.Image          
            return       `<div class="movie">
                <div class="movie-poster-container">
                    <img src="${Image}" alt="${Title}" class="movie-poster">
                </div>
                <div class="movie-info-container">
                    <div class="movie-title-container">
                        <h2 class="movie-title">${Title}</h2>
                        <svg class="star-icon "xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                        <p class="movie-rate">${Rating}</p>
                    </div>
                    <div class="movie-meta-container">
                        <p class="movie-length">${Runtime}</p>
                        <div class="movie-genre">${Genre}</div>
                        <button class="movie-add-btn" onClick="removeFromWatchList(event)" ><i class="remove-icon fa-solid fa-circle-minus"></i><span>Remove</span></button>
                    </div>
                    <p class="movie-plot">${Plot}</p>
                </div>
            </div>`
        }).join('')
    
    } else {
        moviesHtml = `
        <div class="add-movies-watchlist">
            <p >Your watchlist is looking a little empty...</p>
            <div class="add-movies">
                <a href="index.html" class="add-movies">
                    <i class="fa-solid fa-circle-plus add-icon"></i> 
                    <p class="add-movies">Let's adds some movies!</p>
                </a>
            </div>
        </div>
        `
    }
    // Insert the generated HTML into the watchListComponents element
      movies.innerHTML = moviesHtml
}

function removeFromWatchList(event) {
    const movie = event.target.closest('.movie');
    const title = movie.querySelector('.movie-title').textContent;

    // Find the index of the movie to remove in the savedMovies array
    const movieIndex = savedMovies.findIndex(savedMovie => savedMovie.Title === title);

    if (movieIndex !== -1) {
        // Remove the movie from the savedMovies array
        savedMovies.splice(movieIndex, 1);

        // Update the local storage with the updated savedMovies array
        localStorage.setItem('movies', JSON.stringify(savedMovies));

        // Render the updated watch list
        renderWatchList();
    }
}


window.addEventListener('DOMContentLoaded', renderWatchList)