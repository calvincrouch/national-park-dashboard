drop table if exists park_detail;
CREATE TABLE park_detail (
	park_detail_id SERIAL PRIMARY KEY
	,name VARCHAR(255)
	,description VARCHAR(500)
	,latitude DECIMAL
	,longitude DECIMAL
	,url VARCHAR(40)
);

drop table if exists park_visits;
CREATE TABLE park_visits (
	park_visits_id SERIAL PRIMARY KEY
	,name VARCHAR(255)
	,mar2021 INT
	,mar2020 INT
	,feb2021 INT
	,feb2020 INT
	,jan2021 INT
	,jan2020 INT
	,dec2020 INT
	,dec2019 INT
	,nov2020 INT
	,nov2019 INT
	,oct2020 INT
	,oct2019 INT
	,sep2020 INT
	,sep2019 INT
	,aug2020 INT
	,aug2019 INT
	,jul2020 INT
	,jul2019 INT
	,jun2020 INT
	,jun2019 INT
	,may2020 INT
	,may2019 INT
	,apr2020 INT
	,apr2019 INT
	,visit_rank INT)