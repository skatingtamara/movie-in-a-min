
let baseURL = ''
let allGenres = ''
let genreIds = []
let rating = 0.0
let title = ''
let overview = ''
let fullImgPath = ''
let movieId = 0
let providersFlatrate = ''
let providersFree = ''
let timerStart = 15
let seconds
let genreSearch = true
let genreSearchBy = 12

let savedMovieRating = 0.0
let savedMovieTitle = ''
let savedMovieGenre = ''
let savedMovieOverview = ''
let savedMovieMovieId = 0
let savedMovieProvidersFlatrate = ''
let savedMovieProvidersFree = ''
let savedMovieFullImgPath = ''

// Search options
let page = 1
let voteAverageGreaterThan = 7
let voteCountGreaterThan = 100
let sortBy = 'popularity.desc'

// Language options for later
let language = 'en-US'
let original_language = 'en' 
const imgSize = 3


const genreArray = {
  "genres": [
      {
          "id": 28,
          "name": "Action"
      },
      {
          "id": 12,
          "name": "Adventure"
      },
      {
          "id": 16,
          "name": "Animation"
      },
      {
          "id": 35,
          "name": "Comedy"
      },
      {
          "id": 80,
          "name": "Crime"
      },
      {
          "id": 99,
          "name": "Documentary"
      },
      {
          "id": 18,
          "name": "Drama"
      },
      {
          "id": 10751,
          "name": "Family"
      },
      {
          "id": 14,
          "name": "Fantasy"
      },
      {
          "id": 36,
          "name": "History"
      },
      {
          "id": 27,
          "name": "Horror"
      },
      {
          "id": 10402,
          "name": "Music"
      },
      {
          "id": 9648,
          "name": "Mystery"
      },
      {
          "id": 10749,
          "name": "Romance"
      },
      {
          "id": 878,
          "name": "Science Fiction"
      },
      {
          "id": 10770,
          "name": "TV Movie"
      },
      {
          "id": 53,
          "name": "Thriller"
      },
      {
          "id": 10752,
          "name": "War"
      },
      {
          "id": 37,
          "name": "Western"
      }
  ]
}




document.querySelector('#button-top-rated').addEventListener('click', function() {findTopRatedMovie(), startTimer()})
document.querySelector('#button-action').addEventListener('click', function () {  findGenreMovie(28), startTimer()})
document.querySelector("#button-adventure").addEventListener('click', function() {findGenreMovie(12), startTimer()}) 
document.querySelector("#button-animation").addEventListener('click', function() {findGenreMovie(16), startTimer()}) 
document.querySelector("#button-comedy").addEventListener('click', function() {findGenreMovie(35), startTimer()}) 
document.querySelector("#button-crime").addEventListener('click', function() {findGenreMovie(80), startTimer()}) 
document.querySelector("#button-documentary").addEventListener('click', function() {findGenreMovie(99), startTimer()}) 
document.querySelector("#button-drama").addEventListener('click', function() {findGenreMovie(18), startTimer()}) 
document.querySelector("#button-family").addEventListener('click', function() {findGenreMovie(10751), startTimer()}) 
document.querySelector("#button-fantasy").addEventListener('click', function() {findGenreMovie(14), startTimer()}) 
document.querySelector("#button-history").addEventListener('click', function() {findGenreMovie(36), startTimer()}) 
document.querySelector("#button-horror").addEventListener('click', function() {findGenreMovie(27), startTimer()}) 
document.querySelector("#button-music").addEventListener('click', function() {findGenreMovie(10402), startTimer()}) 
document.querySelector("#button-mystery").addEventListener('click', function() {findGenreMovie(9648), startTimer()}) 
document.querySelector("#button-romance").addEventListener('click', function() {findGenreMovie(10749), startTimer()}) 
document.querySelector("#button-science-fiction").addEventListener('click', function() {findGenreMovie(878), startTimer()})
document.querySelector("#button-tv").addEventListener('click', function() {findGenreMovie(10770), startTimer()})
document.querySelector("#button-thriller").addEventListener('click', function() {findGenreMovie(53), startTimer()}) 
document.querySelector("#button-war").addEventListener('click', function() {findGenreMovie(10752), startTimer()}) 
document.querySelector("#button-western").addEventListener('click', function() {findGenreMovie(37), startTimer()}) 

function startTimer(){
  // check if the timer already started
  if(!seconds){
    seconds = timerStart
    let t = setInterval( function(){
      document.querySelector('#timer').innerHTML = ':'+ String(seconds).padStart(2, '0')
      seconds--
      // console.log(`seconds: ${seconds}`)
  
      // trigger UI as time decreases
      if(seconds >= 15){
        document.querySelector('body').style.backgroundColor = '#EEEEEE'
      } else if(seconds >= 10){
        document.querySelector('body').style.backgroundColor = '#F9B5D0'
      } else if(seconds >= 5){
        document.querySelector('body').style.backgroundColor = '#FF8E9E'
      } else if(seconds <= 0){
        document.querySelector('body').style.backgroundColor = '#FF597B'
        clearInterval(t)
        seconds = null
        document.querySelector('#timer').innerHTML = '1:00'
      }
    }, 1000)

  }

}

