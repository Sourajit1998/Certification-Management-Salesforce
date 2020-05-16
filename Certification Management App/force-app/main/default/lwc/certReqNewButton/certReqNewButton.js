//Custom Certification Request New button to be hidden or shown based on Profile
import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CertReqNewButton extends NavigationMixin(LightningElement)  
{
    @track certReqId;
    @track showModal=false;
    handleSuccess(event)
    {
        this.certReqId = event.detail.id;
        this[NavigationMixin.Navigate]({          //On success, navigate to the record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.certReqId,
                objectApiName: 'Certification_Request__c',
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