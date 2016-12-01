var fs = require('fs-extra');
var path = require('path');
var crypto = require('crypto');
var request = require('request');


var UsersDAO = require('../users').UsersDAO
  , SessionsDAO = require('../sessions').SessionsDAO
  , UserrecordDAO = require('../userrecord').UserrecordDAO
  , EthereumAppDAO = require('../etherium').EthereumAppDAO
  
  , ChequeAppDAO = require('../chequeapp').ChequeAppDAO
  ;

  var local = false;
  var etherrecords ;

/* The SessionHandler must be constructed with a connected db */
function ChequeSessionHandler (db) {
    "use strict";

    var users = new UsersDAO(db);
    var sessions = new SessionsDAO(db);
	var userrecord = new UserrecordDAO(db);
  
	var chequeapp = new ChequeAppDAO(db);
	var ethereumapp = new EthereumAppDAO(db);
	
	
	var uploadedimage = "";

	
    this.isLoggedInMiddleware = function(req, res, next) {
        var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, sess) {
            "use strict";

            if (!err && sess) {
				                
				 
                req.username = sess.username;
				req.account = sess.account;
				
			
            }
			return next();	
            
        });
    }
	
	this.isLoggedIn = function(req, res) {
        var session_id = req.cookies.session;
		var  user = {
				username:'',
				status:'',
				account:'',
				loggedin:''
			};
        sessions.getUsername(session_id, function(err, sess) {
            "use strict";

            if (!err && sess) {
				
				 user = {
				username:sess.username,
				status:'active',
				account:sess.account,
				loggedin:true
			};
					
				return res.json(user);
            }
			else {
				return res.json(user);
			}
			
            
        });
    }
	
	this.adminLogout = function(req, res, next) {
        "use strict";

        var session_id = req.cookies.session;
        sessions.endSession(session_id, function (err) {
            "use strict";

            // Even if the user wasn't logged in, redirect to home
            res.cookie('session', '');
            return res.json(true);
        });
    }
	
	




    this.displayLoginPage = function(req, res, next) {
        "use strict";
        return res.render("login", {username:"", password:"", login_error:""})
    }

    this.handleLoginRequest = function(req, res) {
        "use strict";

        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);

        users.validateLogin(username, password, function(err, user) {
            "use strict";

            if (err) {
                if (err.no_such_user) {
					return res.status(500).json({username:username, password:"", login_error:"No such user"});
                    
                }
                else if (err.invalid_password) {
                    return res.status(500).json({username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    
                }
            }

            sessions.startSession(user['_id'],user.account, function(err, session_id) {
                "use strict";

                if (err) return next(err);

                res.cookie('session', session_id);
                return res.json({username:user.username, account:user.account});
            });
        });
    }
	
	setTimeout( function load_etheraccounts ()
	{
		
		if(local == false) {
		ethereumapp.getetheraccounts(function(err, record) {
		// currently any loggedin user can create policy
		etherrecords = record;
		userrecord.updatealletheraddress(record, function(err, remainingrecord) {
		
		
		if(!err) {
			
			etherrecords = remainingrecord;
		}
		
		
		});
		
		
			// return res.json(remainingrecord);
		}); 
		}
		
        /*
		accounts
		update each user record with address.
		mark allocated ones.
		
		*/
		
	}, 20);
	
	function getall_ratings()
	{
		
		userrecord.listaccissuers('dummy', function(err, issuerrecords) {
		// currently any loggedin user can create policy
		
		//	return res.json(issuerecords);
		if(err) return;
		
		if(local == false) {
		
		for(var i = 0; i< issuerrecords.length; i++ ) {
			
			ethereumapp.getuserrating(issuerrecords[i].useraddress, function(err, rating) {
		
				userrecord.updateissuerrating(issuerrecords[i]._id,rating.rating, function(err, data) {
				
				});
			
		});
		
		}
		}
		
		});
		
	    setTimeout(getall_ratings,10000);
	}


        setTimeout(getall_ratings,200);
	function reflect_ratingchange_on_cheques()
	{
		
		userrecord.listaccissuers('dummy', function(err, issuerrecords) {
		if(err) return;
		
		
		        for(var i = 0; i< issuerrecords.length; i++ ) {
			chequeapp.updateratingfor_issuers(issuerrecords[i].username,issuerrecords[i].rating, function(err, transactions) {

			});
	                }	
		});
	    setTimeout(reflect_ratingchange_on_cheques,10000);
        }
        setTimeout(reflect_ratingchange_on_cheques,500);

	function create_etherrecord (discounter,issuer, discountername, issuername, recordid)
	{
		
		if(local == false) {
		ethereumapp.entertransaction(discounter,issuer, discountername, issuername, recordid, function(err, record) {
		// currently any loggedin user can create policy
console.log('create_etherrecord', record);
			return ;
		}); 
		}
        
		
	}
	this.etherenterrecord = function(req, res) {
        "use strict";

/*
		var eth = req.body;
		
		if(local == false) {
		ethereumapp.entertransaction(eth.discounter,eth.issuer, eth.discountername, eth.issuername, eth.recordid, function(err, record) {
		// currently any loggedin user can create policy
			return res.json(record);
		}); 
		}
       */ 
    }

	function update_etherrecord_rating (discounter,recordid, rating, ratingmessage)
	{
		
		if(local == false) {
		ethereumapp.setrating(discounter,recordid, rating, ratingmessage, function(err, record) {
		// currently any loggedin user can create policy
			return ; //res.json(record);
		});
        }
		
	}
	
	this.ethersetrating = function(req, res) {
        "use strict";


		var eth = req.body;
		if(local == false) {
		ethereumapp.setrating(eth.addr,eth.recordid, eth.rating, eth.ratingmessage, function(err, record) {
		// currently any loggedin user can create policy
			return res.json(record);
		});
        }
    }

	this.ethergetrating = function(req, res) {
        "use strict";


		var eth = req.body;
		if(local == false) {
		ethereumapp.getuserrating(eth.addr, function(err, record) {
		// currently any loggedin user can create policy
			return res.json(record);
		});
        }
    }

	
	
	
	
//-------------------------------------1.1------------------------------------------------//	
	
	this.getissuers = function(req, res) {
        "use strict";


		
		
		users.listissuers(req.username, function(err, issuerecords) {
		// currently any loggedin user can create policy
			return res.json(issuerecords);
		});
        
    }
	this.getreceivers = function(req, res) {
        "use strict";
		
		
		users.listreceivers(req.username, function(err, records) {
		// currently any loggedin user can create policy
			return res.json(records);
		});
        
    }
	
	this.getdiscounters = function(req, res) {
        "use strict";
		
		
		users.listdiscounters(req.username, function(err, records) {
		// currently any loggedin user can create policy
			return res.json(records);
		});
        
    }
	
	
	this.getusertransactions = function(req, res) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
			return res.status(5001).json({username:req.username});
		}
		
		
		chequeapp.getusertransactions(req.username,'receiver', function(err, transactions) {
		// currently any loggedin user can create policy
			return res.json(transactions);
		});
        
    }
	
	this.gettransactions = function(req, res) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
			return res.status(5001).json({username:req.username});
		}
		
		
		chequeapp.gettransactions(req.username, function(err, transactions) {
		// currently any loggedin user can create policy
			return res.json(transactions);
		});
        
    }
	
	this.getactivetransactions = function(req, res) {
        "use strict";

		/* if(req.username == '' || typeof req.username == 'undefined')
		{
			return res.json(false);
		}
		*/
		
		chequeapp.getactivetransactions(req.username, function(err, transactions) {
		// currently any loggedin user can create policy
			return res.json(transactions);
		});
        
    }
	
	this.getratingofuser = function(req, res) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
			return res.status(5001).json({username:req.username});
		}
		
		
		chequeapp.getratingsofuser(req.username, function(err, rating) {
		// currently any loggedin user can create policy
			return res.json(rating);
		});
        
    }
	
	
