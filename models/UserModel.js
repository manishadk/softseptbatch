var db = require('../config/dbConfig.js')

var user = db.sequelize.define('users', {
//attributes
id: {
	type:db.Sequelize.INTEGER ,
	primaryKey: true,
	autoIncrement:true,
	allowNull:false
},
username: {
	type:db.Sequelize.TEXT ,
	allowNull:false
},
password: {
	type:db.Sequelize.TEXT ,
	allowNull:false
}
},
{

freezeTableName: true,
tableName:'user_tables_2'

}
)

 user.sync({force:false})
 .then(function(){

 })
 .catch(function(err){

console.log(err)

 })

module.exports = user;


