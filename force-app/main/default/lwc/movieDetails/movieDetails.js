import { LightningElement, api } from 'lwc';
import util from 'c/utils';

export default class MovieDetails extends LightningElement {

    @api movieDetails;
    @api imageBaseUrl;
    @api backdropBaseUrl;

    rendered = false;
    
    get posterImageSource(){
        return this.imageBaseUrl + this.movieDetails.poster_path;
    }

    get backdropImageSource(){
        return this.backdropBaseUrl + this.movieDetails.backdrop_path;
    }

    get certification(){
        if(this.movieDetails.release_dates === null) return '--'
        let usCert = this.movieDetails.release_dates.results.find(release => release.iso_3166_1 === 'US');
        // if 'US' cert found
        if(usCert) return usCert.release_dates[0].certification;
        // else
        return 'Not Rated';
  
    }
    get casts(){
        let castMems = this.movieDetails.cast.map(cst => cst.name);
        return castMems.join(', ');
    }
    get genre(){
        let gList = this.movieDetails.genres.map(g => g.name);
        return gList.join(', ');
    }
    get releaseDate(){
        return util.displayDate(this.movieDetails.release_date);
    }

    goBackFn(){
        this.dispatchEvent(new CustomEvent('goback'));
    }

    renderedCallback(){
        if(this.rendered) return;
        this.rendered = true;
    }

    //https://image.tmdb.org/t/p/w500/odVv1sqVs0KxBXiA8bhIBlPgalx.jpg
    //https://image.tmdb.org/t/p/w500/ejgC2lEmuGXiP0A1LvwNezUjNmt.jpg
}
