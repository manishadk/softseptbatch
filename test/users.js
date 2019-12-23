var chai = require('chai')
var chaiHttp = require('chai-http');
var should = chai.should()

chai.use(chaiHttp);

var server = require('../index.js')

describe('Users',function(){

	desribe('POST user registration test',function(){

		it('it should regisetr a single user, provided username is unique and password is entered',function(done){

		chai.request(server)
			.post('/registration')
			.set('content-type','application/x-www-form-urlencoded')
			.send({
				username:'xyasdz',
				password:'xyz',
				address:'xyz123123'
			})
			.end(function(err,res){

				res.should.have.status(201);
				res.body.should.have.property('message').eql('You have been registered succesfully')
				done();
			})


		}

	})


})