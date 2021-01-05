USE employee_infoDB;
    
INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
    
INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('ObiWan', 'Kenobi', 1, NULL),
    ('Darth', 'Vader', 2, 1),
    ('Han', 'Solo', 3, NULL),
    ('Luke', 'Skywalker', 4, 3),
    ('Boba', 'Fett', 5, NULL),
    ('Leia', 'Organa', 6, 5),
    ('Ahsoka', 'Tano', 7, NULL),
    ('Emperor', 'Palpatine', 8, 7);