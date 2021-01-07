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
  password: "rootroot",
  // Your database name
  database: "employee_infoDB"
});
// Create the connection //
connection.connect(function (err) {
  // If there is an error, throw it
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
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
        "View departments",
        "View roles",
        "View employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Quit"
      ]
    })
    // Use the user's choice to run next function and break out of the switch statement
    .then(function(choice) {
      console.log("You entered: " + choice.action);
      switch (choice.action) {
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;  
        default:
          quit();
      }
    });
}

// Function to view departments
function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query,
    function(err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
  });
}

// Function to view roles
function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query,
    function(err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
  });
}

// Function to view employees
function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query,
    function(err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
  });
}

// Function to add department
function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "department",
    message: "Enter the new department name:"
  }).then (function (answer) {
    // var query = "INSERT INTO department (name) VALUES (?)";
    var query = "INSERT INTO department SET ?";
    connection.query(query,
      { 
        name: answer.department
      }, 
      function (err, res) {
        if (err) throw err;
        console.log("You have successfully added a new department.")
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
      name: "title",
      message: "Enter the name of the role:"
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary of the of role:"
    },
    {
      type: "input",
      name: "deptID",
      message: "Enter the department ID:"
    },
  ]).then (function (answer) {
    // var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    var query = "INSERT INTO role SET ?";
    connection.query(query,
      { 
        title: answer.title,
        salary: answer.salary,
        department_id: answer.deptID
      },
      function (err, res) {
        if (err) throw err;
        console.log("You have successfully added a new role.")
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
      name: "first_name",
      message: "Enter the employee's first name:"
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:"
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the employee's role ID number:"
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the manager's ID number:"
    }
  ]).then (function (answer) {
    // var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    var query = "INSERT INTO employee SET ?";
    connection.query(query,
      answer, 
      function(err, res) {
        if (err) throw err;
        console.log("You have successfully added a new employee.")
        console.table(res);
        startTracker();
    });
  });
}

// Function to update employee
function updateEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Which employee would you like to update? Enter id"
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the employee's updated role? Ender Role id"
    }
  ]).then (function (answer) {
    var query = "UPDATE employee SET role_id = ? WHERE id = ?";
    connection.query(query, [answer.role_id, answer.id], function(err, res) {
      if (err) throw err;
      console.table(res);
      startTracker();
    });
  });
}

// Quit application
function quit() {
  connection.end();
  process.exit();
}
