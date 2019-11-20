
var Sequelize  = require('sequelize')

var sequelize = new Sequelize('soft11','root','root',{
	host : 'localhost',
	dialect: 'mysql',
	logging:false
});
 sequelize.authenticate()
.then(
function(){ 
	console.log('db connection successfull')
})

.catch(
	function(err){
	console.log(err)
})

// var a = {name:'asd'};
// var b = {roll:123}

module.exports = {
	Sequelize, sequelize
}