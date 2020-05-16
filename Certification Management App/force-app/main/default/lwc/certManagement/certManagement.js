//Uses lightning tabset with tabs- respective components are rendered based on tab click
import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CertManagement extends NavigationMixin(LightningElement) 
{
    employeeIsSelected=false;
    voucherIsSelected=false;
    certRequestIsSelected=false;
    certificationIsSelected=false;
    handleActive(event) 
    {
        const tab = event.target.label;                  //fetches the active tab's label
        if(tab=='Employees')
        {
            this.employeeIsSelected=true;                //sets the active tab component to true and others to false
            this.voucherIsSelected=false;
            this.certRequestIsSelected=false;
            this.certificationIsSelected=false;
        }
        if(tab=='Vouchers')
        {
            this.voucherIsSelected=true;
            this.employeeIsSelected=false;
            this.certRequestIsSelected=false;
            this.certificationIsSelected=false;
        }
        if(tab=='Certification Requests')
        {
            this.certRequestIsSelected=true;
            this.voucherIsSelected=false;
            this.employeeIsSelected=false;
            this.certificationIsSelected=false;
        }
        if(tab=='Certifications')
        {
            this.certificationIsSelected=true;
            this.voucherIsSelected=false;
            this.employeeIsSelected=false;
            this.certRequestIsSelected=false;
        }
    }
    
}