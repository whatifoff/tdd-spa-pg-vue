-- sudo -u postgres psql

DROP DATABASE tdd;
CREATE DATABASE tdd;

\c tdd;

DROP TABLE users;
CREATE TABLE users(
  user_id serial PRIMARY KEY,
  user_email varchar(255) UNIQUE NOT NULL,
  hash varchar(128),
  date_added timestamp DEFAULT NOW()
);

DROP TABLE tokens;
CREATE TABLE tokens(
  user_id integer NOT NULL,
  token varchar(40) UNIQUE NOT NULL
);
