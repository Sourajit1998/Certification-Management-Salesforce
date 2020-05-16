//Custom list view for displaying Vouchers
import { LightningElement,track, wire } from 'lwc';
import searchVouchers from '@salesforce/apex/FetchAllData.searchVouchers';
import voucherResources from '@salesforce/resourceUrl/voucherResources'
import { NavigationMixin } from 'lightning/navigation';
//import { refreshApex } from '@salesforce/apex';

export default class VoucherListView extends NavigationMixin(LightningElement)
{
    searchTerm = '';
    @track listViewResult;
    @track error;

    voucherIcon=voucherResources;              //icon used in lightning-tile

    wiredResult;

    @wire(searchVouchers,{searchTerm: '$searchTerm'})
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

    handleSearchTermChange(event) {
        window.clearTimeout(this.delayTimeout);                //fired when search input value changes
		const searchTerm = event.target.value;                 //delay of 300 ms to minimize the number of server calls
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.listViewResult.length > 0);              //checks the length of the returned Search results
	}
    
    handleVoucherView(event)
    {
        this[NavigationMixin.Navigate]({                    //navigates to Record detail page when Details button 
            type: 'standard__recordPage',                   //in lightning-tile is clicked
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Voucher__c',
                actionName: 'view',
            },
        });
    }
    /*
    connectedCallback() 
    {
        return refreshApex(this.wiredResult);
        return refreshApex(this.wiredResult,{searchTerm: '$searchTerm'})
    }
    */    
}
