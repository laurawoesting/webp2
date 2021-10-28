"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chaiHttp = require("chai-http");
var User_1 = require("../src/User");
var chai = require('chai');
var serverImport = require('../src/server');
var should = chai.should();
var server = serverImport.app;
var userList = serverImport.userList;
chai.use(chaiHttp);
describe('API Test for user-related routes', function () {
    var testUser = new User_1.User('Vorname', 'Nachname');
    beforeEach(function (done) {
        userList.forEach(function () { return userList.pop(); });
        done();
    });
    describe('GET /users', function () {
        it('it should GET the empty user list', function (done) {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.userList.should.be.a('array');
                res.body.userList.length.should.be.eql(0);
                userList.should.be.a('array');
                userList.length.should.be.eql(0);
                done();
            });
        });
        it('it should GET all existing users', function (done) {
            userList.push(testUser);
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.userList.should.be.an('array');
                res.body.userList.length.should.be.equal(1);
                userList.should.be.an('array');
                userList.length.should.be.eql(1);
                done();
            });
        });
    });
    describe('GET /user/:userId', function () {
        it('it should GET the requested user', function (done) {
            userList.push(testUser);
            chai.request(server)
                .get('/user/' + testUser.id)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.user.should.be.an('object');
                res.body.user.id.should.be.equal(testUser.id);
                res.body.user.firstName.should.be.equal(testUser.firstName);
                res.body.user.lastName.should.be.equal(testUser.lastName);
                done();
            });
        });
        it('it should fail to GET a non-existing user', function (done) {
            chai.request(server)
                .get('/user/' + 123)
                .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
        });
    });
    describe('POST /user', function () {
        it('it should POST a new user', function (done) {
            chai.request(server)
                .post('/user')
                .send(testUser)
                .end(function (err, res) {
                res.should.have.status(201);
                res.body.user.should.be.a('object');
                res.body.user.id.should.be.a('number');
                res.body.user.firstName.should.be.equal(testUser.firstName);
                res.body.user.lastName.should.be.equal(testUser.lastName);
                var userInServerList = userList.find(function (user) { return user.id == res.body.user.id; });
                userList.length.should.be.equal(1);
                userInServerList.id.should.be.a('number');
                userInServerList.firstName.should.be.equal(testUser.firstName);
                userInServerList.lastName.should.be.equal(testUser.lastName);
                done();
            });
        });
    });
    describe('PUT /user/:userId', function () {
        it('it should PUT a user', function (done) {
            userList.push(testUser);
            chai.request(server)
                .put('/user/' + testUser.id)
                .send(testUser)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.user.should.be.a('object');
                res.body.user.id.should.be.eql(testUser.id);
                res.body.user.firstName.should.be.eql(testUser.firstName);
                res.body.user.lastName.should.be.eql(testUser.lastName);
                var userInServerList = userList.find(function (user) { return user.id == res.body.user.id; });
                userList.length.should.be.eql(1);
                userInServerList.id.should.be.eql(testUser.id);
                userInServerList.firstName.should.be.eql(testUser.firstName);
                userInServerList.lastName.should.be.eql(testUser.lastName);
                done();
            });
        });
        it('it should fail to PUT a non-existing user', function (done) {
            chai.request(server)
                .put('/user/' + 123)
                .send(testUser)
                .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
        });
    });
    describe('DELETE /user/:userId', function () {
        it('it should DELETE a user', function (done) {
            userList.push(testUser);
            chai.request(server)
                .delete('/user/' + testUser.id)
                .end(function (err, res) {
                userList = serverImport.userList;
                res.should.have.status(200);
                userList.length.should.be.eql(0);
                done();
            });
        });
        it('it should fail to DELETE a non-existing user', function (done) {
            userList.push(testUser);
            chai.request(server)
                .delete('/user/' + 123)
                .end(function (err, res) {
                userList = serverImport.userList;
                res.should.have.status(404);
                userList.length.should.be.eql(1);
                done();
            });
        });
    });
});
//# sourceMappingURL=test.js.map