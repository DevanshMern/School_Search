import express, { json } from "express";
import { connection } from "./connectDB.js";
var app = express();
app.use(express.json());
app.get("/", function (request, response) {
  response.send("Hello World!");
});

const addSchools = (request, response) => {
  console.log(request);
  const { name, address, latitude, longitude } = request.body;
  connection.query(
    "Insert into allschools (name ,address,latitude,longitude) Values(?,?,?,?) ",
    [name, address, latitude, longitude],
    (err, result) => {
      if (err) {
        response.send({
          status: false,
          error: err,
          message: "encountered an Error",
        });
      } else {
        response.send({
          status: true,
          message: "School added Successfully",
        });
      }
    }
  );
};
const finalOperation = (response, err, result, x, y) => {
  if (err) {
    response.send({
      status: false,
      err: err,
      message: "Error occured",
    });
  } else {
    let schoolsNearby = result
      .map((items) => {
        let distance = Math.sqrt(
          Math.pow(items.latitude - x, 2) + Math.pow(items.longitude - y, 2)
        ).toFixed(2);
        return { ...items, distance };
      })
      .sort((a, b) => {
        return parseFloat(a.distance) - parseFloat(b.distance);
      });
    response.send({
      status: true,
      message: "fetched Success",
      data: schoolsNearby,
    });
  }
};
const getSchools = (request, response) => {
  const { latitude: x, longitude: y } = request.query;
  connection.query(
    "select name,address,latitude,longitude from allSchools",
    (err, result) => {
      finalOperation(response, err, result, x, y);
    }
  );
};
app.post("/addSchool", addSchools);
app.get("/listSchools", getSchools);
app.listen(8080, function () {
  console.log("Started application on port %d", 8080);
});
