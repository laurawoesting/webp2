"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userList = [];
exports.userList = userList;
var app = express();
exports.app = app;
app.use(express.json());
app.listen(8080, function () {
    console.log('Server started at http://localhost:8080');
});
/**
 * @api {post} /user Create a new user
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {string} firstName The first name of the user to create
 * @apiParam {string} lastName The last name of the user to create
 *
 * @apiSuccess {User} user The created user object
 * @apiSuccess {string} message Message stating that the user has been created
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *      "user":{
 *          "id":1,
 *          "firstName":"Peter",
 *          "lastName":"Kneisel"
 *      },
 *      "message":"User created"
 *  }
 */
app.post('/user', function (req, res) {
    // Read data from request body
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    // TODO Implement this route
    // TODO When creating a new user, the id does not have to be supplied. It will be generated automatically
});
/**
 * @api {get} /user/:userId Request specified user
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {number} userId The id of the user to fetch
 *
 * @apiSuccess {User} user The requested user object
 * @apiSuccess {string} message Message stating the requested user has been fetched
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *      "user":{
 *          "id":1,
 *          "firstName":"Peter",
 *          "lastName":"Kneisel"
 *      },
 *      "message":"User fetched"
 *  }
 *
 *  @apiError (Client Error) {404} UserNotFound The requested user has not been found
 *
 *  @apiErrorExample UserNotFound:
 *  HTTP/1.1 404 Not Found
 *   {
        "message":"User not found"
    }
 */
app.get('/user/:userId', function (req, res) {
    // Read data from request parameters
    var userId = req.params.userId;
    // Search user in user list
    for (var _i = 0, userList_1 = userList; _i < userList_1.length; _i++) {
        var user = userList_1[_i];
        if (user.id == userId) {
            res.status(200).send({
                user: user,
                message: 'User fetched'
            });
            // Terminate this route
            return;
        }
    }
    // The requested user was not found
    res.status(404).send({
        message: 'User not found'
    });
});
/**
 * @api {put} /user/:userId Update specified user
 * @apiName PutUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {number} userId The id of the user to update
 * @apiParam {string} firstName The first name of the user to update
 * @apiParam {string} lastName The last name of the user to update
 *
 * @apiSuccess {User} user The updated user object
 * @apiSuccess {string} message Message stating the requested user has been fetched
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "user":{
 *          "id":1,
 *          "firstName":"Peter",
 *          "lastName":"Kneisel"
 *      },
 *      "message":"User updated"
 *  }
 *
 *  @apiError (Client Error) {404} UserNotFound The requested user has not been found
 *
 *  @apiErrorExample UserNotFound:
 *  HTTP/1.1 404 Not Found
 *   {
        "message":"User not found"
    }
 */
app.put('/user/:userId', function (req, res) {
    // TODO Implement this route
});
/**
 * @api {delete} /user/:userId Delete specified user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {number} userId The id of the user to delete
 *
 * @apiSuccess {string} message Message stating the requested user has been deleted
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message":"User deleted"
 *  }
 *
 *  @apiError (Client Error) {404} UserNotFound The requested user has not been found
 *
 *  @apiErrorExample UserNotFound:
 *  HTTP/1.1 404 Not Found
 *   {
        "message":"User not found"
    }
 */
app.delete('/user/:userId', function (req, res) {
    // TODO Implement this route
});
/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess {User[]} userList The list of all users
 * @apiSuccess {string} message Message stating the requested user has been fetched
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "userList":[
 *          {
 *              "id":1,
 *              "firstName":"Peter",
 *              "lastName":"Kneisel"
 *          },
 *          ...
 *      ],
 *      "message":"List of all users fetched"
 *  }
 */
app.get('/users', function (req, res) {
    // TODO Implement this route
});
//# sourceMappingURL=server.js.map