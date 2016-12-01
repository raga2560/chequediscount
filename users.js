var bcrypt = require('bcrypt-nodejs');

/* The UsersDAO must be constructed with a connected database object */
function UsersDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof UsersDAO)) {
        console.log('Warning: UsersDAO constructor called without "new" operator');
        return new UsersDAO(db);
    }

    var users = db.collection("users");

    this.addUser = function(username, password, email,phone, account,  callback) {
        "use strict";

        // Generate password hash
        var salt = bcrypt.genSaltSync();
        var password_hash = bcrypt.hashSync(password, salt);

        // Create user document
        var user = {'_id': username, 'password': password_hash, email: email, phone: phone, account: account};

        // Add email if set

        users.insert(user, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new user");
                return callback(null, result[0]);
            }

            return callback(err, null);
        });
    }

    this.validateLogin = function(username, password, callback) {
        "use strict";

        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {
            "use strict";

            if (err) return callback(err, null);

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(null, user);
                }
                else {
                    var invalid_password_error = new Error("Invalid password");
                    // Set an extra field so we can distinguish this from a db error
                    invalid_password_error.invalid_password = true;
                    callback(invalid_password_error, null);
                }
            }
            else {
                var no_such_user_error = new Error("User: " + user + " does not exist");
                // Set an extra field so we can distinguish this from a db error
                no_such_user_error.no_such_user = true;
                callback(no_such_user_error, null);
            }
        }

        users.findOne({ '_id' : username }, validateUserDoc);
    }
	this.getUser = function(username, callback) {
        "use strict";

        
        users.findOne({ '_id' : username }, {_id:1, account:1 }, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

            if (!record) {
                return callback(new Error("User: " + record + " does not exist"), null);
                
            }
			else {
			callback(null, record);	
			}

            
        });
    }
	this.listissuers = function(username, callback) {
        "use strict";
		
        users.find({'account':'issuer'},{_id:1, account:1}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	this.listdiscounters = function(username, callback) {
        "use strict";
		
        users.find({'account':'discounter'},{_id:1, account:1}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }

	this.listreceivers = function(username, callback) {
        "use strict";
		
        users.find({'account':'receiver'},{_id:1, account:1}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	

	
}

module.exports.UsersDAO = UsersDAO;
