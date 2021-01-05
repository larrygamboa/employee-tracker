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
  database: "employee_infoDB"
});
// Create the connection //
connection.connect(function (err) {
  // If there is an error, throw it
  if (err) throw err;
  // Run a function called startTracker
  startTracker();
});

// ========== Inquirer for CLI control ========== //
// startTracker function to prompt the user on what to do
function startTracker() {
  // Pass the question(s) and possible choices
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "View departments",
        "View roles",
        "View employees",
        "Quit"
      ]
    })
    // Use the user's choice to run next function and break out of the switch statement
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
        case "Update employee info":
          updateEmployees();
          break;  
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        default:
          quit();
      }
    });
}

// Function to add department
function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "deptName",
    message: "Enter the department name:"
  }).then (function (answer) {
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
    });
  });
}

// Function to add role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "Enter the name of the role:"
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Enter the salary of the of role:"
    },
    {
      type: "input",
      name: "deptID",
      message: "Enter the department ID:"
    },
  ]).then (function (answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleSalary, answer.deptID], function (err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
    });
  });
}

// Function to add employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the employee's first name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name:"
    },
    {
      type: "input",
      name: "roleID",
      message: "Enter the employee's role ID number:"
    },
    {
      type: "input",
      name: "managerID",
      message: "Enter the manager's ID number:"
    }
  ]).then (function (answer) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
    });
  });
}

// Function to update employee
function updateEmployees() {
  inquirer.prompt([
    {
      type: "input",
      name: "updateEmp",
      message: "Which employee would you like to update?"
    },
    {
      type: "input",
      name: "updateRole",
      message: "What is the employee's updated role?"
    }
  ]).then (function (answer) {
    connection.query("UPDATE employee SET role_id=? WHERE first_name= ?", [answer.updateEmp, answer.updateRole], function(err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
    });
  });
}

// Function to view departments
function viewDepartments () {
  // Select from the database
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startTracker();
  });
}

// Function to view roles
function viewDepartments () {
  // Select from the database
  var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startTracker();
  });
}

// Function to view employees
function viewEmployees() {
  
} 

function quit() {
  connection.end();
  process.exit();
}