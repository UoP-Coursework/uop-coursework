CREATE DATABASE env;


CREATE TABLE "User"(

	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	username VARCHAR(20) UNIQUE NOT NULL,
	country VARCHAR(60),
	email TEXT UNIQUE NOT NULL,
	emailVerified DATE,
	carbon_offset INT DEFAULT 0,
	carbon_footprint INT DEFAULT 0,
	address VARCHAR(40) NOT NULL,
	address2 VARCHAR(40),
	town_city VARCHAR(40) NOT NULL,
	postcode VARCHAR(15) NOT NULL,
	image TEXT

);


CREATE TABLE "Account"(

	id TEXT PRIMARY KEY,
	userId TEXT NOT NULL REFERENCES "User"(id),
	type TEXT NOT NULL,
	provider TEXT NOT NULL,
	providerAccountId TEXT NOT NULL,
	refresh_token TEXT,
	access_token TEXT,
	expires_at INT,
	token_type TEXT,
	scope TEXT,
	id_token TEXT,
	session_state TEXT

	
);

CREATE TABLE "Session"(

	id TEXT PRIMARY KEY,
	sessionToken TEXT UNIQUE NOT NULL,
	userId TEXT NOT NULL REFERENCES "User"(id),
	expires DATE NOT NULL
);

CREATE TABLE "VerificationToken"(

	identifier TEXT NOT NULL,
	token TEXT UNIQUE NOT NULL,
	expires DATE NOT NULL
);



CREATE TABLE "Friend"(

	sent_by_id TEXT NOT NULL REFERENCES "User"(id),
	sent_to_id TEXT NOT NULL REFERENCES "User"(id),
	is_accepted BOOLEAN DEFAULT 'f',
	PRIMARY KEY(sent_by_id, sent_to_id)

);

CREATE TABLE "Vehicle_Type"(

	type_id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL
);

CREATE TABLE "Vehicle_Fuel"(

	fuel_id SERIAL PRIMARY KEY,
	name VARCHAR(10)
);

CREATE TABLE "Vehicle_Brand"(

	brand_id SERIAL PRIMARY KEY,
	name VARCHAR(10)
);

CREATE TABLE "Vehicle"(

	vehicle_id SERIAL PRIMARY KEY,
	brand_id INT NOT NULL REFERENCES "Vehicle_Brand"(brand_id),
	type_id INT NOT NULL REFERENCES "Vehicle_Type"(type_id),
	fuel_id INT NOT NULL REFERENCES "Vehicle_Fuel"(fuel_id),
	country_id INT NOT NULL REFERENCES "Country"(country_id),
	model VARCHAR(20) NOT NULL,
	model_year DATE NOT NULL,
	ulez_compliant BOOLEAN NOT NULL
);

CREATE TABLE "User_Vehicle"(
	owner_id TEXT NOT NULL REFERENCES "User"(id),
	vehicle_id INT NOT NULL REFERENCES "Vehicle"(vehicle_id),
	PRIMARY KEY(owner_id, vehicle_id)
);