//Overrides the Certification Edit Button
import { LightningElement ,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CertificationEditButtonOverride extends NavigationMixin(LightningElement)  
{
    @api recordId;
    @api showModal=false;
    handleSuccess()
    {
        this[NavigationMixin.Navigate]({            //if updation successful, navigates to record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Certification__c',
                actionName: 'view',
            },
        });

        this.dispatchEvent(                      //displays success message
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