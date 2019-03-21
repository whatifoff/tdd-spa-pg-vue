-- sudo -u postgres psql

CREATE DATABASE tdd;

\c tdd;

CREATE TABLE users(
  user_id serial PRIMARY KEY,
  user_email varchar(255) UNIQUE NOT NULL,
  hash varchar(128),
  date_added timestamp DEFAULT NOW()
);