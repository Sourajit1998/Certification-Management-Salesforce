//Custom Employee New button to be hidden or shown based on Profile
import { LightningElement, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class NewButton extends NavigationMixin(LightningElement)  
{
    @track empId;
    @track showModal=false;
    handleSuccess(event)
    {
        this.empId = event.detail.id;
        this[NavigationMixin.Navigate]({          //On success, navigate to the record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.empId,
                objectApiName: 'Employee__c',
                actionName: 'view',
            },
        });
        this.dispatchEvent(                      //show success message
            new ShowToastEvent({
                title: 'Success',
                message: 'Record created',
                variant: 'success'
            })
        );
       // eval("$A.get('e.force:refreshView').fire();");
    }
    
    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}