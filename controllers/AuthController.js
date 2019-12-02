
var jwt = require('jsonwebtoken');

function validtor (){
//next
}

function passwordCheck(){
	//bcrypt.compare

	//next

	// next({message: "sdfsdfs", status:500})
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

module.exports = {
 jwtTokenGen

}