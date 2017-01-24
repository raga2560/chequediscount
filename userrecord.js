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
		//	var record_already_exists = new Error("Record already exists");
			
		//	return callback(record_already_exists, record);
		
			accountrecstore.update(query,{$set: data},  function (err, result) {
            "use strict";

            if (!err) {
                console.log("record updated");
                return callback(null, result);
            }

            if (err) return callback(err, null);
			});
		
			
			
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
	
	
	this.updatealletheraddress = function(records, callback) {
		 "use strict";
		 
		 var recordlength;
		accountrecstore.find({}).toArray(function(err, data) {
            "use strict";

		//console.log(data);
        if (err) return callback(err, null);
		recordlength = data.length;
		
		for(var i=0; i< data.length; i++) {
			
			var query = {};
		    query['_id'] = data[i]._id;
			
			 accountrecstore.update(query, {$set: {useraddress: records[i] }} , function (err, rec){
			 //console.log(data);
            
			//if (err) return callback(err, null);
			
			 });
		}
			var data1 = records.slice(recordlength);
            callback(null, data1);
        });
		
	}
	
	
	
	
	this.updateissuerrating = function(recordid, rating, callback) {
		 "use strict";
		 
		
			var query = {};
		    query['_id'] = recordid;
			
			 accountrecstore.update(query, {$set: {rating: rating}} , function (err, rec){
				 callback(null, rec);
			 });
		
        
		
	}
	
	
	
	this.listaccissuers = function(username, callback) {
        "use strict";
		
        accountrecstore.find({'account':'issuer'}).toArray(function(err, data) {
            "use strict";

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
