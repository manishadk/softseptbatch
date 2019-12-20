"use strict";

const test = require('express');
var app1 = test();


var swaggerJSDoc = require('swagger-jsdoc') // actual documentation
var swaggerUI = require('swagger-ui-express') // for viewing the documentation

var swaggerDefinition = {
info: {
	title:'myAppliation',
	version:'0.0.1',
	description:'This xyz'
},
securityDefinitions: {
	bearerAuth: {
		type: 'apiKey',
		name:'authorization',
		scheme: 'bearer',
		in: 'header'
	}
},
host:'localhost:3023',
basePath:'/'
}

var swaggerOptions = {
	swaggerDefinition,
	apis:['./index.js']
}
var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app1.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
 





var bodyParser = require('body-parser');
var userController = require('./controllers/User_Controller.js')

var AuthController = require('./controllers/AuthController.js')

app1.use(bodyParser.urlencoded({extended:true}))


/**
* @swagger
* /registration:
*  post:
*   tags:
*    - Users
*   description: Testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: This is username to be entered
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: password to be entered
*    - name: address
*      in: formData
*      type: string
*      required: true
*      description: enter address
*   responses:
*    201:
*     description: registered succcesfully
*    409:
*     description: already registered
*    500:
*     description: Internal Server Error
*/
app1.post('/registration',userController.validation,userController.hashGen,userController.registerUser )

app1.post('/registration',userController.validation,userController.hashGen,userController.registerUser )


app1.post('/login',AuthController.validator,AuthController.passwordCheck,AuthController.jwtTokenGen)

/**
* @swagger
* /users/{id}:
*  delete:
*   tags:
*    - Users
*   security:
*    - bearerAuth: []
*   description: This is for delete
*   produces:
*    - application/json
*   parameters:
*    - name: id
*      in: path
*   responses:
*    200:
*     description: sucessfully deleted
*    404:
*     description: user not found
*    500:
*     description: Internal Server Error
*/
app1.delete('/users/:id',AuthController.verfiyToken, userController.deleteUser)

app1.put('/users/:id',AuthController.verfiyToken,userController.updateUser)

// app1.get('/users',)





app1.use('/*', function(req,res){
	res.status(404)
	res.send('NOT FOUND')
})

app1.post('/hotellist',function(req,res,next){

// console.log(req.body);
res.status(200);


})



app1.get('/hotellist:/id',function(req,res,next){
// console.log(req.params);
// console.log(req.query);
req.testvar = {name:'manish'}
console.log('in first')
next();
}, 

function(req,res,next){
console.log(req.testvar)
next()
}, 

function(req,res){

res.set({
	'Content-Type': 'application/json',
	'abc':'123'
})
res.status(200);
data = {name:'asdasdasd'}
res.json(data)
res.status(200).send('sffdf')
})

// error handlig 1st param err
app1.use(function(err,req,res,next){

console.log(err);
res.status(500)
res.json({
	status:500,
	message:err.message
})
// res.send(err.message)


})



app1.listen(3023);

module.exports = app1;

