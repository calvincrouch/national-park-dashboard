national park dashboard

Clone this repo https://github.com/calvincrouch/national-park locally.

Create a file named config.py in the working directory. It must contain the following:

#add note about getting api key from nps.gov
nps_api_key = ""

user = "postgres"
password = [enter your password]
host = "localhost"
port = 5432
database = "nps_db"

Launch pgAdmin.

Within pgAdmin, create a new database named coaster_db.

From within pgAdmin, run the script in the Resources folder called sql_CreateTables_script.sql or copy-paste the following into a new query window:



Open a terminal window, type source activate PythonData, hit enter, type jupyter notebook and hit enter.

Open the Jupyter Notebook called RollerCoasterETL.ipynb in the working directory.

Choose Restart and Run All, or run each cell one by one.
