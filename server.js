const inquirer = require('inquirer');
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hr_db'
    },
);

const init =() => {
    console.log(`🄴🄼🄿🄻🄾🅈🄴🄴 🅃🅁🄰🄲🄺🄴🅁`);
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

const viewDept = () => {
    db.query(`SELECT * FROM department`,(err,results)=>{
        err? console.error(err): console.table(results);
        init();
    })
}

const viewRoles =() =>{
    db.query(`SELECT * FROM roles `,(err,results)=>{
        err? console.error(err): console.table(results);
        init();
    })
}
const viewEmployees =() =>{
    db.query(`SELECT * FROM employees `,(err,results)=>{
        err? console.error(err): console.table(results);
        init();
    })
};

const addDept =()=>{
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "addDept"
            }
        ]).then(ans=>{
            db.query(`INSERT INTO department(name) VALUES(?)`, [ans.addDept],(err,results)=>{ 
                if (err){
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                      init();
                    
                })}
            })
           
        })
};

const addRole = () => {
    const deptChoices = () => db.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let arrNames = rows[0].map(obj => obj.name);
            return arrNames
        })
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of the role you'd like to add?",
                name: "roleTitle"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "roleSalary"
            },
            {
                type: "list",
                message: "Which department is this role in?",
                name: "addDept",
                choices: deptChoices
            }
        ]).then(ans => {
            db.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDept)
                .then(answer => {
                    let mappedId = answer[0].map(obj => obj.id);
                    return mappedId[0]
                })
                .then((mappedId) => {
                    db.promise().query(`INSERT INTO roles(title, salary, department_id)
                VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
                    init()
                })
        })
};

const addEmployee = () => {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName"
            },
      
        ]).then(ans => {
            db.query(`INSERT INTO employees(first_name, last_name)
                    VALUES(?, ?)`, [ans.firstName, ans.lastName], (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM employees`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        init();
                    })
                }
            }
            )
        })
}