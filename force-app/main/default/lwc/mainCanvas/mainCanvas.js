import { LightningElement } from 'lwc';

export default class MainCanvas extends LightningElement {

    sample = null;
    imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
    backdropBaseUrl = 'https://image.tmdb.org/t/p/original'
    trendingMovies = [];
    inTheaters = [];
    popularFamily = [];
    popularComedy = [];
    popularAction = [];
    movieDetails = null;

    searchResults = [];
    searchValue = '';
    showSearch = false;
    showMovieDetails = false;
    showPosterAndGroups = true;

    isLoading = true;

    backRef = 'home page';

    goBackPageFn(e) {
        this.showMovieDetails = false;
        if(this.backRef === 'home page') {
            this.showSearch = false;
            this.showPosterAndGroups = true;
        } else {
            this.showSearch = true;
            this.showPosterAndGroups = false;
        }
    }

    returnToHomeFn(){
        window.scrollTo(0, 0);
        this.showSearch = false;
        this.showPosterAndGroups = true;
        this.showMovieDetails = false;
        this.searchValue = '';
        this.backRef = 'home page';

    }

    async searchMoviesFn(e){

        window.scrollTo(0, 0);

        let searchQuery = e.detail.trim();

        if(searchQuery === '') {
            this.searchValue = '';
            this.searchResults = [];
            this.showSearch = true;
            return;
        };

        this.searchValue = searchQuery;
        this.isLoading = true;

        const getUrl = (query, page) => {
            return `https://api.themoviedb.org/3/search/movie?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&query=${query}&page=${page}&include_adult=false`;
        }

        try {
            let responses = await Promise.all([
                fetch(getUrl(searchQuery, 1)),
                fetch(getUrl(searchQuery, 2)),
                fetch(getUrl(searchQuery, 3)),
            ])
            let [page1, page2, page3] = responses;
            page1 = await page1.json();
            page2 = await page2.json();
            page3 = await page3.json();
            this.searchResults = [
                ...page1.results,
                ...page2.results,
                ...page3.results ];
            this.showSearch = true;
            this.showPosterAndGroups = false;
            this.showMovieDetails = false;
            this.isLoading = false;

        } catch(e) {
            console.log('error', e)
            this.searchResults = [];
            this.showSearch = true;
            this.showPosterAndGroups = false;
            this.showMovieDetails = false;
            this.isLoading = false;
        }
    }

    async fetchMovieDetailsFn(e) {
        window.scrollTo(0, 0); //! ========================

        this.backRef = e.detail.backRef;

        let castUrl = `https://api.themoviedb.org/3/movie/${e.detail.movieId}/credits?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US`

        let movieUrl = `https://api.themoviedb.org/3/movie/${e.detail.movieId}?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&append_to_response=release_dates`


        try {
            let responses = await Promise.all([
                fetch(castUrl),
                fetch(movieUrl)
            ]);
            let [cast, movieD] = responses;
            cast = await cast.json();
            movieD = await movieD.json();

            let popularCasts = cast.cast.slice(0, 7);

            this.movieDetails = {
                ...movieD,
                cast: popularCasts
            }

            this.showSearch = false;
            this.showPosterAndGroups = false;
            this.showMovieDetails = true;
            
        } catch(e) {
            console.log('error', e);
            this.goBackPageFn();
        }
    }


    async connectedCallback(){

        let trendingURl =
        'https://api.themoviedb.org/3/trending/movie/week?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&page=1';

        let theatersUrl =
        'https://api.themoviedb.org/3/movie/now_playing?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&page=1&region=US&with_release_type=3';

        let familyUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10751';

        let comedyUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=35';

        let actionUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=b25128a9d00e31558df330afc5baa50b&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=28';

        this.isLoading = true;

        try {
            let responses = await Promise.all([
                fetch(trendingURl),
                fetch(theatersUrl),
                fetch(familyUrl),
                fetch(comedyUrl),
                fetch(actionUrl),
            ])
            let [trending, inTh, fam, com, act ] = responses;
            trending = await trending.json();
            inTh = await inTh.json();
            fam = await fam.json();
            com = await com.json();
            act = await act.json();
            this.trendingMovies = trending.results;
            this.inTheaters = inTh.results;
            this.popularFamily = fam.results;
            this.popularComedy = com.results;
            this.popularAction = act.results;
            this.isLoading = false;
        } catch (e) {
            console.log(e);    
            this.isLoading = false;    
        }
    }
}



/*

components =====

+ navBar  - brand, movie( genres ) search bar
+ poster 
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
