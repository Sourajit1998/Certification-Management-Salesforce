//Overrides the Certification Request New Button
import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CertificationRequestNewButtonOverride extends NavigationMixin(LightningElement)  
{
    @track certReqId;
    @api showModal=false;
    handleSuccess(event)
    {
        this.certReqId = event.detail.id;                    
        this[NavigationMixin.Navigate]({                    //On success, navigates to record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.certReqId,
                objectApiName: 'Certification_Request__c',
                actionName: 'view',
            },
        });
        this.dispatchEvent(                                 //displays success message
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
                objectApiName: 'Certification_Request__c',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            }
        });
    }
}
