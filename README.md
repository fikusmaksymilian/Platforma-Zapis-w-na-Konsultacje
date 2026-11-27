#Zapisy na Konsultacje

Jest to projekt zaliczeniowy z przedsmiotu Metody Wirtualizacji, a zarazem aplikacja do zapisów na konsultacje z frontendem, backendem i bazą danych w kontenerach Docker.

#Autorzy:

- Maksymilian Fikus
- Marek Giernacki

#Wykorzystanie narzędzi AI

#ETAP 2:
Skorzystałem z AI jako pomocy w nauce, wyjaśniło mi jak zbudować aplikacje wielokontenerową w DOckerze, jak napisać Dockerfile
dla backendu i frontendu zeby to realnie działało, oraz jak skonfigurować docker-compose i jak ustawić nginx jako reverse proxy.

#KM2:
Ai zasugerowało mi aby w package.json, zamiast wersji 4 express uzyc wersji Express 5. Do automatycznej obslugi bledow 500 przy async.
Rowniez zasugerowalo mi dodanie NODE_ENV: production w package.json aby przy bledzie zwracalo internal server error a nie dlugi kod bledu. 

Udokumentowany format wymiany danych:
1.  curl.exe http://localhost:3000/health
    
    {"status":"ok"}

2. curl.exe http://localhost:3000/api/prowadzacy
   
    [{"id":1,"imie":"Valeryi","nazwisko":"Chodemczuk"},{"id":2,"imie":"Robert","nazwisko":"Lewandowski"}]

3. curl.exe http://localhost:3000/api/prowadzacy/2
    
    {"id":2,"imie":"Robert","nazwisko":"Lewandowski"}

4. curl.exe -i http://localhost:3000/api/prowadzacy/10
    
    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 41
    ETag: W/"29-/SV4RhRKtdC/0vfFnA92y+qCqW8"
    Date: Thu, 26 Nov 2026 17:31:52 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
    {"blad":"Nie ma prowadzacego o takim id"}

5. curl.exe -i -X POST http://localhost:3000/api/prowadzacy -H "Content-Type: application/json" -d '{\"imie\":\"Wojciech\",\"nazwisko\":\"Szczesny\"}'
    
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 48
    ETag: W/"30-EaNvi7OpDq8ohY305MDo8ujceso"
    Date: Thu, 26 Nov 2026 17:34:18 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":3,"imie":"Wojciech","nazwisko":"Szczesny"}

6. curl.exe -i -X POST http://localhost:3000/api/prowadzacy -H "Content-Type: application/json" -d '{\"imie\":\"Maciek\"}'
    
    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 32
    ETag: W/"20-oXL6lqEWVCgHeIMw5fGxGmfXAcw"
    Date: Thu, 26 Nov 2026 17:36:26 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"blad":"Podaj imie i nazwisko"}

7. curl.exe -i -X DELETE http://localhost:3000/api/prowadzacy/2

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 62
    ETag: W/"3e-e1MrhpOmwIPtqATPyaZObxHuOHc"
    Date: Thu, 26 Nov 2026 17:37:48 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"usunieto":{"id":2,"imie":"Robert","nazwisko":"Lewandowski"}}

8. curl.exe http://localhost:3000/api/terminy

    {"id":1,"imie":"Valeryi","nazwisko":"Chodemczuk","dzien":"Poniedziałek","godzina":"10:00","sala":"A-101"}

Baza danych

Obraz: postgres:16-alpine
Dane trwałe na nazwanym wolumenie dane-bazy
Skrypt init.sql tworzy tabele i dane startowe
Baza nie ma opublikowanego portu backend łączy się z nią przez sieć compose

Tabele:
prowadzacy (id, imie, nazwisko)
terminy (id, prowadzacy_id -> prowadzacy.id, dzien, godzina, sala) jeden prowadzący ma wiele terminów