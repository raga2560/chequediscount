/* The RatingrecordDAO must be constructed with a connected database object */
function RatingrecordDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof RatingrecordDAO)) {
        console.log('Warning: RatingrecordDAO constructor called without "new" operator');
        return new RatingrecordDAO(db);
    }

   var ratingstore = db.collection("ratingrecord");
   
   
	
	this.addrating = function (data,  callback) {
		
		var ratingrec = {
				issuer: '',
				rating :[]
		};
		
		"use strict";
		  ratingstore.findOne({'issuer': data.issuer}, function(err, record) {
            "use strict";

            if (err) return callback(err, null);

			if( record != null) {
			var query = {};
			query['_id'] = record['_id'];
			
			ratingrec.issuer = data.issuer;
			ratingrec.rating.push(data);
			
			
			record.rating.push(data);
			
			
			ratingstore.update(query, {$set: record}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
		    
		  }
		  else {
		
			ratingrec.issuer = data.issuer;
			ratingrec.rating.push(data);
			
			ratingstore.insert(ratingrec,{w:1}, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new ratingrecord");
                return callback(null, result);
            }

            return callback(err, null);
			});
		

		
		  }
			
        }); 
		
    }
	

	
}

module.exports.RatingrecordDAO = RatingrecordDAO;
