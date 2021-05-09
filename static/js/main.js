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
        center: [48.5, -110], // Set to Portland so we can see Hawaii and Alaska 
        zoom: 3.2,
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY
    }).addTo(myMap)

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
    var title = d3.select("#park_title")
    var url = document.getElementById("park_url")
 
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

       description.append("p").text(`${parkdesc}`);
       title.append("h3").text(`${parkname}`);
       
       var link = document.createElement("a");

       link.href = parkurl
       link.innerText = "Visit this Park's Website"

       url.append(link);

      
        drawLineGraph(park);
        calcZscore(park);
    });

};

function clearMetaData() {
    document.getElementById("park_summary").innerHTML = "";
    document.getElementById("park_title").innerHTML = "";
    document.getElementById("park_url").innerHTML = "";
}

function drawGauge(total) {
    // build gauge using ?? library
    document.getElementById("visit_gauge").innerHTML = "";

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

function newGauge(total, park){

    document.getElementById("visit_gauge").innerHTML = "";

    var options = {
        series: [total],
        chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
      
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return val;
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 10]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels : [park]


      };

      var chart = new ApexCharts(document.querySelector("#visit_gauge"), options);
      chart.render();
}

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
    document.getElementById("visit_gauge").innerHTML = "";
    d3.json("/parkdetails").then(function (data) {
        var total = 0
        var parkNums = []
        for (var i = 0; i < data.length; i++) {
            var result = data[i].visits_2020

            Object.entries(result).forEach(([key, value]) => {
                total += value;
                // total = average(value)
                parkNums.push(value);

            });

        // var parkArray = data.filter(p => p.name == park);

        // console.log(total)
        function getStandardDeviation (array) {
            const n = array.length
            const mean = array.reduce((a, b) => a + b) / n
            return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
          }
          

        }
        var parkMean = total / 49;
        var parkStd = getStandardDeviation(parkNums);
        var parkArray = data.filter(p => p.name == park);

        var parkvisit = parkArray[0]["visits_2021"]["03-Mar"];


        
        var zScore = ((parkvisit  - (parkMean/12) )/ (parkMean/12))  * 100
        // var percentZ = GetZPercent(zScore);


        console.log(parkMean/12);
        // console.log(parkStd);
        // console.log(Number(zScore).toPrecision(3));
        console.log(parkvisit)
        // console.log(percentZ)
      // ... and dump that JSON to the console for inspection
      // console.log(data);
      newGauge(Number(zScore).toPrecision(3),park);
    });
}



function GetZPercent(z) 
  {
    //z == number of standard deviations from the mean

    //if z is greater than 6.5 standard deviations from the mean
    //the number of significant digits will be outside of a reasonable 
    //range
    if ( z < -6.5)
      return 0.0;
    if( z > 6.5) 
      return 1.0;

    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);
    while(Math.abs(term) > loopStop) 
    {
      term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
      sum += term;
      k++;
      factK *= k;

    }
    sum += 0.5;

    return sum;
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
  


// var nums = [2, 10, 9, 6, 12, 3];




// // var parkMean = 0
// // var parkStd = 0

// function getStandardDeviation (array) {
//     const n = array.length
//     const mean = array.reduce((a, b) => a + b) / n
//     return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
//   }


// // console.log(getStandardDeviation(Nums));




// calcZscore();
// drawGauge(1);
initDashboard();