
function ChequeAppDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ChequeAppDAO)) {
        console.log('Warning: escrowstoreDAO constructor called without "new" operator');
        return new ChequeAppDAO(db);
    }

    var chequeappstore = db.collection("chequeapp");
	
	
	
	
	
//---------------------------------1.1-------------------------------------------//
	
	
	this.addcheque = function (username, cheque,  callback) {
        "use strict";
        
		

        "use strict";
		  
			
			chequeappstore.insert(cheque, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new event");
                return callback(null, result[0]);
            }

            return callback(err, null);
			});
		

		
		
    }
	
	

// above cheque related	
//---------------------------------1.1-------------------------------------------//
	
	
  	

	this.getactivetransactions = function(username, callback) {
        "use strict";
		
        //chequeappstore.find({'traded':'pending'}).toArray(function(err, data) {
			chequeappstore.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	
	
	this.gettransactions = function(username, callback) {
        "use strict";
		
        chequeappstore.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	

	this.getusertransactions = function(username,type, callback) {
        "use strict";
		if(type == 'receiver') {
        chequeappstore.find({'receiver': username}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
		}else if(type == 'issuer') {
			chequeappstore.find({'issuer': username}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
			});
		
		}else if(type == 'discounter') {
			chequeappstore.find({'discounter': username}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
			});
		}
		
		
    }

  //---------------------------------1.2-------------------------------------------//
  
  
  
  // 
  
  	this.setdiscount = function(username, useraddress, chequerecordid, setdiscount, callback) {
        "use strict";
		
		
			
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(chequerecordid);


        chequeappstore.findOne( {'_id': o_id} ,function(err, record) {
            "use strict";

			
            if (err) return callback(err, null);
			
			if(setdiscount < record.maxdiscount) {
			if(record.traded == 'pending') {
			record.discount = setdiscount;
			record.discounter = username;
			record.discounteraddress = useraddress;
			record.traded = 'done';
			
			var query = {};
		    query['_id'] = o_id;
		
			  chequeappstore.update(query, {$set: {discount: setdiscount, discounter: username, traded: 'done',discounteraddress: useraddress }} , function (err, rec){

			if (err) return callback (err, null);
					
			//		callback(null, rec);
			});
			}
		
            
			}
			callback(null, record);
        }); 
    }
	
	this.setmaxdiscount = function(username, chequerecordid, setmaxdiscount, callback) {
        "use strict";
		
		
			
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(chequerecordid);


		
        chequeappstore.findOne( {'_id': o_id} ,function(err, record) {
            "use strict";

			
            if (err) return callback(err, null);
			
				if(record.receiver != username) {
					var err1 = {
						message: 'Only receiver of cheque can set maxdiscount'
					};
					return callback (err1, null);
				}
			
			if(record.traded == 'pending') {
			record.maxdiscount = setmaxdiscount;
			
			
			}
			chequeappstore.update(query, {$set: record} , function (err, rec){

			if (err) return callback (err, null);
					
					callback(null, rec);
			});
		
            
			
			callback(null, record);
        }); 
    }
	
	this.setissuerrating = function(username, chequerecordid, setrating,ratingmessage, callback) {
        "use strict";
		
		
			
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(chequerecordid);


		
        chequeappstore.findOne( {'_id': o_id} ,function(err, record) {
            "use strict";

			
            if (err) return callback(err, null);
			
				if(record.discounter != username) {
					var err1 = {
						message: 'Only discounter of cheque can set rating'
					};
					return callback (err1, null);
				}
			
			if(record.traded != 'done') {
				var err1 = {
						message: 'Only after trading rating can be set'
					};
					return callback (err1, null);
			}
			
			record.issuerrating = setrating;
			record.ratingmessage = ratingmessage;
			record.rated = 'yes';
		
			var query = {};
		    query['_id'] = o_id;
		
			
			chequeappstore.update(query, {$set: {issuerrating: setrating, ratingmessage: ratingmessage, rated:'yes'}} , function (err, rec){

			if (err) return callback (err, null);
					
					callback(null, rec);
			});
		
            
			
			callback(null, record);
        }); 
    }
	
	

	this.updatecheque = function (cheque,issuerlimit,networkrating,exposure,issueraddress,  callback) {
	
        "use strict";
		var query = {};
		query['_id'] = cheque._id;
		
		chequeappstore.update(query, {$set: {issuerlimit: issuerlimit, networkrating: networkrating, 
				exposure: exposure, issueraddress: issueraddress} } , function (err, rec){

			if (err) return callback (err, null);
					
					callback(null, rec);
			});
			
    }
	

	this.updateratingfor_issuers = function (issuername,rating,  callback) {
	
        "use strict";
		var query = {issuer:issuername};
		
		chequeappstore.update(query, {$set: {networkrating: rating }}, {multi:true } , function (err, rec){

			if (err) return callback (err, null);
					
					callback(null, rec);
			});
			
    }
	
  
  //---------------------------------1.3-------------------------------------------//
  
  this.listpolicies = function(username, callback) {
        "use strict";
		
        chequeappstore.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.getchequeapp = function(id, callback) {
        "use strict";
		
		var query = {};
		query['_id'] = id;
			
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(id);


        chequeappstore.findOne( {'_id': o_id} ,function(err, p1) {
            "use strict";

			console.log(p1);
            if (err) return callback(err, null);

            callback(null, p1);
        }); 
    }
	
	
	
	
	
	
	
	
	
	this.getchequeapptitle = function(title, callback) {
        "use strict";
		
		

         chequeappstore.findOne({'title': title}, function(err, p1) {
            "use strict";

			console.log(p1);
            if (err) return callback(err, null);

            callback(null, p1);
        }); 
    }
	
	//userapplychequeapp
	
	 
	this.userapplychequeapp = function (data,  callback) {
        "use strict";
        
		

        "use strict";
		  chequeappstore.findOne({'title': data.chequeapp}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
				
			
			
			chequeappstore.update(query, {$addToSet: {individualssubscribed: data.user}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
		  
		  }
		  });
		  
	}
	
	
}

module.exports.ChequeAppDAO = ChequeAppDAO;
