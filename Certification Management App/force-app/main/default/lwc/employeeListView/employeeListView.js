//Custom list view for displaying Employees
import { LightningElement,track, wire } from 'lwc';
import searchEmployees from '@salesforce/apex/FetchAllData.searchEmployees';
import empResource from '@salesforce/resourceUrl/empResources'
import { NavigationMixin } from 'lightning/navigation';
//import { refreshApex } from '@salesforce/apex';


export default class EmployeeListView extends NavigationMixin(LightningElement)
{
    searchTerm = '';
    @track listViewResult;
    @track error;

    empIcon=empResource;            //icon for lightning-tile

    wiredResult;

    @wire(searchEmployees,{searchTerm: '$searchTerm'})
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

    handleSearchTermChange(event) {                   //fired when search input value changes
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {                                //checks the length of the returned Search results
		return (this.listViewResult.length > 0);
	}
    
    handleEmployeeView(event)               
    {
        this[NavigationMixin.Navigate]({           //navigates to the Record Detail page on Detail button
            type: 'standard__recordPage',          //click in lightning-tile
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Employee__c',
                actionName: 'view',
            },
        });
    }
    /*
    connectedCallback() 
    {
        //return refreshApex(this.wiredResult);
        eval("$A.get('e.force:refreshView').fire();");
    }
    */
    
    
}
