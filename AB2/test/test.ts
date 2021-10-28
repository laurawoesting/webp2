import * as chaiHttp from 'chai-http';
import { User } from '../src/User';

let chai = require('chai');
let serverImport = require('../src/server');
let should = chai.should();

let server = serverImport.app;
let userList = serverImport.userList;

chai.use(chaiHttp);
describe('API Test for user-related routes', () => {

	let testUser: User = new User('Vorname', 'Nachname');

	beforeEach((done) => {
		userList.forEach(() => userList.pop());
		done();
	});

	describe('GET /users', () => {
		it('it should GET the empty user list', (done) => {
			chai.request(server)
				.get('/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.userList.should.be.a('array');
					res.body.userList.length.should.be.eql(0);
					userList.should.be.a('array');
					userList.length.should.be.eql(0);
					done();
				});
		});

		it('it should GET all existing users', (done) => {
			userList.push(testUser);
			chai.request(server)
				.get('/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.userList.should.be.an('array');
					res.body.userList.length.should.be.equal(1);
					userList.should.be.an('array');
					userList.length.should.be.eql(1);
					done();
				});
		});
	});

	describe('GET /user/:userId', () => {
		it('it should GET the requested user', (done) => {
			userList.push(testUser);
			chai.request(server)
				.get('/user/' + testUser.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.user.should.be.an('object');
					res.body.user.id.should.be.equal(testUser.id);
					res.body.user.firstName.should.be.equal(testUser.firstName);
					res.body.user.lastName.should.be.equal(testUser.lastName);
					done();
				});
		});

		it('it should fail to GET a non-existing user', (done) => {
			chai.request(server)
				.get('/user/' + 123)
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe('POST /user', () => {
		it('it should POST a new user', (done) => {
			chai.request(server)
				.post('/user')
				.send(testUser)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.user.should.be.a('object');
					res.body.user.id.should.be.a('number');
					res.body.user.firstName.should.be.equal(testUser.firstName);
					res.body.user.lastName.should.be.equal(testUser.lastName);
					let userInServerList = userList.find(user => user.id == res.body.user.id);
					userList.length.should.be.equal(1);
					userInServerList.id.should.be.a('number');
					userInServerList.firstName.should.be.equal(testUser.firstName);
					userInServerList.lastName.should.be.equal(testUser.lastName);
					done();
				});
		});
	});

	describe('PUT /user/:userId', () => {
		it('it should PUT a user', (done) => {
			userList.push(testUser);
			chai.request(server)
				.put('/user/' + testUser.id)
				.send(testUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.user.should.be.a('object');
					res.body.user.id.should.be.eql(testUser.id);
					res.body.user.firstName.should.be.eql(testUser.firstName);
					res.body.user.lastName.should.be.eql(testUser.lastName);
					let userInServerList = userList.find(user => user.id == res.body.user.id);
					userList.length.should.be.eql(1);
					userInServerList.id.should.be.eql(testUser.id);
					userInServerList.firstName.should.be.eql(testUser.firstName);
					userInServerList.lastName.should.be.eql(testUser.lastName);
					done();
				});
		});

		it('it should fail to PUT a non-existing user', (done) => {
			chai.request(server)
				.put('/user/' + 123)
				.send(testUser)
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe('DELETE /user/:userId', () => {
		it('it should DELETE a user', (done) => {
			userList.push(testUser);
			chai.request(server)
				.delete('/user/' + testUser.id)
				.end((err, res) => {
					userList = serverImport.userList;
					res.should.have.status(200);
					userList.length.should.be.eql(0);
					done();
				});
		});

		it('it should fail to DELETE a non-existing user', (done) => {
			userList.push(testUser);
			chai.request(server)
				.delete('/user/' + 123)
				.end((err, res) => {
					userList = serverImport.userList;
					res.should.have.status(404);
					userList.length.should.be.eql(1);
					done();
				});
		});
	});
});
