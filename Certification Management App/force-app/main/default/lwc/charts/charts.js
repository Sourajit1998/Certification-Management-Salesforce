//Responsive bar chart using Chart.js
import { LightningElement,wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import ChartJS from "@salesforce/resourceUrl/ChartJS";
import getCount from '@salesforce/apex/ChartDataClass.getCountOfPassedResources';

//file needs to be uploaded to Static Resources first and then should be imported here

export default class ChartDemo extends LightningElement {
    chartJSLoaded;
    chart;
    val=[];
    labelset=[];
    dataset=[];
    bgColor=[];
    bordColor=[];
    
    @wire(getCount)
    wiredCallback(result)
    {
        //console.log(result);
        if(result.data)
        {
            this.val=result.data;
            console.log("Value:"+this.val);
            this.val.forEach(key => 
                {
                    this.labelset.push(key.label);         //fetches the data from wire and pushes into local array var
                    this.dataset.push(key.count);
                    
            });
            console.log("Labelset:"+this.labelset);
            console.log("Dataset:"+this.dataset);
        }
    }
    constructor() {
        super();
        this.chartJSLoaded = false;
    }

    renderedCallback() {
        if (!this.chartJSLoaded) {
            loadScript(this, ChartJS)
                .then(() => {
                    this.chartJSLoaded = true;
                    
                    var labels1=this.labelset;
                    var data1=this.dataset;
                    
                    labels1.forEach(element => 
                        {
                            this.bgColor.push(this.getRandomColor());         //setting the background and border color of each dataset to a random value
                            this.bordColor.push(this.getRandomColor());
                    });

                    console.log( "This is the Label");
                    console.log(labels1);
                    console.log( "This is the Data");
                    console.log(data1);
                    var bgColor2=this.bgColor;
                    var bordColor2=this.bordColor;
                    
                    this._buildChart(labels1,data1,bgColor2,bordColor2);

                    //this._buildChart();
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error Loading Chart JS",
                            message: error.message,
                            variant: "error"
                        })
                    );
                });
        }
    }

    _buildChart(labels1,data1,bgColor1,bordColor1) {
        let canvas = this.template.querySelector("canvas");
        let context = canvas.getContext("2d");
        console.log("My Labels");
        console.log(labels1);
       console .log("My Data");
        console.log(data1);
        console.log("My Background colors");
        console.log(bgColor1);
       console .log("My Border colors");
        console.log(bordColor1);

        this.chart = new window.Chart(context, {
            type: "bar",
            data: {
                labels: labels1,
                datasets: [
                    {
                        label: "Number of Certified Resources per Certification category",
                        data: data1,
                        backgroundColor: bgColor1,
                        borderColor: bordColor1,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    }
    getRandomColor()                                         //gets random color for different datasets
    {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}