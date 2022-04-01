import { LightningElement } from 'lwc';
import movieNightLogo from '@salesforce/resourceUrl/movienightLogo';

export default class NavBar extends LightningElement {

    isLoaded = false;
    mvlogo = movieNightLogo;

    searchMovie(){
        console.log('search clicked');
    }

    // async renderedCallback(){
    //     if(isLoaded) return;

        
    // }
}