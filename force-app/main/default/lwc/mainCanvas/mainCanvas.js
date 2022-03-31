import { LightningElement } from 'lwc';

export default class MainCanvas extends LightningElement {

    sample = null;

    async connectedCallback(){

        let url =
        'https://api.themoviedb.org/3/trending/movie/week?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&';

        try {
            let response = await fetch(url);
            let data = await response.json();
            console.log(data);

            this.sample = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`
        } catch (e) {
            console.log(e);        
        }
    }
}



/*

components =====

navBar  - brand, movie( genres ) search bar
banner with search
groupSet
movieCard
movieDetails
searchResultCanvas
footer


groupSets ====================
1. Trending movies
2. In Theaters
3. Popular family movies
4. Popular Comedy movies
5. Popular Action movies




let apikey = '?api_key=b25128a9d00e31558df330afc5baa50b';
let baseUrl = 'https://api.themoviedb.org/3';
let endpoint1 = '/trending/movie/week';

// in theaters
let url =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&page=1';

// trending
url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&';

// popular
let url2 =
    'https://api.themoviedb.org/3/movie/popular?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&page=2';

let init = async () => {
    try {
        // let response = await fetch(url);
        let response = await fetch(
            'https://api.themoviedb.org/3/movie/624860/videos?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US'
        );
        let data = await response.json();
        // console.log(data.results[0].genre_ids);
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};

init();

 *
 * Trending This Week
 *
 * Popular in Streaming
 * https://api.themoviedb.org/3/movie/popular?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&page=1
 *
 * In Theaters
 * https://api.themoviedb.org/3/movie/now_playing?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&page=1
 *
 * Movie detail query
 * https://api.themoviedb.org/3/movie/343611?api_key={api_key}
 *
 * Search movie
 * https://api.themoviedb.org/3/search/movie?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&query=matr&page=1&include_adult=false
 *
 * genre list
 * https://api.themoviedb.org/3/genre/movie/list?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US
 *
 * videos
 *
 * https://api.themoviedb.org/3/movie/624860/videos?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US
 *
 * 
 * Search family movies
 * 
 * https://api.themoviedb.org/3/discover/movie?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10751
 * 
 */

//! IMAGE
// https://image.tmdb.org/t/p/original/8c4a8kE7PizaGQQnditMmI1xbRp.jpg
// https://image.tmdb.org/t/p/original/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg
/*
Original is the biggest picture.
If you want smaller sizes, you can use the parameters in the table below.
For example:
https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
https://image.tmdb.org/t/p/w300/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
or with a poster
https://image.tmdb.org/t/p/w92/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
https://image.tmdb.org/t/p/w154/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
https://image.tmdb.org/t/p/w185/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
https://image.tmdb.org/t/p/w342/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
https://image.tmdb.org/t/p/w500/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
https://image.tmdb.org/t/p/w780/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
https://image.tmdb.org/t/p/original/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg


 * {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ]
}


*/
