import { LightningElement, track } from 'lwc';
import getTrainDetails from '@salesforce/apex/TrainDetails.getTrainDetails';

const columns = [
    { label: 'Station Name', fieldName: 'station_name' },
    { label: 'Timing', fieldName: 'timing' },
    { label: 'Delay', fieldName: 'delay' },
    { label: 'Platform', fieldName: 'platform' },
    { label: 'Halt', fieldName: 'halt' },
    { label: 'Distance', fieldName: 'distance' },
];

export default class TrainDetails extends LightningElement {
    @track inputTrainNo = '';
    @track showTrainDetails = false;
    @track showSpinner = false;
    @track trainDetails = {};
    columns = columns;
    @track inputError = false;

    changeHandler(event) {
        this.inputTrainNo = event.target.value;
        this.inputError = false; 
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.clickHandler();
        }
    }

    clickHandler() {
        if (!this.inputTrainNo.trim()) {
            this.inputError = true;
            return;
        }

        this.showSpinner = true;
        this.showTrainDetails = false;
        console.log('Input Train Number:', this.inputTrainNo);
        getTrainDetails({ trainNo: this.inputTrainNo }).then(result => {
            this.showSpinner = false;
            this.showTrainDetails = true;
            this.trainDetails = result;
        }).catch(error => {
            this.showSpinner = false;
            this.showTrainDetails = false;
            console.error('Error fetching train details:', error);
        });
    }
}
