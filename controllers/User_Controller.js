var user = require('../models/UserModel.js')

user.create({
username:'asdadasda',
password:'swerwerwer'

})
.then(function(result){

console.log(result);
})
.catch(function(err){
console.log(err)
})
