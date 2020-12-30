INSERT INTO department (name)
VALUES
	(Management),
    (Engineering),
    (Development),
    (Human Resources),
    (Accounting);
    
INSERT INTO role (title, salary, department_id)
VALUES
	("manager", 125000.00, 1),
    ("engineer", 100000.00, 2),
    ("developer", 80000.00, 3),
    ("human resources", 90000.00, 4),
    ("accounting", 75000.00, 5);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Obiwan", "Kenobi", 1, NULL),
    ("Darth", "Vader", 3, NULL),
    ("Han", "Solo", 2, NULL),
    ("Luke", "Skywalker", 5, NULL),
    ("Boba", "Fett", 4, NULL);