import { LightningElement, api } from 'lwc';

export default class SearchCanvas extends LightningElement {

    @api searchValue;
    @api searchResults = [];
    @api imageBaseUrl;

    goToHomeFn(){
        this.dispatchEvent(new CustomEvent('gohome'));
    }
}