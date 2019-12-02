var user = require('../models/UserModel.js')

var bcrypt = require('bcrypt');


function hashGen(req,res,next){
saltRounds = 10; 
console.log('in has gen');
bcrypt.hash(req.body.password,saltRounds)
.then(function(hash){
	console.log(hash);
	req.userHash = hash;
})
.catch(function(err){
	next('has gen error')
})

}



function validation (req,res,next){
// console.log(req.body.username);

user.findOne({
	where:{username:req.body.username}
})
.then(function(result){
// console.log(result);
if(result === null){

// res.send('user not found so registeed')
next();

}

else{

console.log('user was already registered');
res.send('You are already registered')

}


})
.catch(function(err){

next(err)

})

}


function registerUser (req,res,next){

console.log(req.body);
user.create({
username:req.body.username,
password:req.userHash

})
.then(function(result){

// console.log(result);
res.json({
	satus:201,
	message:"You have regisr"
})
})
.catch(function(err){
console.log(err)
next(err);
})

}

function jwtTokenGen(){

}


module.exports = {
	registerUser,
	validation,
	hashGen
}


