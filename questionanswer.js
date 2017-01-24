
function QuestionAnswerDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof QuestionAnswerDAO)) {
        console.log('Warning: escrowstoreDAO constructor called without "new" operator');
        return new QuestionAnswerDAO(db);
    }

    var questionanswerstore = db.collection("questionanswer");
	
	
	
	
	
//---------------------------------1.1-------------------------------------------//
	
	
	this.addquestion = function (username, question,  callback) {
        "use strict";
        
		

        var questionanswer = {
question: {
	title:question.question.title,
	description:question.question.description
},
answers: [],
affiliatelinks:[],
technologies:question.technology,
fields:question.field,
leads :[],
flag: 'edit'	// edit, published, review
};

		  
			
			questionanswerstore.insert(questionanswer, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new question");
                return callback(null, result[0]);
            }

            return callback(err, null);
			});
		

		
		
    }
	
	
	this.enteranswer = function (username, recordid, answer, callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
		query['_id'] = o_id;
			
			questionanswerstore.update(query, {$push: { answers:answer}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
		  

		
		
    }
	
	this.updateanswer = function (username, recordid, answer,answerindex, callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
		query['_id'] = o_id;
		
		
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";
			var ans = record.answers;
			ans[answerindex] = answer;
			
			questionanswerstore.update(query, {$set: {'answers': ans}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record1) {

		
			if (err) return callback (err, null);
					
				callback(null, record1);
			});

			});
			
			});
			
			
			
			
		  

		
		
    }
	
	
	this.deleteanswer = function (username, recordid, answer,answerindex, callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
		query['_id'] = o_id;
		
		
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";
			var ans = record.answers;
			ans.splice(answerindex, 1);
			
			questionanswerstore.update(query, {$set: {'answers': ans}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record1) {

		
			if (err) return callback (err, null);
					
				callback(null, record1);
			});

			});
			
			});
			
			
			
			
		  

		
		
    }
	
	
	
	this.enterlead = function (username, recordid, lead, callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
		query['_id'] = o_id;
			
			questionanswerstore.update(query, {$push: { leads:lead}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
		  

		
		
    }
	
		this.updatelead = function (username, recordid, lead, leadindex, callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
		query['_id'] = o_id;
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";
			var ans = record.leads;
			ans[leadindex] = lead;
		
		
			questionanswerstore.update(query, {$set: { 'leads':ans}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
			});
			
		  

		
		
    }

		this.deletelead = function (username, recordid, lead, leadindex, callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
		query['_id'] = o_id;
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";
			var ans = record.leads;
			ans.splice(leadindex, 1);
		
		
			questionanswerstore.update(query, {$set: { 'leads':ans}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
			});
			
		  

		
		
    }

	
	
	
	
	this.enteraffiliate = function (username, recordid, affiliate, callback) {
        "use strict";
        
		
	var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;
			
			questionanswerstore.update(query, {$push: { affiliatelinks:affiliate}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
		  

		
		
    }
	
	
	this.updateaffiliate = function (username, recordid, affiliate,affiliateindex, callback) {
        "use strict";
        
		
	var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";
			var ans = record.affiliatelinks;
			ans[affiliateindex] = affiliate;
		
			
			questionanswerstore.update(query, {$set: { affiliatelinks:ans}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
			});
			
		  

		
		
    }
	
	
	this.deleteaffiliate = function (username, recordid, affiliate,affiliateindex, callback) {
        "use strict";
        
		
	var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";
			var ans = record.affiliatelinks;
			
			ans.splice(affiliateindex, 1);
		
			
			questionanswerstore.update(query, {$set: { affiliatelinks:ans}}, function (err){

			if (err) return callback (err, null);
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});

			});
			
			});
			
		  

		
		
    }
	
	
	
	this.updatequestion = function (username, recordid, question,  callback) {
        "use strict";
        
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;
			
			questionanswerstore.update(query, {$set: { 'question.title':question.question.title,'question.description':question.question.description,
						'technologies': question.technology,
						'fields': question.field
						
			}}, function (err){

			if (err) return callback (err, null);
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});
			
			
			});
			
		  

		
		
    }
	
	this.setquestionedit = function (username, recordid,  callback) {
        "use strict";
        
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;
			
			questionanswerstore.update(query, {$set: { 	'flag': 'edit'
						
			}}, function (err){

			if (err) return callback (err, null);
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});
			
			
			});
			
		  

		
		
    }
	
	
	this.setquestionpublished = function (username, recordid,   callback) {
        "use strict";
        
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;
			
			questionanswerstore.update(query, {$set: { 	'flag': 'published'
						
			}}, function (err){

			if (err) return callback (err, null);
			
			questionanswerstore.findOne( query ,function(err, record) {
            "use strict";

		
			if (err) return callback (err, null);
					
				callback(null, record);
			});
			
			
			});
			
		  

		
		
    }
	
	
	this.getquestion = function (username, recordid,  callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;

        questionanswerstore.findOne( {'_id': o_id} ,function(err, record) {
            "use strict";

		
		if (err) return callback (err, null);
					
				callback(null, record);
			});
			
		  
			
		

		
		
    }
	
	this.deletequestionanswer = function (username, recordid,  callback) {
        "use strict";
        
		
		var ObjectID = require('mongodb').ObjectID;
		var o_id = new ObjectID(recordid);


        var query = {};
			query['_id'] = o_id;

        questionanswerstore.remove( {'_id': o_id} ,function(err, record) {
            "use strict";

		
		if (err) return callback (err, null);
					
				// callback(null, record);
				
				 questionanswerstore.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
		
			});
			
		  
			
		

		
		
    }
	
	this.listquestions = function(username, callback) {
        "use strict";
		
        questionanswerstore.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.listsearchquestions = function(username,tech, purpose, callback) {
        "use strict";
		
		
        questionanswerstore.find({'technologies':tech, 'fields':purpose, 'flag':'published'}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	//-------------------search --------------------//
	
	
	


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

			
            if (err || record == null) return callback(err, null);
			console.log( "setdiscount "+ setdiscount +" is above max limit : "+ record.maxdiscount);
			if(setdiscount < record.maxdiscount) {
			if(record.traded == 'pending') {
			//record.discount = setdiscount;
			//record.discounter = username;
			//record.discounteraddress = useraddress;
			//record.traded = 'done';
			
			var query = {};
		    query['_id'] = o_id;
		
			  chequeappstore.update(query, {$set: {discount: setdiscount, discounter: username, traded: 'done',discounteraddress: useraddress }} , function (err, rec){

			if (err) return callback (err, null);
					
				callback(null, rec);
			});
			}
		
            
			}
			else {
				console.log( "setdiscount "+ setdiscount +" is above max limit : "+ record.maxdiscount);
				var discount_above_limit = new Error("discount "+ setdiscount +" is above max limit : "+ record.maxdiscount);
			callback(discount_above_limit, null);
			}
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

module.exports.QuestionAnswerDAO = QuestionAnswerDAO;
