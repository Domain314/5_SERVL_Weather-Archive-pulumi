CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    photoname VARCHAR(255),
    city VARCHAR(50),
    temperature DECIMAL,
    humidity DECIMAL,
    air_pressure DECIMAL,
    datetime VARCHAR(20)
);
