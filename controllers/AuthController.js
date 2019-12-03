var user = require('../models/UserModel.js')

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
	console.log(result);
	req.passwordFromDB = result.dataValues.password
next();
}

})

.catch(function(err){

})

next()
}

function passwordCheck(req,res,next){
bcrypt.compare(req.body.password,req.passwordFromDB)
.then(function(result){
	if(result === true){
	next()

	}
	else{
		res.send('Invalid PAssword');
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
	// req.headers.Auth
	console.log(req.headers.authorization);
	jwt.verify(token,'thisisSecretKey',)

//token verify 
// next()

}

module.exports = {
 jwtTokenGen,
 validator,
 passwordCheck,
 verfiyToken

}