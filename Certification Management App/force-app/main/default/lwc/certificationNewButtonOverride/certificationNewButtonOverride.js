//Overrides the Certification New Button
import { LightningElement,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CertificationNewButtonOverride extends NavigationMixin(LightningElement)  
{
    @track certId;
    @api showModal=false;
    handleSuccess(event)
    {
        this.certId = event.detail.id;
        this[NavigationMixin.Navigate]({                      //on success, navigates to record detail page
            type: 'standard__recordPage',
            attributes: {
                recordId: this.certId,
                objectApiName: 'Certification__c',
                actionName: 'view',
            },
        });
        this.dispatchEvent(
            new ShowToastEvent({                          //displays success message
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
                objectApiName: 'Certification__c',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            }
        });
    }
    
}
