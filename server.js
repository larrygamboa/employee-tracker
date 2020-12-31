// ========== Required Dependencies ========== //
// Import mysql npm package
const mysql = require("mysql");
// Import inquirer npm package
const inquirer = require("inquirer");
// Import console.table npm package
const consoleTable = require("console.table");

// ========== Create credentials for mysql connection ========== //
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your user name
  user: "root",
  // Your password
  password: "l@rG020979!",
  // Your database name
  database: "employee_info_db"
});
// Create the connection //
connection.connect(function (err) {
  // If there is an error, throw it
  if (err) throw err;
  // Run a function called startTracker
  startTracker();
});