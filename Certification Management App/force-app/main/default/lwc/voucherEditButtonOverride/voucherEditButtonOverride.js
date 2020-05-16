//Override the Voucher Edit button
import { LightningElement ,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class VoucherEditButtonOverride extends NavigationMixin(LightningElement)  
{
    @api recordId;
    @api showModal=false;

    handleSuccess()
    {
        this[NavigationMixin.Navigate]({            //On success, navigate to the record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Voucher__c',
                actionName: 'view',
            },
        });

        this.dispatchEvent(                         //shows success message
            new ShowToastEvent({
                title: 'Success',
                message: 'Record updated',
                variant: 'success'
            })
        );
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }  
}