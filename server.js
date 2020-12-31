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

// Inquirer for CLI control //
// startTracker function to prompt the user on what to do
function startTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ]
    })
    .then(function(choice) {
      console.log("You entered: " + choice.action);
      switch (choice.action) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}