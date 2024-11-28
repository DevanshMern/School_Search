Run "npm i" to install all the dependencies
Run "npm run start" command

open Postman localhost port 8080 then hit the endpoint 

post data in body for post request

<!-- http://localhost:8080/addSchool -->
{
    "name": "Convent School",
    "address": "RJPM",
    "longitude": 12.0,
    "latitude": 22.0
}

get request
http://localhost:8080/listSchools?latitude=0.0&longitude=0.0