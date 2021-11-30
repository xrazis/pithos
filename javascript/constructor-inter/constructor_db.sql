CREATE DATABASE IF NOT EXISTS constructor_db;
USE constructor_db;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    id        varchar(10),
    firstname varchar(254),
    lastname  varchar(254),
    email     varchar(254),
    telephone int(10),
    category  varchar(254),
    PRIMARY KEY (id)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = latin1;