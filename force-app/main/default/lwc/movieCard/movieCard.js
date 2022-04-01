import { LightningElement, api } from 'lwc';

export default class MovieCard extends LightningElement {
    @api imageBaseUrl;
    @api movieObj;

    displayDate(dateString) {
        if (dateString === '' || dateString === undefined || dateString === null) return '';
        let monthList = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
    
        let [year, month, date] = dateString.split('-'); // year, month, date
    
        return `${monthList[Number(month) - 1]} ${date}, ${year}`;
    };
    
    get posterImageSource(){
        return this.imageBaseUrl + this.movieObj.poster_path;
    }

    get releaseDate() {
        return this.displayDate(this.movieObj.release_date);
    }
}