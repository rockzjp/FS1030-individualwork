import express from 'express'
import fs from 'fs'
import {
    v4 as uuidv4
} from 'uuid'
import Isemail from 'isemail'
import jwt from 'jsonwebtoken'
import UsersManage from './UsersManage.js'
import mysql from 'mysql';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'blog'
});
 
connection.connect();

const router = express.Router();

router.post('/auth', (req, res) => {
    let data = req.body
    let errors = []
 
    if (data.email == undefined || data.email == '' || data.email == null || !Isemail.validate(data.email) ) {
        errors.push('email')
    }
    if (data.password == undefined || data.password == '' || data.password == null ) {
        errors.push('password')
    }
    if (errors.length > 0) {
        res.status(400).send({
            'message': 'validation error',
            invalid: errors
        })
        return
    }

    connection.query('SELECT * from user where user_email = ? and user_password = ? ' , 
        [data.email,data.password], function (error, results, fields) {
      if (error || !results.length) {
        res.status(200).send({
            status: -1,
            'message': 'incorrect credentials provided'
        })
        return
      }
        
        console.log(results)

        const token = jwt.sign( {email:results[0].user_email}, 'in6MG$haU5ttKoOC%N3j*rC7LNf22YlP1Y!p5OuJfaokTfI4GxMcPoOcJqWKOgqV')
        res.status(200).send({
            status: 0,
            token: token
        })

    });
})

router.post('/contact', (req, res) => {
    let data = req.body
    let errors = []
    
    console.log(data)

    var  addSql = 'INSERT INTO contact( name,email,special_power) VALUES( ?,?,? )';
    var  addSqlParams = [data.name,data.email,data.specialPower];
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:0,
            message: 'success'
        })

    });
})



router.get('/contact/list', (req, res) => {
    let data = req.body
    let errors = []
  
    connection.query('SELECT * from contact ' , function (error, results, fields) {
         
        var dataString = JSON.stringify(results);
        var data = JSON.parse(dataString);

        res.status(200).send({
            status: 0,
            data: data
        })

    });
})

router.get('/blog/list', (req, res) => {
    let data = req.body
    let errors = []
  
    connection.query('SELECT * from blog ' , function (error, results, fields) {
         
        var dataString = JSON.stringify(results);
        var data = JSON.parse(dataString);

        res.status(200).send({
            status: 0,
            data: data
        })

    });
})

router.post('/blog/add', (req, res) => {
    let data = req.body
    let errors = []
    
    console.log(data)

    var  addSql = 'INSERT INTO blog ( blog_title ,blog_content ) VALUES( ?,? )';
    var  addSqlParams = [data.title,data.content ];
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:0,
            message: 'success'
        })

    });
})

router.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!'
    })
})
export default router;