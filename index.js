const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const movieAddBtns = document.querySelectorAll('.movie-add-btn')
const movies = document.querySelector('.movies-container');
const savedMovies = JSON.parse(localStorage.getItem('movies'))
let savedMoviesTitles = []
let watchListArr = [];

if(savedMovies.length > 0){
     savedMoviesTitles = savedMovies.map(movie => movie.Title); 
}

// Add click event to search btn
searchBtn.addEventListener('click', handleSearch);
search.addEventListener('keyup', e=>{
    if(e.keyCode === 13 ){
        handleSearch();
    }
});



//function that fetches search on click

function handleSearch(){
    movies.innerHTML = "";
    let movieTitles = [];
    let addedMovieTitles = [];
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=113edb72&s=${search.value}`)
    .then(res=> res.json())
    .then(data=>{
        if(data.Response !== 'False'){
            data.Search.forEach(element=>{
                movieTitles.push(element.Title)
            });
        }
        else{
            movies.innerHTML= `<div class="unavailable-container"><p class="unavailable">Unable to find what you're looking for. <br> Please try another search.</p></div>`
        }

        //loop through Titles array and fetch individual movie titles
        movieTitles.forEach(movieTitle => {
            fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=113edb72&t=${movieTitle}`)
            .then(res => res.json())
            .then(data=>{
                console.log('Processing data')
                const movieData = {
                    Image: data.Poster,
                    Title: data.Title,
                    Rating: data.imdbRating,
                    Genre: data.Genre,
                    Plot: data.Plot,
                    Runtime: data.Runtime
                }
                if(!addedMovieTitles.includes(movieData.Title)){
                addedMovieTitles.push(movieData.Title)
                watchListArr.push(movieData);
                renderSearchResult(movieData);
            }
            })
        })
    })
}

// Render searched movie results

function renderSearchResult(movieData){

    const {Title, Rating, Genre, Plot, Runtime} = movieData
    const Image = movieData.Image === "N/A" ? "/images/unavailable.jpg" : movieData.Image  
    let Icon, Disabled
    if(savedMoviesTitles.includes(Title)){
        Disabled = 'disabled';
        Icon = 'fa-circle-check';
    }else{
        Disabled = '';
        Icon = 'fa-circle-plus'
    }
    
    movies.innerHTML +=    
        `<div class="movie">
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
                        <button class="movie-add-btn" onclick="addToWatchList(event)" ${Disabled} ><i class="add-icon fa-solid ${Icon}"></i><span>Watchlist</span></button>
                    </div>
                    <p class="movie-plot">${Plot}</p>
                </div>
            </div>`
}

let myMovies = []



   
function addToWatchList(event) {
    console.log('adding to watchlist')
    const movieEl = event.target.closest('.movie');
    const title = movieEl.querySelector('.movie-title').textContent;

    // Get existing movies from local storage or create an empty array
    let myMovies = JSON.parse(localStorage.getItem('movies')) || [];
    
    // Find the movie to add from the watchListArr array
    const movieToAdd = watchListArr.find(movie => movie.Title === title);

    // Add the movie to the localMovies array if it exists
    if (movieToAdd) {
        myMovies.push(movieToAdd)
    }
   
    // Store the updated movies array in local storage
    localStorage.setItem('movies', JSON.stringify(myMovies))
    console.log('added to watchlist')
    
    const icon = movieEl.querySelector('.add-icon');
    const addBtn = movieEl.querySelector('.movie-add-btn');
    icon.classList.remove('fa-circle-plus');
    icon.classList.add('fa-circle-check');
    addBtn.disabled = true;
    
}

