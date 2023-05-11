


let baseURL = ''
let allGenres = ''
let rating = 0.0
let title = ''
let overview = ''
let fullImgPath = ''
let movieId = 0
let providersFlatrate = ''
let providersFree = ''



let page = 1
let voteAverageGreaterThan = 7
let voteCountGreaterThan = 10
let genreSearchBy = 12
let sortBy = 'popularity.desc'

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


document.querySelector('#button-top-rated').addEventListener('click', findTopRatedMovie)
document.querySelector('#button-action').addEventListener('click', function () {findGenreMovie(28)})
document.querySelector("#button-adventure").addEventListener('click', function() {findGenreMovie(12)}) 
document.querySelector("#button-animation").addEventListener('click', function() {findGenreMovie(16)}) 
document.querySelector("#button-comedy").addEventListener('click', function() {findGenreMovie(35)}) 
document.querySelector("#button-crime").addEventListener('click', function() {findGenreMovie(80)}) 
document.querySelector("#button-documentary").addEventListener('click', function() {findGenreMovie(99)}) 
document.querySelector("#button-drama").addEventListener('click', function() {findGenreMovie(18)}) 
document.querySelector("#button-family").addEventListener('click', function() {findGenreMovie(10751)}) 
document.querySelector("#button-fantasy").addEventListener('click', function() {findGenreMovie(14)}) 
document.querySelector("#button-history").addEventListener('click', function() {findGenreMovie(36)}) 
document.querySelector("#button-horror").addEventListener('click', function() {findGenreMovie(27)}) 
document.querySelector("#button-music").addEventListener('click', function() {findGenreMovie(10402)}) 
document.querySelector("#button-mystery").addEventListener('click', function() {findGenreMovie(9648)}) 
document.querySelector("#button-romance").addEventListener('click', function() {findGenreMovie(10749)}) 
document.querySelector("#button-science-fiction").addEventListener('click', function() {findGenreMovie(878)})
document.querySelector("#button-tv").addEventListener('click', function() {findGenreMovie(10770)})
document.querySelector("#button-thriller").addEventListener('click', function() {findGenreMovie(53)}) 
document.querySelector("#button-war").addEventListener('click', function() {findGenreMovie(10752)}) 
document.querySelector("#button-western").addEventListener('click', function() {findGenreMovie(37)}) 

function findTopRatedMovie(){
  clear()
  getImages()
  setTimeout(getTopRatedMovies, 400)
  setTimeout(getProviders, 1000)
  setTimeout(displayMovie, 3000)
}

function findGenreMovie(selectedGenre){
  clear()
  getImages()
  genreSearchBy = selectedGenre
  setTimeout(getGenreMovies, 400)
  setTimeout(getProviders, 1000)
  setTimeout(displayMovie, 3000)
}


function clear(){
  baseURL = ''
  allGenres = ''
  rating = 0.0
  title = ''
  overview = ''
  fullImgPath = ''
  movieId = 0
  providersFlatrate = ''
  providersFree = ''
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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWJhNjJjZjgzYTZhNTFhMzY3ZTkyNWRhNWQ0OTRkNCIsInN1YiI6IjY0NWE4Nzc5ZmUwNzdhNWNhZGY2NmEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd5cZQ23yl6pgvSWWr9r9Cdz7ESpv6Pru8tLvdRg_nI'
    }
  };
  
  fetch('https://api.themoviedb.org/3/configuration', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // console.log(data.images.base_url)
      // console.log(data.images.poster_sizes[2])
      const imgSize = 3
      console.log(`url should be: ${data.images.base_url}${data.images.poster_sizes[imgSize]}`)
      baseURL = `${data.images.base_url}${data.images.poster_sizes[imgSize]}`
    })
    .catch(err => console.error(err));
    
}


// Update to include pagination for MORE
function getTopRatedMovies(){
    const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=ceba62cf83a6a51a367e925da5d494d4`
    console.log(`base url is ${baseURL}`)

  fetch(urlTopRatedMovies)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
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
        const genreIds = data.results[randomSelection].genre_ids
        allGenres = lookUpGenre(genreArray.genres, genreIds)
        console.log(allGenres)
        fullImgPath = baseURL+data.results[randomSelection].poster_path
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

      
}


function getGenreMovies(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWJhNjJjZjgzYTZhNTFhMzY3ZTkyNWRhNWQ0OTRkNCIsInN1YiI6IjY0NWE4Nzc5ZmUwNzdhNWNhZGY2NmEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd5cZQ23yl6pgvSWWr9r9Cdz7ESpv6Pru8tLvdRg_nI'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&region=US&sort_by=${sortBy}&vote_average.gte=${voteAverageGreaterThan}&vote_count.gte=${voteCountGreaterThan}&with_genres=${genreSearchBy}`, options)
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
      const genreIds = data.results[randomSelection].genre_ids
      allGenres = lookUpGenre(genreArray.genres, genreIds)
      console.log(allGenres)
      fullImgPath = baseURL+data.results[randomSelection].poster_path
    
    })
    .catch(err => console.error(err));




}








console.log(`hi`)



function getProviders(){
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
      // console.log(response)
      if (response.results.US !== undefined){
        console.log(`Checking US providers`)
        console.log(response.results.US)
        // console.log(response.results.US.flatrate)
        // console.log(response.results.US.free)
        
        
        if (response.results.US.flatrate !== undefined){
          const flatrateArr = response.results.US.flatrate
          let flatrateList = []
          for (let i = 0; i < flatrateArr.length; i++){
            flatrateList.push(flatrateArr[i].provider_name)
          }
          providersFlatrate = flatrateList.join(', ')
          console.log(`providersFlatrate is ${providersFlatrate}`)
  
        } else{
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
          console.log(`No free`)
        }

      } else {
        console.log(`No US provider data`)
      }
    })
    .catch(err => console.error(err));

}


function displayMovie(){
  document.querySelector('#movie001-title').innerHTML = title
  document.querySelector('#movie001-rating').innerHTML = rating
  document.querySelector('#movie001-genre').innerHTML = allGenres
  document.querySelector('#movie001-overview').innerHTML = overview
  document.querySelector('#movie001-img').src = fullImgPath
  document.querySelector('#movie001-providers-flatrate').innerHTML = providersFlatrate
  document.querySelector('#movie001-providers-free').innerHTML = providersFree

}











