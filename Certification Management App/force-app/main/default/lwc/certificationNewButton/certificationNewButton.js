//Custom Certification New button to be hidden or shown based on Profile
import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CertificationNewButton extends NavigationMixin(LightningElement)  
{
    @track certId;
    @track showModal=false;
    handleSuccess(event)
    {
        this.certId = event.detail.id;
        this[NavigationMixin.Navigate]({          //On success, navigate to the record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.certId,
                objectApiName: 'Certification__c',
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