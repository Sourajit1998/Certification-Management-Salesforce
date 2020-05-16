//Overrides the Certification Request Edit Button
import { LightningElement ,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Certification_requestEditButtonOverride extends NavigationMixin(LightningElement)  
{
    @api recordId;
    @api showModal=false;

    handleSuccess()                                   //if updation is successful
    {
        this[NavigationMixin.Navigate]({              //navigate to record detail page on Record updation
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Certification_Request__c',
                actionName: 'view',
            },
        });

        this.dispatchEvent(                           //display message on record updation
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