// to add later.
function storeSearchOptions(resolve){
  console.log(`storeSearchOptions() start`)
  // page = document.querySelector('#page-number').value
  // voteAverageGreaterThan = document.querySelector('#rating-min').value
  // voteCountGreaterThan = document.querySelector('#vote-count-min').value
  // sortBy = document.querySelector('#sort-by').value
  console.log(`page is ${page}, rating-min is ${voteAverageGreaterThan}, vote-count-min is ${voteCountGreaterThan} `)
  resolve()
  console.log(`storeSearchOptions() end`)
}


function findTopRatedMovie(){

  const searchOptionsPromise = new Promise((resolve,reject) => {
    console.log('step 1')
    storeSearchOptions(resolve)
  })

  searchOptionsPromise.then(() =>{
    clearPromise
  })

  const clearPromise = new Promise((resolve, reject) => {
    console.log(`step 2`)
    genreSearch = false
    clear(resolve)
  })

  clearPromise.then(() => {
    getImages()
    console.log(`clearPromise finished`)
  })
  
}

function findGenreMovie(selectedGenre){

  const searchOptionsPromise = new Promise((resolve,reject) => {
    console.log('step 1')
    storeSearchOptions(resolve)
  })

  searchOptionsPromise.then(() =>{
    clearPromise
  })

  const clearPromise = new Promise((resolve, reject) => {
    console.log(`step 1`)
    clear(resolve)
    genreSearchBy = selectedGenre
  })

  clearPromise.then(() => {
    getImages()
    console.log(`clearPromise finished`)
  })
  
}


function clear(resolve){
  console.log(`clear() start`)
  baseURL = ''
  allGenres = ''
  genreIds = []
  rating = 0.0
  title = ''
  overview = ''
  fullImgPath = ''
  movieId = 0
  providersFlatrate = ''
  providersFree = ''
  resolve()
  console.log(`clear() end`)
}



function lookUpGenre( arr, nums){
  let genreList = []
  for (let i = 0; i < nums.length; i++){
    for (let key in arr){
      if(arr[key].id === nums[i]){
        genreList.push(arr[key].name)
      } 
    }
  }
  if (nums.length > genreList.length){
    genreList.push(`missing genre`)

  }
  return genreList.join(', ')
}


function getImages(){
  console.log(`getImages() start`)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWJhNjJjZjgzYTZhNTFhMzY3ZTkyNWRhNWQ0OTRkNCIsInN1YiI6IjY0NWE4Nzc5ZmUwNzdhNWNhZGY2NmEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd5cZQ23yl6pgvSWWr9r9Cdz7ESpv6Pru8tLvdRg_nI'
    }
  };
  
  fetch('https://api.themoviedb.org/3/configuration', options)
    .then((data) => data.json())
    .then((data, resolve) => {
      console.log(data)
      console.log(`getImages function: url should be: ${data.images.base_url}${data.images.poster_sizes[imgSize]}`)
      baseURL = `${data.images.base_url}${data.images.poster_sizes[imgSize]}`
      console.log(`getImages() end`)
    })
    .then(() => {
      if(genreSearch === true){
        getGenreMovies()
      } else{
        getTopRatedMovies()
      }

    }
    )
    .catch(err => console.error(err));
    
}






function getTopRatedMovies(){
  console.log(`getTopRatedMovies() start`)
  // const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=ceba62cf83a6a51a367e925da5d494d4`
  console.log(`getTopRatedMovies function: base url is ${baseURL}`)


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWJhNjJjZjgzYTZhNTFhMzY3ZTkyNWRhNWQ0OTRkNCIsInN1YiI6IjY0NWE4Nzc5ZmUwNzdhNWNhZGY2NmEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd5cZQ23yl6pgvSWWr9r9Cdz7ESpv6Pru8tLvdRg_nI'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=${page}&region=US`, options)
    .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));

  // fetch(urlTopRatedMovies)
  //     .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(`getTopRatedMovies function body is running`)
        console.log(data)
        console.log(data.total_results)
        let randomSelection = Math.floor(Math.random()*20)
        console.log(randomSelection)
        movieId = data.results[randomSelection].id
        console.log(`movieId is ${movieId}`)
        console.log(data.results[randomSelection].title)
        title = data.results[randomSelection].title
        overview = data.results[randomSelection].overview
        rating = data.results[randomSelection].vote_average
        genreIds = data.results[randomSelection].genre_ids
        fullImgPath = baseURL+data.results[randomSelection].poster_path
        console.log(`getTopRatedMovies() body end`)
      })
      .then(() => {
        allGenres = lookUpGenre(genreArray.genres, genreIds)
        console.log(allGenres)
      })
      .then( () => {
        getProviders()
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

      
}


function getGenreMovies(){
  console.log(`getGenreMovies() start`)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWJhNjJjZjgzYTZhNTFhMzY3ZTkyNWRhNWQ0OTRkNCIsInN1YiI6IjY0NWE4Nzc5ZmUwNzdhNWNhZGY2NmEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd5cZQ23yl6pgvSWWr9r9Cdz7ESpv6Pru8tLvdRg_nI'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&region=US&sort_by=${sortBy}&vote_average.gte=${voteAverageGreaterThan}&vote_count.gte=${voteCountGreaterThan}&with_genres=${genreSearchBy}&with_original_language=${original_language}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(`DISCOVERY:`)
      console.log(data)

      console.log(data.total_results)
      let randomSelection = Math.floor(Math.random()*20)
      console.log(randomSelection)
      movieId = data.results[randomSelection].id
      console.log(`movieId is ${movieId}`)
      console.log(data.results[randomSelection].title)
      title = data.results[randomSelection].title
      overview = data.results[randomSelection].overview
      rating = data.results[randomSelection].vote_average
      genreIds = data.results[randomSelection].genre_ids
      fullImgPath = baseURL+data.results[randomSelection].poster_path
      console.log(`gerGenreMovies() body end`)
    })
    .then( () => {
      allGenres = lookUpGenre(genreArray.genres, genreIds)
      console.log(allGenres)
    })
    .then( () => {
      getProviders()
    })
    .catch(err => console.error(err));

}




