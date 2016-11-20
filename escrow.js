/* The escrowstoreDAO must be constructed with a connected database object */
function EscrowstoreDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof EscrowstoreDAO)) {
        console.log('Warning: escrowstoreDAO constructor called without "new" operator');
        return new EscrowstoreDAO(db);
    }

    var escrowstore = db.collection("escrow");
	/*
	Format
	{username:'', eventid:'','event': {,}}
	
	*/
	
	this.insertevent = function (username, data, callback) {
        "use strict";
        
		

        "use strict";
		 
			var objecttoinsert = {
			username : username,
			network : '',
			eventid: '',
			sellerterms:'',
			buyerterms: '',
			policy:{},
			buyers:[],
			sellers:[],
			assets:[],
			event:{}
			
			};
		
			objecttoinsert.network = data.network;
			objecttoinsert.sellerterms = data.sellerterms;
			objecttoinsert.buyerterms = data.buyerterms;
			objecttoinsert.event.title = data.title;
			objecttoinsert.event.description = data.description;

				objecttoinsert.event.testnet = data.testnet;


				objecttoinsert.event.mainnet = data.mainnet;

			
						
			
			escrowstore.insert(objecttoinsert,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new event");
                return callback(null, result);
            }

            return callback(err, null);
			});
		
		
    }
	
	this.updateevent = function (username, data, callback) {
        "use strict";
        
		

        "use strict";
		  escrowstore.findOne({'username': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
				
			record.eventid = data.eventid;
			record.event = data;
			
			
			escrowstore.update(query, {$set: record}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
		  
		  }
		  else {
		
			var objecttoinsert = {
			username : username,
			network : '',
			eventid: '',
			event: {}
			
			};
		
			objecttoinsert.network = data.network;
			objecttoinsert.eventid = data.eventid;
			objecttoinsert.event = data;
			
			escrowstore.insert(objecttoinsert,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new event");
                return callback(null, result);
            }

            return callback(err, null);
			});
		

		
		  }
			
        }); 
		
		
    	
		
		
		
    }
	
	
	this.setescrowstructure = function (data, callback) {
        "use strict";
        
		var eventaddress = data.eventaddress;
		var useraddress = data.useraddress;
		var assetId = data.assetId;
		var xxx = {
					network: 'testnet',
					eventaddress : eventaddress,
					escrowdata: data.data,
					assets:[],
					buyers:[],
					policy: {},
					returnedassets :[],
					sentassetstobuyer :[]
				};
				
				
				
				escrowstore.insert(xxx,{w:1}, function (err, record) {
            "use strict";
			if(!err) {
		return callback(null, record);
            }else {
				return callback(err, null);	
			}
				});

		
	
	}
	
		this.setpolicyrate = function (data, callback) {
        "use strict";
        
		var eventaddress = data.eventaddress;
		var minsellersneeded = data.minsellersneeded;
		
		

		console.log('eventaddress='+ eventaddress);
        "use strict";
		  escrowstore.findOne({'eventaddress': eventaddress}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			console.log('record='+ record);
			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			
			record.policy = data;
			
			escrowstore.update(query, {$set: record}, function (err){

			if (err) return callback (err, null);
			
			callback(null, 1);
			});
			
			}
			else{
				
			  var err = "escrow record doesnot exist";
					return callback(err, null);
				
			
			
			}		
			
			
			
        }); 
		
    }

	
	this.setbuyerprice = function (data, callback) {
        "use strict";
        
		var eventaddress = data.eventaddress;
		var useraddress = data.useraddress;
		
		

		console.log('eventaddress='+ eventaddress);
        "use strict";
		  escrowstore.findOne({'eventaddress': eventaddress}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			console.log('record='+ record);
			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			var	found = false;
			for(var i =0; i< record.buyers.length; i++) {
				if(record.buyers[i].useraddress == useraddress){
					
					record.buyers[i] = data;
					found = true;
			
				}
			}
			if(found == false)
			{
				record.buyers.push(data);
			}
			
			escrowstore.update(query, {$set: record}, function (err){

			if (err) return callback (err, null);
			
			callback(null, 1);
			});
			
			}
			else{
				
			  var err = "escrow record doesnot exist";
					return callback(err, null);
				
			
			
			}		
			
			
			
        }); 
		
    }
	
	this.setsellerprice = function (data, callback) {
        "use strict";
        
		var eventaddress = data.eventaddress;
		var useraddress = data.useraddress;
		var assetId = data.assetId;
		
		

        "use strict";
		  escrowstore.findOne({'eventaddress': eventaddress}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			var	found = false;
			for(var i =0; i< record.assets.length; i++) {
				if(record.assets[i].assetId == assetId){
					
					record.assets[i].price = data.price;
					record.assets[i].status = 'active';
					found = true;
			
				}
			}
			if(found == false)
			{
				var err = "AssetId is missing in escrow record. Asset is not applied for event. ";
				
				if (err) return callback (err, null);
				//record.buyers.push(data);
				
			}
			
			escrowstore.update(query, {$set: record}, function (err){

			if (err) return callback (err, null);
			
			callback(null, 1);
			});
			
			}
			else{
				
			  var err = "escrow record doesnot exist";
					return callback(err, null);
				
			
			
			}		
			
			
			
        }); 
		
    }
	
	this.getmatchreport = function (what, callback)
	{
		var query ;
		var eventaddress;
		var buyeraddress;
		
		var buyerrecord = {};
		var charts ={
			eventaddress: what.eventaddress,
			buyeraddress: what.buyeraddress,
			matchingsellers: '',
			totalsellers: '',
			eventname:what.eventname,
			buyername:what.buyername,
			policydemand: what.minsellersneeded,
			buyerprice:what.buyerprice
			
		};
		
		  escrowstore.findOne({'eventaddress': what.eventaddress}, function(err, record) {
            "use strict";

            if (err || record== null) return callback(err, null);

			if( record != null) {
		
			for(var i =0; i< record.buyers.length; i++) {
				if(record.buyers[i].useraddress == what.buyeraddress){
					
					
					buyerrecord = record.buyers[i];
					break;
				}
			}
			if(buyerrecord == null) return callback(err, null);
			console.log("buyerrecord="+JSON.stringify(buyerrecord));
			console.log("record="+JSON.stringify(record))
			charts.totalsellers = record.assets.length;
			var matching = 0;
			for(var i =0 ; i< record.assets.length; i++){
			if(parseInt(buyerrecord.price) >= parseInt(record.assets[i].price)){
				matching ++; 
			 }
			}

			charts.matchingsellers = matching;
			charts.policydemand = (what.minsellersneeded/100) * charts.totalsellers;
			
             callback(null, charts);
			}
        });
		
	}
	
	
	this.insertasset = function (data, callback) {
        "use strict";
        
		var eventaddress = data.eventaddress;
		var useraddress = data.useraddress;
		var assetId = data.assetId;
		

        "use strict";
		  escrowstore.findOne({'eventaddress': eventaddress}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
				
			for(var i =0; i< record.assets.length; i++) {
				if(record.assets[i].assetId == assetId){
					
					
					var err = "userrecord exists for user";
					return callback(err, null);
				}
			}
			
			  escrowstore.update(query, {$push: {assets: data}}, function (err){

			if (err) return callback (err, null);
			
			callback(null, 1);
			});
			
			}
			else{
				
			  var err = "escrow record doesnot exist";
					return callback(err, null);
				
			
				
                
            
			
			
			
			}		
			
			
			
        }); 
		
    }
	
	

		this.insertseller = function (eventaddress, data, callback) {
        "use strict";
        
		var useraddress = data.user.record.testnet.address;

        "use strict";
		  escrowstore.findOne({'event.testnet.address': eventaddress}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
				
			for(var i =0; i< record.sellers.length; i++) {
				if(record.sellers[i].record.testnet.address == useraddress){
					
					
					var err = "userrecord exists for user";
					return callback(err, null);
				}
			}
			
			
			
			escrowstore.update(query, {$push: {sellers: data.user}}, function (err){

			if (err) return callback (err, null);
			
			callback(null, 1);
			});
		  
		  }
		  else {
			  var err = "event not found";
			  return callback(err, null);
		  }
		
			
        }); 
		
    }
	

	this.listescrow = function(username, callback) {
        "use strict";
		
        escrowstore.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.getoneevent = function(username, eventid, callback) {
        "use strict";
		
        escrowstore.findOne( {'username': username, 'eventid': eventid},function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.geteventids = function(username, callback) {
        "use strict";
		username = "test15";
        escrowstore.findOne( {'creator': username}, {'home':1, '_id': 1},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.getSocial = function(username, callback) {
        "use strict";
        escrowstore.findOne({'creator': username}, {'social':1, '_id': 0},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.getHome = function(username, callback) {
        "use strict";
        escrowstore.findOne({'creator': username}, {'home':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        });
    }

	this.getgallerylist = function(username, callback) {
        "use strict";
		
        escrowstore.findOne({'creator': username}, {'gallery':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getnotificationlist = function(username, callback) {
        "use strict";
		
        escrowstore.findOne({'creator': username}, {'notifications':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getvenue = function(username, callback) {
        "use strict";
		
        escrowstore.findOne({'creator': username}, {'venue':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	
	this.geteventdetails = function(username, callback) {
        "use strict";
		
        escrowstore.findOne({'creator': username}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
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


        escrowstore.findOne( {'_id': o_id}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
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
        //escrowstore.find({ 'home.name' : {$regex : pattern} }).limit(num).toArray(function(err, items) {
			
		
				
	//		escrowstore.find({ 'home.name' : new RegExp(str) }, {'home.name':1}, function(err, items) {
			
		escrowstore.find({ 'home.name' : new RegExp(str) } , {'home.name':1}).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

			console.log (items);
            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }
	
	
	this.getagenda = function(username, callback) {
        "use strict";
		
        escrowstore.findOne({'creator': username}, {'agenda':1, '_id': 0},function(err, home1) {
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
  
		escrowstore.insert(companyevent,{w:1}, function (err, result) {
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
		  escrowstore.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			escrowstore.update(query, {$set: { social:social}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
	}

		this.addHome = function(username, home, callback) {
        "use strict";
		  escrowstore.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			escrowstore.update(query, {$set: { home:home}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addAgenda = function(username, agenda, callback) {
        "use strict";
		  escrowstore.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			escrowstore.update(query, {$set: { agenda:agenda}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addVenue = function(username, venue, callback) {
        "use strict";
		  escrowstore.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			escrowstore.update(query, {$set: { venue:venue}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	
	
		this.addGallery = function(username, gallery, callback) {
        "use strict";
		  escrowstore.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			escrowstore.update(query, {$push: { gallery:gallery}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        }); 
		
		
    }
	

		this.addNotification = function(username, notification, callback) {
        "use strict";
		  escrowstore.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			escrowstore.update(query, {$push: { notifications:notification}}, function (err){

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

module.exports.EscrowstoreDAO = EscrowstoreDAO;
