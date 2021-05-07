// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

// function initDashboard(){
//     // populate the map with the data 
//     getMap();
//     // populate the summary for the NPS 
//     showDetailData();
// }

// function drawBarGraph(Park){
//     // content for visitation bar graph
// };

function getMap() {
    // make the leaflet map
    console.log("getMap()");

    var myMap = L.map("nps_map", {
        center: [45.5, -122.67], // Set to Portland so we can see Hawaii and Alaska 
        zoom: 3.75,
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    // Query the endpoint that returns a JSON ...
    d3.json("/parkdetails").then(function (data) {

       console.log(data);

      for (var i = 0; i < data.length; i++){
        L.marker([data[i].lat, data[i].lng])
        .addTo(myMap)
        .bindPopup(data[i].name)
      };
    });

};

getMap();


// function drawGauge(Park){
//     // build gauge using ?? library
// };


// function showDescription(Park){

//     // simply reads out a paragraph to our console 

// };

// function showDetailData(){
//     // this is the generic content that will load 
//     // before someone clicks on a park
// }

// var popup = L.popup();

function optionChanged(e){
    // not sure exactly how this will work resource to use a DOM event in leaflet
    // https://leafletjs.com/reference-1.7.1.html#domevent

    d3.json("/parkdetails").then(function (data) {
        .setLatLng(e.latlng)
        .setContent(`You selected ${data.name} at e.latlng.toString()`)
        .openOn(mymap);
    });

    // update visitation graph
    // drawBarGraph(Park)
    // update gauge
    // drawGauge(Park)
    // update description
    // showDescription(Park)
}

mymap.on('click', optionChanged);

// initDashboard();
