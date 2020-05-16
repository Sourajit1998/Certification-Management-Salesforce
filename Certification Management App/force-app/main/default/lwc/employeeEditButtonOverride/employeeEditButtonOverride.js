//Overrides the Employee Edit Button
import { LightningElement ,api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditButtonOverride extends NavigationMixin(LightningElement)  
{
    @api recordId;
    @api showModal=false;

    handleSuccess(event)
    {
        this[NavigationMixin.Navigate]({        //on success, navigates to the record detail page 
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Employee__c',
                actionName: 'view',
            },
        });

        this.dispatchEvent(                    //shows success message
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