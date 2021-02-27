CREATE TABLE IF NOT EXISTS cards (
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (position)
);