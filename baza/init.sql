CREATE TABLE prowadzacy (
    id       SERIAL PRIMARY KEY,
    imie     VARCHAR(50),
    nazwisko VARCHAR(50)
);

INSERT INTO prowadzacy (imie, nazwisko) VALUES ('Valeryi', 'Chodemczuk');