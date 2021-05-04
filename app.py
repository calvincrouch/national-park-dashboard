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
table = base.classes.park_detail

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
    results = session.query(table.name, table.description, table.latitude, table.longitude, table.url).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_parks = []
    for name, description, latitude, longitude, url in results:
        dict = {}
        dict["name"] = name
        dict["desc"] = description
        dict["lat"] = latitude
        dict["lng"] = longitude
        dict["url"] = url
        all_parks.append(dict)

    # Return the jsonified result. 
    return jsonify(all_parks)

if __name__ == '__main__':
    app.run(debug=True)