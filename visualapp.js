/* The VisualappDAO must be constructed with a connected database object */
var csv = require('ya-csv');
function VisualappDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof VisualappDAO)) {
        console.log('Warning: VisualappDAO constructor called without "new" operator');
        return new VisualappDAO(db);
    }

    var Visualapp = db.collection("orders");
	
	this.getEventids = function(username, callback) {
        "use strict";
		username = "test15";
        Visualapp.findOne( {'creator': username}, {'home':1, '_id': 1},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	this.findOne = function(username, callback) {
        "use strict";
		username = "test15";
        Visualapp.findOne( {},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	this.remove = function(username, callback) {
        "use strict";
		username = "test15";
        Visualapp.remove( {},function(err, social1) {
            "use strict";

			console.log(social1);
            if (err) return callback(err, null);

            callback(null, social1);
        });
    }
	
	
	
	this.import = function(username, callback) {
        "use strict";
		username = "test15";
		
		var reader = csv.createCsvFileReader('order.csv', {
    'separator': ','
    
		});

	var i =0;
	
	
	reader.addListener('data', function(data) {
	
	
	if(i==0){
		i = i+1;
	}
	else{
		var query = {
			"Row ID" : data[0],
			"Order ID" : data[1],
"Order Date" : data[2],
"Order Priority" : data[3],
"Order Quantity" : data[4],
"Sales" : parseInt(data[5]),
"Discount" : data[6],
"Ship Mode" : data[7],
"Profit" : data[8],
"Unit Price" : data[9],
"Shipping Cost" : data[10],
"Customer Name" : data[11],
"Province" : data[12],
"Region" : data[13],
"Customer Segment" : data[14],
"Product Category" : data[15],
"Product Sub-Category" : data[16],
"Product Name" : data[17],
"Product Container" : data[18],
"Product Base Margin" : data[19],
"Ship Date" : data[20]

		};
		i = i+1;
		db.collection('orders').insert(query, function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.log("No counter found for comments.");
			callback(null, doc)
        }
        else {
            console.log("Number of records: " + i);
        }
		
	});
	}
    
	
	
});

    
    }
	
	
	
	this.getorderby = function(what, callback) {
        "use strict";
		
		var query;
		var filter;
		
		if(what == "sales") {
				query = [    {$group:      { 	 _id:"$Order ID", 	 num_products:{$sum:1}, sales: {$sum: "$Sales"}     }    }];
				
		} else if (what == "customersegment") {
			query = [    {$group:      { 	 _id:"$Customer Segment", 	 num_products:{$sum:1}, sales: {$sum: "$Sales"}     }    }];
		
		} else if (what == "customername") {
			query = [    {$group:      { 	 _id:"$Customer Name", 	 num_products:{$sum:1}, sales: {$sum: "$Sales"}     }    }];
		}else if (what == "productcategory") {
			query = [    {$group:      { 	 _id:"$Product Category", 	 num_products:{$sum:1}, sales: {$sum: "$Sales"}     }    }];
		}
		else if (what == "sales_permonth_percategory") {
			
			var Value_match = new RegExp('Value_2');
			query = [  {
       $project:
         {
			 month: { $substr: [ "$Order Date", 0, 2 ] },
			 product_category : "$Product Category",
			 sales: "$Sales" }} , {$group:      { 	 _id:{
				 
				 m:"$month",
			     p:"$product_category"
				 }, 	  sales: {$sum: "$sales"}     }    }];
		}
		else if (what == "sales_permonth_percategory_persubcategory") {
			
			var Value_match = new RegExp('Value_2');
			query = [  {
       $project:
         {
			 month: { $substr: [ "$Order Date", 0, 2 ] },
			 product_category : "$Product Category",
			 subcategory: "$Product Sub-Category",
			 sales: "$Sales" }} , {$group:      { 	 _id:{
				 
				 m:"$month",
			     p:"$product_category",
				 s:"$subcategory"
				 }, 	  sales: {$sum: "$sales"}     }    }];
		}
		else if (what == "profit_permonth_percategory") {
			
			var Value_match = new RegExp('Value_2');
			query = [  {
       $project:
         {
			 month: { $substr: [ "$Order Date", 0, 2 ] },
			 product_category : "$Product Category",
			 profit: "$Profit" }} , {$group:      { 	 _id:{
				 
				 m:"$month",
			     p:"$product_category"
				 }, 	  profit: {$sum: "$profit"}     }    }];
		}
		else if (what == "sales_permonth") {
			
			var Value_match = new RegExp('Value_2');
			query = [  {
       $project:
         {
			 month: { $substr: [ "$Order Date", 0, 2 ] },
			 product_category : "$Product Category",
			 sales: "$Sales" }} , {$group:      { 	 _id:{
				 
				 m:"$month"
			     
				 }, 	  sales: {$sum: "$sales"}     }    }];
		}
		else {
			query = [    {$group:      { 	 _id:"$Order ID", 	 num_products:{$sum:1}, sales: {$sum: "$Sales"}     }    }];
		}
		

			Visualapp.aggregate(query,function(err, object) {

            "use strict";


            if (err) return callback(err, null);


             callback(null, object);
        });
		

    }
	
	this.getHome = function(username, callback) {
        "use strict";
        Visualapp.findOne({'creator': username}, {'home':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        });
    }

	this.getgallerylist = function(username, callback) {
        "use strict";
		
        Visualapp.findOne({'creator': username}, {'gallery':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getnotificationlist = function(username, callback) {
        "use strict";
		
        Visualapp.findOne({'creator': username}, {'notifications':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }

	this.getvenue = function(username, callback) {
        "use strict";
		
        Visualapp.findOne({'creator': username}, {'venue':1, '_id': 0},function(err, home1) {
            "use strict";

			console.log(home1);
            if (err) return callback(err, null);

            callback(null, home1);
        }); 
    }
	
	
	this.geteventdetails = function(username, callback) {
        "use strict";
		
        Visualapp.findOne({'creator': username}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
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


        Visualapp.findOne( {'_id': o_id}, {'venue':1, 'home':1,'gallery':1, 'notifications':1,'agenda':1, '_id': 0},function(err, home1) {
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
        //Visualapp.find({ 'home.name' : {$regex : pattern} }).limit(num).toArray(function(err, items) {
			
		
				
	//		Visualapp.find({ 'home.name' : new RegExp(str) }, {'home.name':1}, function(err, items) {
			
		Visualapp.find({ 'home.name' : new RegExp(str) } , {'home.name':1}).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

			console.log (items);
            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }
	
	
	this.getagenda = function(username, callback) {
        "use strict";
		
        Visualapp.findOne({'creator': username}, {'agenda':1, '_id': 0},function(err, home1) {
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
  
		Visualapp.insert(companyevent,{w:1}, function (err, result) {
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
		  Visualapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Visualapp.update(query, {$set: { social:social}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
	}

		this.addHome = function(username, home, callback) {
        "use strict";
		  Visualapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Visualapp.update(query, {$set: { home:home}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addAgenda = function(username, agenda, callback) {
        "use strict";
		  Visualapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Visualapp.update(query, {$set: { agenda:agenda}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	this.addVenue = function(username, venue, callback) {
        "use strict";
		  Visualapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Visualapp.update(query, {$set: { venue:venue}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        });
		
		
    } 
	
	
	
		this.addGallery = function(username, gallery, callback) {
        "use strict";
		  Visualapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Visualapp.update(query, {$push: { gallery:gallery}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
	   
		  }	   
			
        }); 
		
		
    }
	

		this.addNotification = function(username, notification, callback) {
        "use strict";
		  Visualapp.findOne({'creator': username}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			Visualapp.update(query, {$push: { notifications:notification}}, function (err){

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

module.exports.VisualappDAO = VisualappDAO;
