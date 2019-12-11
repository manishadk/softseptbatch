var user = require('../models/UserModel.js')
var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

function validator (req,res,next){
	// regsitered or not 
	if(req.body.username === null){
		res.send('username cannot be empty')
		// next({})
	}
user.findOne({
	where:{username:req.body.username}
})
.then(function(result){

if(result === null){
res.send('You have not registered, please register first');
}
else{
	// console.log(result);
	req.passwordFromDB = result.dataValues.password
next();
}

})

.catch(function(err){

})

// next()
}

function passwordCheck(req,res,next){
	console.log(req.body.password,req.passwordFromDB)
bcrypt.compare(req.body.password,req.passwordFromDB)
.then(function(result){
	console.log(result);
	if(result === true){
	next()

	}
	else{
		res.json({status:500,message:'Invalid PAssword'});
		// next({status:500,message:'Invalid PAssword'})
	}
})
.catch(function(err){
	next(err);
	// next({status:500,message:'ERROROROR'})
})


}

function jwtTokenGen(req,res){

	console.log(req.body.username)
var payloadd = {
	username : req.body.username,
	userLevel:'superadmin',

}

jwt.sign(payloadd, 'thisisSecretKey'
	,{expiresIn:"10h"},function(err,resultToken){
		console.log(err)
		console.log(resultToken)
		res.json({"usertoken":resultToken})
	})
}

function verfiyToken(req,res,next){
	
	if(req.headers.authorization === undefined ){
		res.json({status:401,message:"Unauthorized"})
			}

	console.log(req.headers.authorization);
	//slice the Bearer and sapce part out 
	var token = req.headers.authorization.slice(7,req.headers.authorization.length)

	jwt.verify(token,'thisisSecretKey',function(err,result){
		console.log(err);
		console.log(result);

		//check result then next to another middleware

		next()
	
	})

//token verify 
// next()

}

module.exports = {
 jwtTokenGen,
 validator,
 passwordCheck,
 verfiyToken

}