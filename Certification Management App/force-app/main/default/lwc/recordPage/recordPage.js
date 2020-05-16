//Record page-can be used for all Objects
import { LightningElement,api } from 'lwc';

export default class RecordPage extends LightningElement
{
    @api recordId;
    @api objectApiName;
}