CREATE TABLE prowadzacy (
    id       SERIAL PRIMARY KEY,
    imie     VARCHAR(50),
    nazwisko VARCHAR(50)
);

CREATE TABLE terminy (
    id            SERIAL PRIMARY KEY,
    prowadzacy_id INTEGER REFERENCES prowadzacy(id) ON DELETE CASCADE,
    dzien         VARCHAR(20),
    godzina       VARCHAR(10),
    sala          VARCHAR(20)
);

INSERT INTO prowadzacy (imie, nazwisko) VALUES ('Valeryi', 'Chodemczuk');
INSERT INTO prowadzacy (imie, nazwisko) VALUES ('Anna', 'Nowak');

INSERT INTO terminy (prowadzacy_id, dzien, godzina, sala) VALUES (1, 'Poniedziałek', '10:00', 'A-101');
INSERT INTO terminy (prowadzacy_id, dzien, godzina, sala) VALUES (1, 'Środa', '12:00', 'A-101');
INSERT INTO terminy (prowadzacy_id, dzien, godzina, sala) VALUES (2, 'Czwartek', '14:00', 'B-204');