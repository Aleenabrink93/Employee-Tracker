-- department table
INSERT INTO department(name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales"),
        ("Marketing");
-- roles table
INSERT INTO roles (title,salary,department_id)
VALUES  ("Sales Director", 100000, 4),
        ("Salesperson",70000,4),
        ("Marketing Director", 96000,5),
        ("Lawyer", 200000,3),
        ("Accountant",120000,2),
        ("Engineer",90000, 1);

-- employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Kendra","Brown", 1, NULL),
        ("Madison", "Hales", 2, 1),
        ("Jennifer", "Diehl", 2, 1),
        ("Conrad", "Jackson", 3, NULL),
        ("Ryan", "Brinkerhoff", 4, NULL),
        ("Eli", "Daines", 5, 5),
        ("Austin", "Ayan", 5, 5)