function getProviders(){
  console.log(`getProviders() start`)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWJhNjJjZjgzYTZhNTFhMzY3ZTkyNWRhNWQ0OTRkNCIsInN1YiI6IjY0NWE4Nzc5ZmUwNzdhNWNhZGY2NmEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd5cZQ23yl6pgvSWWr9r9Cdz7ESpv6Pru8tLvdRg_nI'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, options)
    .then(response => response.json())
    .then(response => {
      if (response.results.US !== undefined){
        console.log(`Checking US providers`)
        console.log(response.results.US)
        
        if (response.results.US.flatrate !== undefined){
          const flatrateArr = response.results.US.flatrate
          let flatrateList = []
          for (let i = 0; i < flatrateArr.length; i++){
            flatrateList.push(flatrateArr[i].provider_name)
          }
          providersFlatrate = flatrateList.join(', ')
          console.log(`providersFlatrate is ${providersFlatrate}`)
  
        } else{
          providersFlatrate = 'You need to rent or buy it'
          console.log(`No flatrate`)
        }
  
        if(response.results.US.free !== undefined){ 
          const freeArr = response.results.US.free
          console.log(freeArr)
          let freeList = []
        
          for (let j = 0; j < freeArr.length; j++){
            freeList.push(freeArr[j].provider_name)
          }
          providersFree = freeList.join(', ')
          console.log(`providersFree is ${providersFree}`)
  
        } else{
          providersFree = 'Sorry, this aint free'
          console.log(`No free`)
        }

      } else {
        console.log(`No US provider data`)
        providersFree = 'Sorry, this aint free'
        providersFlatrate = 'You need to rent or buy it'
      }
      console.log(`getProviders() body end`)
    })
    .then(() =>{
      displayMovie()
    })
    .catch(err => console.error(err));

}


function displayMovie(){
  console.log(`displayMovie() start`)
  document.querySelector('#movie001-title').innerHTML = title
  document.querySelector('#movie001-rating').innerHTML = rating
  document.querySelector('#movie001-genre').innerHTML = allGenres
  document.querySelector('#movie001-overview').innerHTML = overview
  document.querySelector('#movie001-img').src = fullImgPath
  document.querySelector('#movie001-providers-flatrate').innerHTML = providersFlatrate
  document.querySelector('#movie001-providers-free').innerHTML = providersFree
  // unhide the save movie button
  document.querySelector('#hidden-save-button').style.display = "block"
  document.querySelector('#hidden-save-button').addEventListener('click', saveMovie)
  console.log(`displayMovie() end`)
}

function saveMovie(){
  savedMovieRating = rating
  savedMovieTitle = title
  savedMovieOverview = overview
  savedMovieGenre = allGenres
  savedMovieMovieId = movieId
  savedMovieProvidersFlatrate = providersFlatrate
  savedMovieProvidersFree = providersFree
  savedMovieFullImgPath = fullImgPath

  // unhide the saved movie section and add saved movie there
  document.querySelector('.best-so-far').style.display = "flex"
  document.querySelector('#saved-movie-title').innerHTML = savedMovieTitle
  document.querySelector('#saved-movie-rating').innerHTML = savedMovieRating
  document.querySelector('#saved-movie-genre').innerHTML = savedMovieGenre
  document.querySelector('#saved-movie-overview').innerHTML = savedMovieOverview
  document.querySelector('#saved-movie-img').src = savedMovieFullImgPath
  document.querySelector('#saved-movie-providers-flatrate').innerHTML = savedMovieProvidersFlatrate
  document.querySelector('#saved-movie-providers-free').innerHTML = savedMovieProvidersFree
}










