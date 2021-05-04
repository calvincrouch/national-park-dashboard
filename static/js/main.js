// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

function initDashboard(){
    // populate the map with the data 
    getMap();
    // populate the summary for the NPS 
    showDetailData();
}

function drawBarGraph(Park){
    // content for visitation bar graph
};

function getMap() {
    // make the leaflet map
    // Query the endpoint that returns a JSON ...
    d3.json("/parkdetails").then(function (data) {

        // ... and dump that JSON to the console for inspection
        console.log(data);

    });
};

function drawGauge(Park){
    // build gauge using ?? library
};

funtion showDescription(Park){
    // simply reads out a paragraph to our console 

};

function showDetailData(){
    // this is the generic content that will load 
    // before someone clicks on a park
}

function optionChanged(){
    
    // var selector = 
    // var Park = selector.property("value")

    // update visitation graph
    // drawBarGraph(Park)
    // update gauge
    // drawGauge(Park)
    // update description
    // showDescription(Park)
}

initDashboard();