// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

function initDashboard() {
    // // populate the map with the data 
    getMap();
    // // populate the summary for the NPS 
    // showDetailData();
    //drawLineGraph();
}

function drawLineGraph(park) {
    // content for visitation bar graph
    //var plot = d3.select("#visitation_plot");
    // Query the endpoint that returns a JSON ...
    d3.json("/parkdetails").then(d => {
        //var parkdetails = d.parkdetails
        var resultArray = d.filter(p => p.name == park);
        
        console.log("drawing line graph");
        
        var currentyear = resultArray[0]["visits_0"];
        var prioryear = resultArray[0]["visits_1"];

        var x_currentyr = Object.keys(currentyear);
        var y_currentyr = Object.values(currentyear);

        var x_prioryr = Object.keys(prioryear);
        var y_prioryr = Object.values(prioryear);

        console.log(x_currentyr);

        var trace1 = {
            x: x_currentyr,
            y: y_currentyr,
            type: 'scatter'
          };
          
          var trace2 = {
            x: x_prioryr,
            y: y_prioryr,
            type: 'scatter'
          };
          
          var data = [trace1, trace2];
          
          Plotly.newPlot('visitation_plot', data);

    });

};

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


        for (var i = 0; i < data.length; i++) {
            L.marker([data[i].lat, data[i].lng])
                .addTo(myMap)
                .bindPopup(data[i].name)
                .on('click', markerOnClick);
        };
    });
};

function markerOnClick(e) {

    var lat = e.latlng.lat;

    console.log(`this is: ${lat}`);

    var description = d3.select("#park_summary");
 
    console.log(`description: ${description}`);

    d3.json("/parkdetails").then(function (data) {

        var metadata = data.filter(m => m.lat == lat);
        console.log(metadata);
        clearMetaData()

        var park = metadata[0].name;
        var parkname = park.replace("NP", "National Park");
        var parkurl = metadata[0].url;
        var parkdesc = metadata[0].desc;

       // console.log(parkname);

        var table = description.append("table"); 

        table.append("tr").append("td").text(`${parkname}`);
        table.append("tr").append("td").text(`${parkurl}`);
        table.append("tr").append("td").text(`${parkdesc}`);
         
        drawLineGraph(park);

    });

};

function clearMetaData() {
    document.getElementById("park_summary").innerHTML = "";
}

function drawGauge(park) {
    // build gauge using ?? library


    var options = {
        series: [53], // series: [visit_rank],
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '22px'
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91]
            },
        },
        labels: ['Average Results'],
    };

    var chart = new ApexCharts(document.querySelector("#visit_gauge"), options);
    chart.render();
};


function showDescription(Park) {

    // simply reads out a paragraph to our console 

};

function showDetailData() {
    // this is the generic content that will load 
    // before someone clicks on a park
}

function optionChanged() {

    // var selector = 
    // var Park = selector.property("value")

    // update visitation graph
    // drawBarGraph(Park)
    // update gauge
    // drawGauge(Park)
    // update description
    // showDescription(Park)
}

function calcZscore(park) {
    d3.json("/parkdetails").then(function (data) {

        // ... and dump that JSON to the console for inspection
        console.log(data);

    });
}


drawGauge(1);
initDashboard();