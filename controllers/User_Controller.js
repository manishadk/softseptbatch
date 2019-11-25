var user = require('../models/UserModel.js')

function validation (req,res,next){
// console.log(req.body.username);

user.findOne({
	where:{usernamee:req.body.username}
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
password:req.body.password

})
.then(function(result){

// console.log(result);
})
.catch(function(err){
console.log(err)
next(err);
})

}

module.exports = {
	registerUser,
	validation
}


