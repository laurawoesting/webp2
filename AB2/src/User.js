"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(firstName, lastName, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        if (typeof id === 'undefined') {
            this.id = User.getNextId();
        }
        else {
            this.id = id;
        }
    }
    User.getNextId = function () {
        return User.idCounter++;
    };
    User.idCounter = 1;
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map