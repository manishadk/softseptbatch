var user = require('../models/UserModel.js')

var bcrypt = require('bcrypt');


function hashGen(req,res,next){
saltRounds = 10; 
console.log('in has gen');
bcrypt.hash(req.body.password,saltRounds)
.then(function(hash){
	console.log(hash);
	req.userHash = hash;
	next();
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
password:req.userHash,
address:req.body.address

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


function getAllUsers(req,res,next){

	// send all users from db

	// user.findAll()
	// .then()
}

function deleteUser(req,res,next){

user.destroy({
	where: {
		id:req.params.id
	}
})
.then(function(result){
	if(result === 0 ){
		res.json({status:404,message:'user not found'})
	}
	else{

	}
	console.log(result);
	res.json(result)

})
.catch(function(err){
next(err);
})


}

module.exports = {
	registerUser,
	validation,
	hashGen,
	getAllUsers,
	deleteUser
}


