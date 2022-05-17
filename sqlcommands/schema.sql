CREATE DATABASE production;

USE production

CREATE TABLE users (
    user_name VARCHAR(36);
    first_name VARCHAR(32);
    last_name VARCHAR(50);
    email VARCHAR(255);
    password_hash VARCHAR(64);
    PRIMARY KEY (user_name);
);

CREATE TABLE events (
    event_id VARCHAR(36);
    event_name VARCHAR(32);
    event_date VARCHAR(50);
    event_time VARCHAR(255);
    event_image VARCHAR(64);
    event_address VARCHAR(255)
    PRIMARY KEY (event_id);
);

CREATE TABLE friends (
    requester VARCHAR(36),
    requestee VARCHAR(36),
    request_date DATE,
    friendship_start_date DATE,
    FOREIGN KEY (requester) REFERENCES users(user_name);
    FOREIGN KEY (requester) REFERENCES users(user_name);
    PRIMARY KEY (requester, requestee);

);

CREATE TABLE unavailabilities (
    unavailability_id VARCHAR(36);
    unavailable_from DATETIME;
    unavailable_to DATETIME;
    reason VARCHAR(64);
    user VARCHAR(36);
    event_id VARCHAR(36);
    FOREIGN KEY (user) REFERENCES users(user_name);
    FOREIGN KEY (event_id) REFERENCES events(event_id);
    PRIMARY KEY (unavailability_id);
);

CREATE TABLE event_admins (
    admin_id VARCHAR(36);
    event_id VARCHAR(36);
    FOREIGN KEY (admin_id) REFERENCES users(user_name);
    FOREIGN KEY (event_id) REFERENCES events(event_id);
    PRIMARY KEY (admin_id,event_id);
);

CREATE TABLE event_invitees (
    admin_id VARCHAR(36);
    event_id VARCHAR(36);
    FOREIGN KEY (admin_id) REFERENCES users(user_name);
    FOREIGN KEY (event_id) REFERENCES events(event_id);
    PRIMARY KEY (admin_id,event_id);
);