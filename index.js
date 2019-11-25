"use strict";
const test = require('express');
// console.log(test);
var bodyParser = require('body-parser');

// var userModel = require('./models/UserModel.js')
var userController = require('./controllers/User_Controller.js')

console.log(userController);







// console.log(db.sequelize);


// var a =10;

// var promiseVal = new Promise(function(resolve,reject){

// setTimeout(function(){

// p
// if( a === 11){
// 	resolve('okay, success')
// }
// else{
// 	reject('failure')
// }

// },3000)








// })

// console.log(promiseVal);
// promiseVal.then(function(result){
// console.log(result);
// })
// .catch(function(err){
// 	console.log(err);
// })
// .finally(function(){

// 	console.log('in finally')
// })















var app1 = test()

app1.use(bodyParser.urlencoded({extended:true}))


app1.post('/registration',userController.validation,userController.registerUser )







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

console.log(err.message);
res.json({
	status:500,
	message:err.message
})
res.send(err.message)


})



app1.listen(3023);

