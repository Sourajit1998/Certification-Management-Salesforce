//Custom Certification Request List view
import { LightningElement,track, wire } from 'lwc';
import searchCertificationRequests from '@salesforce/apex/FetchAllData.searchCertificationRequests';
import cert_reqResources from '@salesforce/resourceUrl/cert_reqResources'
import { NavigationMixin } from 'lightning/navigation';
// { refreshApex } from '@salesforce/apex';

export default class Certification_requestListView extends NavigationMixin(LightningElement)
{
    searchTerm = '';
    @track listViewResult;
    @track error;

    cert_reqIcon=cert_reqResources;               //icon to be used in lightning-tile

    wiredResult;

    @wire(searchCertificationRequests,{searchTerm: '$searchTerm'})     
    wiredCallback(result)
    {
        this.wiredResult=result;
        if(result.data)
        {
            this.listViewResult=result.data;
            this.error=undefined;
        }
        else if(result.error)
        {
            this.error=result.error;
            this.listViewResult=undefined;
        }
    }
    
    handleSearchTermChange(event) {                      //fired when Search field input changes
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;           //updates the values every 300 ms to avoid large number of server hits
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {                                   //Checks the length of the returned search results
		return (this.listViewResult.length > 0);
	}
    
    
    handleCertificationRequestView(event)               //fires when the detail button of lightning-tile is clicked
    {
        this[NavigationMixin.Navigate]({                //navigates to the respective record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Certification_Request__c',
                actionName: 'view',
            },
        });
    }
    /*
    connectedCallback() 
    {
        return refreshApex(this.wiredResult);
    }
    */
}
