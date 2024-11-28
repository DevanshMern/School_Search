import express from "express"
import { connection } from "./connectDB.js";
var app = express();
app.use(express.json())
app.get("/",function(request,response){
response.send("Hello World!")
})

const addSchools = (request, response) => {
    console.log(request)
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
app.post("/addSchool", addSchools);
app.listen(8080, function () {
  console.log("Started application on port %d", 8080);
});
