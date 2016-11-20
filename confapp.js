/* The ConfappDAO must be constructed with a connected database object */
function ConfappDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ConfappDAO)) {
        console.log('Warning: ConfappDAO constructor called without "new" operator');
        return new ConfappDAO(db);
    }

    var confapp = db.collection("confapp");
	
	this.getEventids = function(username, callback) {
        "use strict";
		username = "test15";
        confapp.findOne( {'creator': username}, {'home':1, '_id': 1},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.getSocial = function(username, callback) {
        "use strict";
        confapp.findOne({'creator': username}, {'social':1, '_id': 0},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.getHome = function(username, callback) {
        "use strict";
        confapp.findOne({'creator': username}, {'home':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        });
    }

	this.getgallerylist = function(username, callback) {
        "use strict";
		
        confapp.findOne({'creator': username}, {'gallery':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getnotificationlist = function(username, callback) {
        "use strict";
		
        confapp.findOne({'creator': username}, {'notifications':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getvenue = function(username, callback) {
        "use strict";
		
        confapp.findOne({'creator': username}, {'venue':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	
	this.geteventdetails = function(username, callback) {
        "use strict";
		
        confapp.findOne({'creator': username}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	this.loadevent = function(id, callback) {
        "use strict";
		
					var query = {};
			query['_id'] = id;
			
			var ObjectID = require('mongodb').ObjectID;
	var o_id = new ObjectID(id);


        confapp.findOne( {'_id': o_id}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
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
        //confapp.find({ 'home.name' : {$regex : pattern} }).limit(num).toArray(function(err, items) {
			
		
				
	//		confapp.find({ 'home.name' : new RegExp(str) }, {'home.name':1}, function(err, items) {
			
		confapp.find({ 'home.name' : new RegExp(str) } , {'home.name':1}).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

			console.log (items);
            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }
	
	
	this.getagenda = function(username, callback) {
        "use strict";
		
        confapp.findOne({'creator': username}, {'agenda':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	
	
	 this.insertEntry = function (username, callback) {
        "use strict";
        
		var companyevent = {
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
  
		confapp.insert(companyevent,{w:1}, function (err, result) {
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
		  confapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			confapp.update(query, {$set: { social:social}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
	}

		this.addHome = function(username, home, callback) {
        "use strict";
		  confapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			confapp.update(query, {$set: { home:home}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addAgenda = function(username, agenda, callback) {
        "use strict";
		  confapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			confapp.update(query, {$set: { agenda:agenda}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addVenue = function(username, venue, callback) {
        "use strict";
		  confapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			confapp.update(query, {$set: { venue:venue}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	
	
		this.addGallery = function(username, gallery, callback) {
        "use strict";
		  confapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			confapp.update(query, {$push: { gallery:gallery}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        }); 
		
		
    }
	

		this.addNotification = function(username, notification, callback) {
        "use strict";
		  confapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			confapp.update(query, {$push: { notifications:notification}}, function (err){

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

module.exports.ConfappDAO = ConfappDAO;
