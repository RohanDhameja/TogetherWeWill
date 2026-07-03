/**
* @File Name : twwHomePage.js
* @Description : Controller for TWW Home Page LWC - Handles navigation
* @Author : Accenture
* @Last Modified By :
* @Last Modified On :
* @Modification Log :
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TwwHomePage extends NavigationMixin(LightningElement) {
    
    /**
     * Navigate to Donate page
     */
    navigateToDonate() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Donate__c'
            }
        });
    }
    
    /**
     * Navigate to Volunteer page
     */
    navigateToVolunteer() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Volunteer__c'
            }
        });
    }
}