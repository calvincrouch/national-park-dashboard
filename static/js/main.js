// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

function initDashboard(){
    // // populate the map with the data 
    // getMap();
    // // populate the summary for the NPS 
    // showDetailData();
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
    var options = {
        series: [76],
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


function showDescription(Park){

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

drawGauge(1);
initDashboard();