//Overrides the Voucher New Button
import { LightningElement,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class VoucherNewButtonOverride extends NavigationMixin(LightningElement)  
{
    @track voucherId;
    @api showModal=false;
    handleSuccess(event)
    {
        this.voucherId = event.detail.id;
        this[NavigationMixin.Navigate]({             //On success, navigates to the Record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.voucherId,
                objectApiName: 'Voucher__c',
                actionName: 'view',
            },
        });
        this.dispatchEvent(                        //shows success message
            new ShowToastEvent({
                title: 'Success',
                message: 'Record created',
                variant: 'success'
            })
        );
    }
    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Voucher__c',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            }
        });
    }
}