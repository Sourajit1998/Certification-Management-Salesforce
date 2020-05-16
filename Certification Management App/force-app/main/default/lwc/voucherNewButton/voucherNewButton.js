//Custom Voucher New button to be hidden or shown based on Profile
import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class VoucherNewButton extends NavigationMixin(LightningElement)  
{
    @track vouId;
    @track showModal=false;
    handleSuccess(event)
    {
        this.vouId = event.detail.id;
        this[NavigationMixin.Navigate]({          //On success, navigate to the record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.vouId,
                objectApiName: 'Voucher__c',
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