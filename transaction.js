/* The TransactionDAO must be constructed with a connected database object */
function TransactionDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof TransactionDAO)) {
        console.log('Warning: TransactionDAO constructor called without "new" operator');
        return new TransactionDAO(db);
    }

    var Transaction = db.collection("Transaction");
	/*
	Format
	{username:'', Transactionid:'','Transaction': {,}}
	
	*/
	
	this.inserttransaction = function ( data, callback) {
        "use strict";
        
		

        "use strict";
		 
			
						
			
			Transaction.insert(data,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new Transaction");
                return callback(null, result);
            }

            return callback(err, null);
			});
		
		
    }
	
	this.updateTransaction = function (username, data, callback) {
        "use strict";
        
		

        "use strict";
		  Transaction.findOne({'username': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
				
			
			record.Transaction = data;
			
			
			Transaction.update(query, {$set: record}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
		  
		  }
		  else {
		
			var objecttoinsert = {
			username : username,
			
			
			record: {}
			
			};
		
			
			objecttoinsert.record = data;
			
			Transaction.insert(objecttoinsert,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new Transaction");
                return callback(null, result);
            }

            return callback(err, null);
			});
		

		
		  }
			
        }); 
		
		
    	
		
		
		
    }
	
	this.listTransactions = function(username,type, callback) {
        "use strict";
		
		console.log("type="+ type);
		if(type == 'buyer' || type == 'seller'){
			
		}
		else {
			var err = "no type mentioned";
			return callback(err, null);
		}
		
        Transaction.find({'username': username, 'record.role': type}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.getoneTransaction = function(username, Transactionid, callback) {
        "use strict";
		
        Transaction.findOne( {'username': username},function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	this.getrecordbyid = function(id,  callback) {
        "use strict";
		
			console.log("id="+id);
			
	var ObjectID = require('mongodb').ObjectID;
	var o_id = new ObjectID(id);

	var query = {};
			query['_id'] = o_id;
			
        Transaction.findOne( query,function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.getrecordbyaddress = function(address, callback) {
        "use strict";
		
        Transaction.findOne( {'record.testnet.address': address},function(err, obj) {
            "use strict";

			console.log(obj);
            if (err) return callback(err, null);

            callback(null, obj);
        });
    }
	this.getTransaction = function(username, callback) {
        "use strict";
		
        Transaction.findOne( {'creator': username}, {'home':1, '_id': 1},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.getSocial = function(username, callback) {
        "use strict";
        Transaction.findOne({'creator': username}, {'social':1, '_id': 0},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.getHome = function(username, callback) {
        "use strict";
        Transaction.findOne({'creator': username}, {'home':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        });
    }

	this.getgallerylist = function(username, callback) {
        "use strict";
		
        Transaction.findOne({'creator': username}, {'gallery':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getnotificationlist = function(username, callback) {
        "use strict";
		
        Transaction.findOne({'creator': username}, {'notifications':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getvenue = function(username, callback) {
        "use strict";
		
        Transaction.findOne({'creator': username}, {'venue':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	
	this.getTransactiondetails = function(username, callback) {
        "use strict";
		
        Transaction.findOne({'creator': username}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	this.loadTransaction = function(id, callback) {
        "use strict";
		
					var query = {};
			query['_id'] = id;
			
			var ObjectID = require('mongodb').ObjectID;
	var o_id = new ObjectID(id);


        Transaction.findOne( {'_id': o_id}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	this.search = function(str, num, callback) {
        "use strict";

		var pattern  = "/" + str + "/" + "i";
		  console.log("Pattern " + pattern);
        //Transaction.find({ 'home.name' : {$regex : pattern} }).limit(num).toArray(function(err, items) {
			
		
				
	//		Transaction.find({ 'home.name' : new RegExp(str) }, {'home.name':1}, function(err, items) {
			
		Transaction.find({ 'home.name' : new RegExp(str) } , {'home.name':1}).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

			console.log (items);
            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }
	
	
	this.getagenda = function(username, callback) {
        "use strict";
		
        Transaction.findOne({'creator': username}, {'agenda':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	
	
	 this.insertEntry = function (username, callback) {
        "use strict";
        
		var companyTransaction = {
		 "home" : {
	  		},
		"agenda":{
	 		},
		venue :{
		},
  gallery : [],
  notifications: [],
  social: {facebook:{}, twitter:{}},
  
  users : [] , // list of users
  adminusers: [], // admin userid
  creator : username
		};
  
		Transaction.insert(companyTransaction,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new user");
                return callback(null, result);
            }

            return callback(err, null);
        });
		
		
		
    }
	
	
	this.addSocial = function(username, social, callback) {
        "use strict";
		  Transaction.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Transaction.update(query, {$set: { social:social}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
	}

		this.addHome = function(username, home, callback) {
        "use strict";
		  Transaction.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Transaction.update(query, {$set: { home:home}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addAgenda = function(username, agenda, callback) {
        "use strict";
		  Transaction.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Transaction.update(query, {$set: { agenda:agenda}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addVenue = function(username, venue, callback) {
        "use strict";
		  Transaction.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Transaction.update(query, {$set: { venue:venue}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	
	
		this.addGallery = function(username, gallery, callback) {
        "use strict";
		  Transaction.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Transaction.update(query, {$push: { gallery:gallery}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        }); 
		
		
    }
	

		this.addNotification = function(username, notification, callback) {
        "use strict";
		  Transaction.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Transaction.update(query, {$push: { notifications:notification}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        }); 
		
		
    }	
	
	
	
	
	
	
/*
    this.insertEntry = function (title, body, tags, author, callback) {
        "use strict";
        console.log("inserting blog entry" + title + body);

        // fix up the permalink to not include whitespace
        var permalink = title.replace( /\s/g, '_' );
        permalink = permalink.replace( /\W/g, '' );

        // Build a new post
        var post = {"title": title,
                "author": author,
                "body": body,
                "permalink":permalink,
                "tags": tags,
                "comments": [],
                "date": new Date()}

        // now insert the post
        // hw3.2 TODO
        //callback(Error("insertEntry NYI"), null);
		
		posts.insert(post,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new user");
                return callback(null, permalink);
            }

            return callback(err, null);
        });
		
		
		
    }

    this.getPosts = function(num, callback) {
        "use strict";

        posts.find().sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }

    this.getPostsByTag = function(tag, num, callback) {
        "use strict";

        posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }

    this.getPostByPermalink = function(permalink, callback) {
        "use strict";
        posts.findOne({'permalink': permalink}, function(err, post) {
            "use strict";

            if (err) return callback(err, null);

            callback(err, post);
        });
    }

    this.addComment = function(permalink, name, email, body, callback) {
        "use strict";

        var comment = {'author': name, 'body': body}

        if (email != "") {
            comment['email'] = email
        }

        // hw3.3 TODO
        // callback(Error("addComment NYI"), null);
		
		  posts.findOne({'permalink': permalink}, function(err, post) {
            "use strict";

            if (err) return callback(err, null);

			var query = {};
			query['_id'] = post['_id'];
			
			posts.update(query, {$push: { comments:comment}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
	   
			
        });
		
		
    } 
	*/
}

module.exports.TransactionDAO = TransactionDAO;
