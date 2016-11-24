/* The userrecordDAO must be constructed with a connected database object */
function UserrecordDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof UserrecordDAO)) {
        console.log('Warning: userrecordDAO constructor called without "new" operator');
        return new UserrecordDAO(db);
    }

   
   var accountrecstore = db.collection("accountrecord");
   
   this.readaccountrecord = function (username, callback) {
        "use strict";
        
		

        "use strict";
		  accountrecstore.findOne({'username': username},  function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			
			
			return callback(null, record);
	
	        });
		  
    }
	this.addaccountrecord = function (username, data, callback) {
        "use strict";
        
		

        "use strict";
		  accountrecstore.findOne({'username': username},  function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			var record_already_exists = new Error("Record already exists");
			
			return callback(record_already_exists, record);
			
		  }
		  else {
		
			
			
			
			accountrecstore.insert(data,{w:1},  function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new record");
                return callback(null, result);
            }

            if (err) return callback(err, null);
			});
		
			//return callback(err, null);
		
		  }
			
        }); 
		
    }
	this.listaccissuers = function(username, callback) {
        "use strict";
		
        accountrecstore.find({'account':'issuer'}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.listdiscounters = function(username, callback) {
        "use strict";
		
        accountrecstore.find({'account':'discounter'}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.listaccreceivers = function(username, callback) {
        "use strict";
		
        accountrecstore.find({'account':'receiver'}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	

	
}

module.exports.UserrecordDAO = UserrecordDAO;