// Above list of things	
//-------------------------------------1.2------------------------------------------------//		
// Entry below	


	this.creatediscounter = function(req, res, next) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		
		console.log("disco="+ etherrecords );
		
		
	
		var data = req.body;

		var discounter = {
			
		username: data.username._id,
		account:'discounter',
		useraddress: etherrecords.shift(),
		resaddress:data.resaddress,
		aggrement:data.aggrement ,
	
		etherrec :{}
		};

		
		
		
		userrecord.addaccountrecord(discounter.username, discounter, function(err, record) {
		
		console.log(record);
		if(!err) {
			
		
		}
		
		return res.json(record);
		});
        
    }
	
	this.createreceiver = function(req, res, next) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		
		console.log(req.username);
		
		
	
		var data = req.body;
		
		var receiver = {
	username: data.username._id,
	account:'receiver',
	useraddress: etherrecords.shift(),
	resaddress:data.resaddress,
	aggrement:data.aggrement,
	etherrec :{}
	};

		
		
		userrecord.addaccountrecord(receiver.username,receiver, function(err, record) {
		
		console.log(record);
		if(err) {
			
			if (err.record_already_exists) {
					return res.status(5000).json({username:data.username, error:err.record_already_exists});
            }else {
				return res.json(err);
			}
		}
		
		return res.json(record);
		});
        
    }
	
	this.createissuer = function(req, res, next) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		
		console.log(req.username);
		
		
	
		var data = req.body;
		
		var issuer = {
	username: data.username._id,
	account:'issuer',
	useraddress: etherrecords.shift(),
	resaddress:data.resaddress,
	aggrement:data.aggrement ,
	collateral:data.collateral,
	issuerlimit:data.issuerlimit,
	exposure:10,
	rating:0,
	etherrec :{}
};

		
		
		
		userrecord.addaccountrecord(issuer.username,issuer, function(err, record) {
		
		console.log(record);
		
		if(err) {
			
			if (err.record_already_exists) {
					return res.status(5000).json({username:data.username, error:err.record_already_exists});
            }else {
				return res.json(err);
			}
		}
		
		return res.json(record);
		
		});
        
    }
	
	function update_issuers_data_to_cheque( chequerecord)
	{
		var issuer = chequerecord.issuer;
		console.log("issuer="+issuer);
		userrecord.readaccountrecord(issuer, function(err, record) {
			if(err) return ;
			
			console.log("issuer="+record);
			var issuerlimit = record.issuerlimit;
			var networkrating = record.rating;
			var exposure = record.exposure;
			var issueraddress = record.useraddress;
			chequeapp.updatecheque(chequerecord, issuerlimit, networkrating, exposure,issueraddress,  function(err, chequerecord) {
			//if(err) return ;
				
				return;
				
			});
			
		});
	}

	this.chequedeposit = function(req, res) {
        "use strict";

		console.log('inchequedeposit');
		
		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		if(req.account != 'agent')
		{
			//console.log(req.username);
			//console.log(req.account);
			return res.status(5000).json({username:req.username, account:req.account, reason:'Only agent can submit request'});
			
		}
		
		console.log(req.username);
		var data = req.body;
		
		var	cheque = {
			issuer: data.issuer._id,			// username
			receiver:data.receiver._id,		// username
			agent:req.username,			// username
			chequeid:data.chequeid,	
			issueraddress: '',
			discounteraddress:'',
			chequeaccount:data.chequeaccount,
			cashingdate: data.cashingdate,
			issuedate:data.issuedate,
			amount:data.amount,
			issuerlimit:'',
			issuerrating:'',
			ratingmessage:'',
			networkrating : 0,
			exposure : '10',
			discounter:'' ,		// username
			discount:'',
			maxdiscount :data.maxdiscount,
			traded :'pending', 	// pending, cancelled, done
			rated: 'no', 	// yes, no
			issuerupdated: 'no',
			etherupdated : 'no'
			
			
		   
		} ;
	

		
		
		// Update remaining during frontend work 
		
		chequeapp.addcheque(req.username, cheque, function(err, chequerecord) {
		// currently any loggedin user can create policy
		console.log(chequerecord);
		if(!err) {
			
			 update_issuers_data_to_cheque( chequerecord);
		}
		
		return res.json(chequerecord);
		});
        
    }
	
	
	
	this.setmaxdiscount = function(req, res, next) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		if(req.account != 'receiver')
		{
			console.log('only cheque receiver can set max discount' + req.username);
			return res.json(false);
		}
		
		
		
		
		console.log(req.username);
		var chequerecord = req.body;
		var chequerecordid = chequerecord.recordid;
		var maxdiscount = chequerecord.maxdiscount;
		var useraccessingrecord = req.username; 
		
		chequeapp.setmaxdiscount(useraccessingrecord,chequerecord,maxdiscount,  function(err, record) {
			
		// currently any loggedin user can create policy
		if(!err)  {
			process_transactions("setmaxdiscount", record, setmaxdiscound);
		}
		
		return res.json(record);
		});
        
    }
	
	this.setdiscount = function(req, res, next) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		if(req.account != 'discounter')
		{
			console.log('only discounter can set discount' + req.username);
				return res.status(5001).json({username:req.username, reason: 'only discounter can set discount'});
		}
		
		
		
		
		console.log(req.username);
		var chequerecord = req.body;
		
		
		
		
		
		var useraccessingrecord = req.username; 
	        userrecord.readaccountrecord(useraccessingrecord, function (err1, userrecord1) {	
		//  get address of user
		if(!err1)  {
		var useraddress = userrecord1.useraddress; 
		console.log('before setdiscount', userrecord1);
		chequeapp.setdiscount(useraccessingrecord,useraddress, chequerecord.recordid,chequerecord.discount,  function(err, record) {
			
		// currently any loggedin user can create policy
		if(!err)  {
			
		console.log('before create_etherrecord', record);
			create_etherrecord (record.discounteraddress, record.issueraddress,  record.discounter, record.issuer, record._id);
		}
		return res.json(record);
		});
		}

		});
        
    }
	
	
	
	this.setissuerrating = function(req, res) {
        "use strict";

		if(req.username == '' || typeof req.username == 'undefined')
		{
				return res.status(5001).json({username:req.username});
		}
		
		if(req.account != 'discounter')
		{
			console.log('only discounter can set rating' + req.username);
			return res.json(false);
		}
		
		
		
		
		console.log(req.username);
		var chequerecord = req.body;
		
		var useraccessingrecord = req.username; 
		
		userrecord.readaccountrecord(useraccessingrecord, function(err, record1) {
			if(err) return res.json(err) ;
			var discounteraddress = record1.useraddress;
		chequeapp.setissuerrating(useraccessingrecord,chequerecord.recordid,chequerecord.rating,chequerecord.ratingmessage,  function(err, record) {
			
		// currently any loggedin user can create policy
		if(!err)  {
			
			update_etherrecord_rating (discounteraddress,chequerecord.recordid, chequerecord.rating, chequerecord.ratingmessage);
			//process_setrating("setrating", record, setrating);
			//load_etherratings_tomongo(); // This will load ether ratings and calculate average
		}
		
		return res.json(record);
		});
	});
        
    }
	
	
	
	
	
	

	
	
	

    function validateSignup(username, password, verify, email, errors) {
        "use strict";
        var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/;
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;
/*
        errors['username_error'] = "";
        errors['password_error'] = "";
        errors['verify_error'] = "";
        errors['email_error'] = "";

        if (!USER_RE.test(username)) {
            errors['username_error'] = "invalid username. try just letters and numbers";
            return false;
        }
        if (!PASS_RE.test(password)) {
            errors['password_error'] = "invalid password.";
            return false;
        } */
        if (password != verify) {
            errors['verify_error'] = "password must match";
            return false;
        }
		/*
        if (email != "") {
            if (!EMAIL_RE.test(email)) {
                errors['email_error'] = "invalid email address";
                return false;
            }
        } */
        return true;
    }

    this.handleSignup = function(req, res, next) {
        "use strict";

        var email = req.body.email
        var username = req.body.username
        var password = req.body.password
        var verify = req.body.verify

        // set these up in case we have an error case
        var errors = {'username': username, 'email': email}
        if (validateSignup(username, password, verify, email, errors)) {
            users.addUser(username, password, email, function(err, user) {
                "use strict";

                if (err) {
                    // this was a duplicate
                    if (err.code == '11000') {
                        errors['username_error'] = "Username already in use. Please choose another";
                        return res.render("signup", errors);
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }

                sessions.startSession(user['_id'],user.account, function(err, session_id) {
                    "use strict";

                    if (err) return next(err);

                    res.cookie('session', session_id);
                    return res.redirect('/welcome');
                });
            });
        }
        else {
            console.log("user did not validate");
            return res.render("signup", errors);
        }
    }
	
		
		this.adminregister = function(req, res, next) {
        "use strict";

        var email = req.body.email
        var username = req.body.username
        var password = req.body.password
        var verify = req.body.verify
		var phone = req.body.phone
		var account = req.body.account

        // set these up in case we have an error case
        var errors = {'username': username, 'email': email}
        if (validateSignup(username, password, verify, email, errors)) {
            users.addUser(username, password, email, phone, account, function(err, user) {
                "use strict";

                if (err) return res.json({error:err});
				
				// etherregister(username);
                
				sessions.startSession(user['_id'], user.account, function(err, session_id) {
                    "use strict";

                    if (err) {return res.json({error:err}) ;
					}else {

                    res.cookie('session', session_id);
					
					console.log(username + "session started");
					 return res.json({username:username, account:account});
					}
                });
				
				

				
								
            });
        }
        else {
            console.log("user did not validate");
            return res.json({error:errors});
        }
    }

	
	
	
	
	this.register = function(req, res, next) {
        "use strict";

        var email = req.body.email
        var username = req.body.username
        var password = req.body.password
        var verify = req.body.verify

        // set these up in case we have an error case
        var errors = {'username': username, 'email': email}
        if (validateSignup(username, password, verify, email, errors)) {
            users.addUser(username, password, email, function(err, user) {
                "use strict";

				if (err) return res.json({error:err});
                

                sessions.startSession(user['_id'], user.account, function(err, session_id) {
                    "use strict";

					if (err) return res.json({error:err});

                    res.cookie('session', session_id);
                    
                });
            });
        }
        else {
            console.log("user did not validate");
            return res.json({error:errors});
        }
    }

	
  
	
}



module.exports = ChequeSessionHandler;
