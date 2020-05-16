//Custom list view of Certifications
import { LightningElement,track, wire } from 'lwc';
import searchCertifications from '@salesforce/apex/FetchAllData.searchCertifications';
import certResource from '@salesforce/resourceUrl/certificationResources'
import { NavigationMixin } from 'lightning/navigation';
//import { refreshApex } from '@salesforce/apex';

export default class CertificationsListView extends NavigationMixin(LightningElement)
{
    searchTerm = '';
    @track listViewResult;
    @track error;

    certIcon=certResource;              //image used in lightning-tile

    wiredResult;

    @wire(searchCertifications,{searchTerm: '$searchTerm'})
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

    handleSearchTermChange(event) {                     //fired when search input value changes
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {          //delays so as to avoid large number of server calls
			this.searchTerm = searchTerm;             
		}, 300);
	}
	get hasResults() {
		return (this.listViewResult.length > 0);        //length of the returned Search results
	}
    
    handleCertificationView(event)
    {
        this[NavigationMixin.Navigate]({               //navigates to the record detail page on detail button click
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Certification__c',
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
