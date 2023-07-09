const inquirer = require('inquirer');
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connect to the employee_db database')
);

const init =() => {
    inquirer 
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "All done"
                ]

            }
        ]).then (ans =>{
            //console.log(answers)
            switch(ans.action){
                case "View all departments": viewDept();
                break;
            case "View all roles": viewRoles();
                break;
            case "View all employees": viewEmployees();
                break;
            case "Add a department": addDept();
                break;
            case "Add a role": addRole();
                break;
            case "Add an employee": addEmployee();
                break;
            case "Update an employee role": updateEmployee();
                break;
            case "All done":
                console.log("Thank you!");
                process.exit();
            }
        }).catch(err=>console.error(err));
}

init();

