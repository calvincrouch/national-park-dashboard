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
    
        console.log(d);      
        var resultArray = d.filter(p => p.name == park);
        
        console.log("drawing line graph");
        
        var currentyear = resultArray[0]["visits_2021"];
        var prioryear = resultArray[0]["visits_2020"];

        var x_currentyr = Object.keys(currentyear);
        var y_currentyr = Object.values(currentyear);

        var x_prioryr = Object.keys(prioryear);
        var y_prioryr = Object.values(prioryear);

        console.log(x_currentyr);
        console.log(x_prioryr);

        var trace_2021 = {
            x: x_currentyr,
            y: y_currentyr,
            mode: 'lines+markers',
            name: '2021',
            marker: {
                color: 'rgb(11, 61, 45)',
                size: 8
            },
            line: {
                color: 'rgb(11, 61, 45)',
                width: 1
            }
          };
          
          var trace_2020 = {
            x: x_prioryr,
            y: y_prioryr,
            mode: 'lines+markers',
            name: '2020',
            marker: {
                color: 'rgb(240, 136, 60)',
                size: 6
            },
            line: {
                color: 'rgb(240, 136, 60)',
                width: .75
            }
          };

          var layout = {
            title: `${park} Visits Year Over Year` //,
            // xaxis: {
            //     tickvals: [x_prioryr],
            //     ticktext: [x_prioryr]
            // }
          };
          
          var data = [trace_2021, trace_2020];
          
          Plotly.newPlot('visitation_plot', data, layout);

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
        calcZscore(park);
    });

};

function clearMetaData() {
    document.getElementById("park_summary").innerHTML = "";
}

<<<<<<< HEAD
function drawGauge(total) {
=======
function drawGauge(park) {
>>>>>>> ccb0dfc0edf29cc00edd9166a4cca02d07e8c0ba
    // build gauge using ?? library


    var options = {
        series: [total], // series: [visit_rank],
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
        var total = 0
        var parkNums = []
        for (var i = 0; i < data.length; i++) {
            var result = data[i].visits_0

            Object.entries(result).forEach(([key, value]) => {
                total += value;
                // total = average(value)
                parkNums.push(value);

            });

// filter to hone in 
        var parkArray = data.filter(p => p.name == park);

        // console.log(total)
        function getStandardDeviation (array) {
            const n = array.length
            const mean = array.reduce((a, b) => a + b) / n
            return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
          }
          

          var parkMean = total / 49;
          var parkStd = getStandardDeviation(parkNums)
          var zScore = (12  - parkMean) / parkStd 


          console.log(parkMean);
          console.log(parkStd);
          console.log(Number(zScore).toPrecision(3));

        // ... and dump that JSON to the console for inspection
        // console.log(data);
        drawGauge(Number(zScore).toPrecision(3));
        }

    });
}


// function standardDeviation(values){
//     var avg = average(values);
    
//     var squareDiffs = values.map(function(value){
//       var diff = value - avg;
//       var sqrDiff = diff * diff;
//       return sqrDiff;
//     });
    
//     var avgSquareDiff = average(squareDiffs);
  
//     var stdDev = Math.sqrt(avgSquareDiff);
//     return stdDev;
//   }
  
//   function average(data){
//     var sum = data.reduce(function(sum, value){
//       return sum + value;
//     }, 0);
  
//     var avg = sum / data.length;
//     return avg;
//   }

// standardDeviation(nums);
  


var nums = [2, 10, 9, 6, 12, 3];




// var parkMean = 0
// var parkStd = 0

function getStandardDeviation (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }


// console.log(getStandardDeviation(Nums));




// calcZscore();
// drawGauge(1);
initDashboard();