const express = require("express");
const app = express();
const port = 8000;
const amaWebServ = require("aws-sdk");

var mysqldb = require("mysql");
var connection = mysqldb.createPool({
  host: "usermfa.cvt8dznr8i8h.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "usermfa",
});
connection.getConnection(function (err) {
  if (!err) {
    console.log("To check if DB connection is active");
    return;
  }
});

exports.handler = function (event, context) {
  //get values from event
  console.log(event);
  console.log(event.requestContext.http.method);
  let body = JSON.parse(event.body);
  var userId = body.userId;
  var questionId = body.questionId;
  var question = body.question;
  var answer = body.answer;
  var isRegister = body.isRegister;
  if (isRegister) {
    var insertSql = `insert into userqa values ?`;
    var insertValues = [userId, questionId, question, answer];
    connection.query(insertSql, [[insertValues]], (err, res) => {
      if (err) {
        console.log("Error in Insert to RDS Query" + err);
      } else {
        console.log("Value inserted");
        context.succeed("done");
      }
    });
  } else {
    var selectSql = `select * from userqa where userId = ?`;
    connection.query(selectSql, [[userId]], (err, res) => {
      if (err) {
        console.log("Error in select" + err);
      } else {
        console.log("Value retrieved");
        let result = JSON.stringify(res);
        context.succeed(result);
      }
    });
  }
};
