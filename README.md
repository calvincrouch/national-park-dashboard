# National Park Dashboard
![Big Bend National Park](images/Big-Bend-GettyImages-516259396.jpg)

This dashboard uses python, postgreSQL, flask and javascript to display data collected from nps.gov. Included in the dashboard is a map of National Parks. Select a park to view a description of the park, a trendline graph of the park's visitation and a gauge to show how popular the park is compared to other parks. 

## Instructions to use this repo:
Obtain API Keys:
1. Get an NPS API key from https://www.nps.gov/subjects/developer/get-started.htm

1. Get a mapbox API Key from https://docs.mapbox.com/help/getting-started/

Populate database:
1. Clone this repo https://github.com/calvincrouch/national-park locally.
1. Create a file named config.py in the working directory. It must contain the following:
    > nps_api_key = [enter your nps api key] <br/>

    > user = "postgres" <br/>
     password = [enter your password] <br/>
     host = "localhost" <br/>
     port = 5432 <br/>
     database = "nps_db" <br/>

1. Launch pgAdmin.

1. In pgAdmin, 
    > 1. Create a new database named nps_db
    > 1. Open and run the script [/data/sql_CreateTables_script.sql](/data/sql_CreateTables_script.sql) or copy-paste the following into a new query window:

1. Open a terminal window from the [national-park-dashboard](/national-park-dashboard/) directory, 
    > 1. Type ``source activate PythonData``
    > 1. Hit ENTER
    > 1. Type ``jupyter notebook`` 
    > 1. Hit ENTER

1. Open the Jupyter Notebook: parkdata.ipynb 
1. In the parkdata notebook, 
    > 1. Click ``Kernel``
    > 1. Click ``Restart and Run All`` or run each cell one by one
    > 1. In the final cell output, verify data is returned
1. Close the notebook and terminal window.

Run the app: 
1. Create a file name config.js in the /static/js/ directory. It must contain the following:
    > const API_KEY = [enter your mapbox api key]; <br/>  

1. Open a terminal window from the [national-park-dashboard](/national-park-dashboard/) directory, 
    > 1. Type ``source activate PythonData``
    > 1. Hit ENTER
    > 1. Type ``python app.py`` 
    > 1. Hit ENTER

1. In a Chrome Browser enter the url http://127.0.0.1:5000/ 