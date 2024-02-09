const express = require('express');
const app = express();
const mysql =  require("mysql");
const bodyParser =  require('body-parser');
const bcrypt =  require('bcryptjs');
var jwt =require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database:'crud'
});

// app.post('/register', async (req, res) => {
//     const {name , email , password } = req.body;
//     db.query('select email from users where email = ?',[email], async (error,results) => {
//         if(error){
//             console.log(error)
//         }

//         if( results && results.length > 0){
//             return res.json('Email is already in use');
//         } 
//     })
//      let hashedpassword = await bcrypt.hash(password,10);
//      console.log(hashedpassword);
//      db.query("insert into users set ? ",{name:name,email:email ,password:hashedpassword}, (err,result)=>{
//         if(err) {
//             console.log(err);
//         }else{
//             console.log(result);
//             return res.json('user registered');
//         }
//     });
// })

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the email is already in use
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results && results.length > 0) {
            return res.status(400).json({ error: 'Email is already in use' });
        } else {
            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);
                console.log(hashedPassword);

                // Insert the user into the database
                db.query("INSERT INTO users SET ?", { name: name, email: email, password: hashedPassword }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        console.log(result);
                        return res.status(200).json({ message: 'User registered successfully' });
                    }
                });
            } catch (hashingError) {
                console.log(hashingError);
                return res.status(500).json({ error: 'Error hashing password' });
            }
        }
    });
});



// app.post('/login' , async (req,res) => {
//     const {email , password}= req.body;
//     if(!email || !password){
//         return res.json('please enter email and password');
//     }else{
//         db.query('select email from users  where email=? ', [email] , async(err , result )=>{
//             if(err){
//                 console.log(err);
//             }
//             else if (result.length > 0){
//                 return res.json('No user found')
//             }
//             const checkpassword =  await bcrypt.compare(password,result.password);
//             console.log(result);
//             if (!checkpassword) {
//             return res.status(404).json('Invalid Password');
//         }
//             })
            
//         }
//         const token = jwt.sign({_id:this._id},'hellothisistheprojectofdesighnengineeringechallan');
//         console.log(token);
//         return res.json({message: "Login Successfull", token:token});
//     });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare passwords
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      // Generate JWT token
      const token = jwt.sign({_id:this._id},'hellothisistheprojectofdesighnengineeringechallan');     
      console.log(token);
      return res.status(200).json({ token });
    });
  });


app.post('/addemployee', async (req,res) => {
    try {
        const {employeename,salary,designation} = req.body;
        const qry = "insert into employee(employeename,salary,designation) values (?,?,?)";
        await db.query(qry,[employeename,salary,designation],(err,result) => {
            if(err){
                console.log(err);
            }
            console.log("Employee added successfully",result);
          return  res.status(200).json('Employee added successfully');
        })
    } catch (error) {
        console.log(error);
    }
});

// app.get('/showemployee',async (req,res) => {
// try {
//     const qry = "select * from employee";
//     await db.query(qry, (err,result) => {
//         if(err){
//             console.log(err);
//         }
//         // console.log(result);
//         res.json(result)
//         console.log("EmployeeList displayed successfully");
//         res.status(200).json('EmployeeList displayed successfully');
//     });
// } catch (error) {
//     console.log(error)
// }
// });


app.get('/showemployee', async (req, res) => {
    try {
      const qry = "SELECT * FROM employee";
     await db.query(qry, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred while fetching employee data' });
        } else {
          console.log("EmployeeList displayed successfully");
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });
  

app.put('/updateemployee/:id', async (req,res) => {
    try {
        const eid = req.params.id;
        const { employeename, salary, designation } = req.body;
        const qry = `update employee set employeename = ?,salary = ?, designation = ? where eid = ${eid}`;
        await db.query(qry,[employeename,salary,designation],(err,result) => {
            if(err){
                console.log(err);
                res.status(400).json('failed to update Employee')
            }
            if(result.affectedRows === 0){
                return res.status(404).json('Employee not Found');
            }
            console.log(`Employee updated with id :${eid}` , result);
            res.status(200).json({'message':'Employee updated Successfully'});
        })
    } catch (error) {
        console.log(error);
    }
});

app.delete('/deleteemployee/:id', async (req,res) => {
    try {
        const eid = req.params.id;
        const qry = `Delete From employee Where eid=?`;
        await db.query(qry,[eid],(err,result)=>{
            if(err){
                console.log(err);
                res.status(400).json("Failed To Delete The Employee");
            }
            if(result.affectedRows === 0){
                return res.status(404).json('Employee not Found');
            }
            console.log(`Employee deleted with id : ${eid}`,result);
            res.status(200).json({"message":"Employee Deleted Successfully"});
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;