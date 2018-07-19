const express = require('express');
const io = require('io');
const app = express();
var MongoClient = require('mongodb').MongoClient;

function initDB() {
  const url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    connection = db.db("usersDB");
    connection.createCollection('users', function (error, response) {
      console.log(response);
    });
  });
}
initDB();
const bodyParser = require('body-parser'); //middlerware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/user/:id", function (request, response) {
  console.log('query params', request.query.q1);
  console.log(request.headers.accept);
  console.log(request.params.id);
  // response.send(request.query);
  io.read('data.txt', function (error, data) {
    response.send(data.toString());
  })
});
app.post('/user', function (request, response) {
  console.log('body=', request.body);
  response.send(201, 'post called..');
});
app.listen(3001, function (error) {
  if (error)
    throw error;
  console.log('server started');
});
// for(;;){}
