# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Set up information for connecting to database
from config import (user, password, host, port, database)
connection_string = f'postgresql://{user}:{password}@{host}:{port}/{database}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Select tables

table = base.classes.parks

# Instantiate the Flask application. 
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage

@app.route("/other")
def OtherRoute():
    ''' This function runs when the user clicks the link for the other page.
        Note that the html file must be located in a folder called templates. '''

    # Note that this call to render template passes in the title parameter. 
    # That title parameter is a 'Shirley' variable that could be called anything 
    # we want. But, since we're using it to specify the page title, we call it 
    # what we do. The name has to match the parameter used in other.html. 
    webpage = render_template("other.html", project_description="Text here about description", team_members="List of team member names")
    return webpage

@app.route("/parkdetails")
def QueryParkDetails():
    session = Session(engine)
    # we will add the columns from the other table once they've been merged

    results = session.query(table.name \
                            ,table.description \
                            , table.latitude \
                            , table.longitude \
                            , table.url \
                            , table.mar2021 \
                            , table.mar2020 \
                            , table.feb2021 \
                            , table.feb2020 \
                            , table.jan2021 \
                            , table.jan2020 \
                            , table.dec2020 \
                            , table.dec2019 \
                            , table.nov2020 \
                            , table.nov2019 \
                            , table.oct2020 \
                            , table.oct2019 \
                            , table.sep2020 \
                            , table.sep2019 \
                            , table.aug2020 \
                            , table.aug2019 \
                            , table.jul2020 \
                            , table.jul2019 \
                            , table.jun2020 \
                            , table.jun2019 \
                            , table.may2020 \
                            , table.may2019 \
                            , table.apr2020 \
                            , table.apr2021 \
                           , table.visit_rank \
                            ).all()

    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_parks = []

    for name, description, latitude, longitude, url, mar2021, mar2020, feb2021, feb2020, jan2021, jan2020, dec2020, dec2019, nov2020, nov2019, oct2020, oct2019, sep2020, sep2019, aug2020, aug2019, jul2020, jul2019, jun2020, jun2019, may2020, may2019, apr2020, apr2021, visit_rank  in results:
    # 
        dict = {}
        dict["visits_2021"] = {}
        dict["visits_2020"] = {}

        dict["name"] = name
        dict["desc"] = description
        dict["lat"] = latitude
        dict["lng"] = longitude
        dict["url"] = url

        dict["visits_2021"]["01-Jan"] = jan2021 
        dict["visits_2021"]["02-Feb"] = feb2021
        dict["visits_2021"]["03-Mar"] = mar2021
        dict["visits_2021"]["04-Apr"] = apr2021

        dict["visits_2020"]["01-Jan"] = jan2020       
        dict["visits_2020"]["02-Feb"] = feb2020
        dict["visits_2020"]["03-Mar"] = mar2020
        dict["visits_2020"]["04-Apr"] = apr2020
        dict["visits_2020"]["05-May"] = may2020
        dict["visits_2020"]["06-Jun"] = jun2020
        dict["visits_2020"]["07-Jul"] = jul2020
        dict["visits_2020"]["08-Aug"] = aug2020
        dict["visits_2020"]["09-Sep"] = sep2020
        dict["visits_2020"]["10-Oct"] = oct2020
        dict["visits_2020"]["11-Nov"] = nov2020
        dict["visits_2020"]["12-Dec"] = dec2020
               
        
        dict["rank"] = visit_rank

        all_parks.append(dict)

    # Return the jsonified result. 
    return jsonify(all_parks)

if __name__ == '__main__':
    app.run(debug=True)