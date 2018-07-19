const MongoClient = require('mongodb').MongoClient;

function initDB() {
  const url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    console.log(err);
    if (err) throw err;
    console.log("Database created!");
    connection = db.db("usersDB");
    connection.createCollection('users', function (error, response) {
      console.log('collection created..');
    });
    // get();
  });
}

function get() {
  connection.collection('users').find({}).toArray(function (error, result) {
    console.log(result);
  });
}
initDB();
function insert(user) {
  connection.collection('users').insertOne(user, function (error, response) {
    // console.log(response);
  });
}

module.exports = {
  initDB: initDB,
  insert: insert
}