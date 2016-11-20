var fs = require('fs-extra');
var path = require('path');
var crypto = require('crypto');
var request = require('request');
var bitcoin = require('bitcoinjs-lib');

var UsersDAO = require('../users').UsersDAO
  , SessionsDAO = require('../sessions').SessionsDAO
  , VisualappDAO = require('../visualapp').VisualappDAO
  , AssetstoreDAO = require('../assets').AssetstoreDAO
  , KeystoreDAO = require('../keystore').KeystoreDAO
  , UserrecordDAO = require('../userrecord').UserrecordDAO
  , TransactionDAO = require('../transaction').TransactionDAO
  , ConfappDAO = require('../confapp').ConfappDAO;

/* 
Receives request, makes call to colored coin interface, then updates database.

Createaccount-> create_account_colored -> store_keys_foruser
Create_assets-> create_assets_colored -> store_assets_ofuser

*/
/* The SessionHandler must be constructed with a connected db */

function postToApi(api_endpoint, json_data, callback) {
    console.log(api_endpoint+': ', JSON.stringify(json_data));
    request.post({
        url: 'http://testnet.api.coloredcoins.org:80/v3/'+api_endpoint,
        headers: {'Content-Type': 'application/json'},
        form: json_data
    }, 
    function (error, response, body) {
        if (error) return callback(error);
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status: ', response.statusCode);
        console.log('Body: ', JSON.stringify(body));
        return callback(null, body);
    });
};

function getApi(api_endpoint, param, callback) {
    console.log('Get from:'+api_endpoint+'/'+param)
    request.get('http://testnet.api.coloredcoins.org:80/v3/'+api_endpoint+'/'+param, function (error, response, body) {
        if (error) {
            return callback(error)
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status:', response.statusCode)
        console.log('Body:', body)
        return callback(null, body)
    })
}



function signTx (unsignedTx, privateKey) {
    var tx = bitcoin.Transaction.fromHex(unsignedTx)
    var insLength = tx.ins.length
    for (var i = 0; i < insLength; i++) {
        tx.sign(i, privateKey)
    }
    return tx.toHex()
};

function SessionColored (db) {
    "use strict";

    var users = new UsersDAO(db);
    var sessions = new SessionsDAO(db);
    var confapp = new ConfappDAO(db);
	var visualapp = new VisualappDAO(db);
	var keystore = new KeystoreDAO(db);
	var assetstore = new AssetstoreDAO(db);
	var userrecord = new UserrecordDAO(db);
	var transaction = new TransactionDAO(db);
	
	var uploadedimage = "";

    this.isLoggedInMiddleware = function(req, res, next) {
        var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username) {
            "use strict";

            if (!err && username) {
                req.username = username;
            }
            return next();
        });
    }

    this.displayLoginPage = function(req, res, next) {
        "use strict";
        return res.render("login", {username:"", password:"", login_error:""})
    }

    this.handleLoginRequest = function(req, res, next) {
        "use strict";

        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);

        users.validateLogin(username, password, function(err, user) {
            "use strict";

            if (err) {
                if (err.no_such_user) {
                    return res.render("login", {username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.render("login", {username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }

            sessions.startSession(user['_id'], function(err, session_id) {
                "use strict";

                if (err) return next(err);

                res.cookie('session', session_id);
                return res.redirect('/welcome');
            });
        });
    }
	
	this.confappLogin = function(req, res, next) {
        "use strict";

        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);

        users.validateLogin(username, password, function(err, user) {
            "use strict";

            if (err) {
                if (err.no_such_user) {
                    return res.json({username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.json("login", {username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }

            sessions.startSession(user['_id'], function(err, session_id) {
                "use strict";

                if (err) return next(err);

               return  res.cookie('session', session_id);
                
            });
        });
    }
	
	
		this.confappadminLogin = function(req, res, next) {
        "use strict";

        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);

        users.validateLogin(username, password, function(err, user) {
            "use strict";
//console.log("user place 1 " );
            if (err) {
                if (err.no_such_user) {
                    return res.json({username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.json({username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    return 		res.json({login_error:err});
                }
            }
 // console.log("user place 2 " );
	
            sessions.startSession(user['_id'], function(err, session_id) {
                "use strict";

			//	console.log("user place 3 " );
                if (err) return res.json({error:err});
//console.log("user place 4 " );
               res.cookie('session', session_id);
			   res.json(true);
			   // next();
                
            });
        });
    }
	


	this.confappGetSession = function(req, res, next) {
        "use strict";

        
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

          
              var  username = {
				username:username1  
			  } ;
            
			
			  console.log("username="+username.username);
			  
           
			if(err) return res.json({error:err});
			else {
				return res.json(username);
			}
			
		});
		
					
		
		
		
    }
	
	this.findone = function(req, res, next) {
        "use strict";

        var xxx = "agaga";
		
        visualapp.findOne(xxx, function (err, something) {
            "use strict";

            // Even if the user wasn't logged in, redirect to home
            // res.cookie('session', '');
            return res.json(something);
        });
    }
	this.remove = function(req, res, next) {
        "use strict";

        var xxx = "agaga";
		
        visualapp.remove(xxx, function (err, something) {
            "use strict";

            // Even if the user wasn't logged in, redirect to home
            // res.cookie('session', '');
            return res.json(something);
        });
    }
	
	this.import = function(req, res, next) {
        "use strict";

        var xxx = "agaga";
		
        visualapp.import(xxx, function (err, something) {
            "use strict";

            // Even if the user wasn't logged in, redirect to home
            // res.cookie('session', '');
            return res.json(true);
        });
    }
	
	
	this.confappadminLogout = function(req, res, next) {
        "use strict";

        var session_id = req.cookies.session;
        sessions.endSession(session_id, function (err) {
            "use strict";

            // Even if the user wasn't logged in, redirect to home
            res.cookie('session', '');
            return res.json(true);
        });
    }
	
    this.displayLogoutPage = function(req, res, next) {
        "use strict";

        var session_id = req.cookies.session;
        sessions.endSession(session_id, function (err) {
            "use strict";

            // Even if the user wasn't logged in, redirect to home
            res.cookie('session', '');
            return res.redirect('/');
        });
    }

    this.displaySignupPage =  function(req, res, next) {
        "use strict";
        res.render("signup", {username:"", password:"",
                                    password_error:"",
                                    email:"", username_error:"", email_error:"",
                                    verify_error :""});
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

                sessions.startSession(user['_id'], function(err, session_id) {
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

        // set these up in case we have an error case
        var errors = {'username': username, 'email': email}
        if (validateSignup(username, password, verify, email, errors)) {
            users.addUser(username, password, email, function(err, user) {
                "use strict";

                if (err) return res.json({error:err});
				
                sessions.startSession(user['_id'], function(err, session_id) {
                    "use strict";

                    if (err) {return res.json({error:err}) ;
					}else {

                    res.cookie('session', session_id);
					
					console.log(username + "session started");
					// return res.json(true);
					}
                });
				
				confapp.insertEntry(username, function(err, companyevent) {
					console.log(username + "creating company event");
					if(err) {return 
						res.json({error:err}); }
					else {
					return res.json(companyevent);
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
                

                sessions.startSession(user['_id'], function(err, session_id) {
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

	
    this.displayWelcomePage = function(req, res, next) {
        "use strict";

        if (!req.username) {
            console.log("welcome: can't identify user...redirecting to signup");
            return res.redirect("/signup");
        }

        return res.render("welcome", {'username':req.username})
    }
	
	this.uploadImage = function(req, res){
    var destPath = path.join(__dirname, "../images/");
    var originalFilename = req.files.file.originalFilename;
    var hashName = crypto.createHash('md5').update(originalFilename).digest('hex') + ".jpeg"; 
    var writeStream = req.files.file.ws;

   //if the file already exists in the path, then create a random file name from hashName.
  while (fs.existsSync(destPath+hashName)) {
    hashName = hashName.substring(0, hashName.length - 5);
     var rnd = crypto.randomBytes(3),
        value = new Array(3),
        len = hashName.length;
    for (var i = 0; i < 3; i++) {
        value[i] = hashName[rnd[i] % len];
      };
      hashName = hashName + value.join('') + ".jpeg";
    }
 fs.copy(writeStream.path, destPath+hashName, function (err) {
      if (err) return res.send(err);
      fs.chmodSync(destPath+hashName, '755'); //there is probably a better solution, I have to change the permission to access the file from public images directory 
	  uploadedimage = destPath+hashName ;
      fs.remove(writeStream.path, function(err){
        if (err) return res.error(err);
      });
	  
	  //var data = {path : "http://localhost:8888/images/" + hashName};
	  var data = {path : "/images/" + hashName};
	   return res.json(data);
    });
	
	
  
}


this.getgallerylist = function(req, res, next) {
        "use strict";

      
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
			  console.log("username="+username);
           confapp.getgallerylist(username,function(err, object) {
			if(err) return res.json({error:err});
			else {
				res.json(object.gallery);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
		
		
		
	
    }

	this.getnotificationlist = function(req, res, next) {
        "use strict";

      
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
			  console.log("username="+username);
           confapp.getnotificationlist(username,function(err, object) {
			if(err) return res.json({error:err});
			else {
				res.json(object.notifications);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
		
		
		
	
    }
	
	
	this.sendnotification = function(req, res, next) {
        "use strict";

        var image = req.body.image
        var title = req.body.title
		var description = req.body.description
		var username ;
        
		var notification = {
			image : image,
			title : title,
			description: description
		};

			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			
			  console.log("username="+username);
            confapp.addNotification(username, notification, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(true);
			});
			}
			else {
				return res.json(false);
			}
            
        });
		 
		 
      
        
       

		}
		
	this.sendgallery = function(req, res, next) {
        "use strict";

        var image = req.body.image
        var title = req.body.title
		var description = req.body.description
		var username ;
        
		var gallery = {
			image : image,
			title : title,
			description: description
		};

			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			
			  console.log("username="+username);
            confapp.addGallery(username, gallery, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(true);
			});
			}
			else {
				return res.json(false);
			}
            
        });
		 
		 
      
        
       

		}

		
	

	this.getsocial = function(req, res, next) {
        "use strict";

      
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
			  console.log("username="+username);
           confapp.getSocial(username,function(err, social) {
			if(err) return res.json({error:err});
			else {
				res.json(social.social);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
		
		
		
	
    }
	
	
	this.gethome = function(req, res, next) {
        "use strict";

     
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
			  console.log("username="+username);
           confapp.getHome(username,function(err, homeobject) {
			if(err) return res.json({error:err});
			else {
				res.json(homeobject.home);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
	
    }
	
	
	this.getagenda = function(req, res, next) {
        "use strict";

     
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
			  console.log("username="+username);
           confapp.getagenda(username,function(err, homeobject) {
			if(err) return res.json({error:err});
			else {
				res.json(homeobject.agenda);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
	
    }
	
	
	this.getvenue = function(req, res, next) {
        "use strict";

     
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
			  console.log("username="+username);
           confapp.getvenue(username,function(err, homeobject) {
			if(err) return res.json({error:err});
			else {
				res.json(homeobject.venue);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
	
    }
	
	this.sendvenue = function(req, res, next) {
        "use strict";

        var image = req.body.image
        var name = req.body.name
		var address = req.body.address
		var username ;
        
		var venue = {
			image : image,
			name : name,
			address: address
		};

			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			
			  console.log("username="+username);
            confapp.addVenue(username, venue, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(true);
			});
			}
			else {
				return res.json(false);
			}
            
        });
		
		}

	this.sendagenda = function(req, res, next) {
        "use strict";

        var theme = req.body.theme
        var name = req.body.name
		var description = req.body.description
		var username ;
        
		var agenda = {
			name : name,
			theme : theme,
			description: description
		};

			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			
			  console.log("username="+username);
            confapp.addAgenda(username, agenda, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(true);
			});
			}
			else {
				return res.json(false);
			}
            
        });
		
    
	}
	
	
	
		
	this.sendhome = function(req, res, next) {
        "use strict";

        var theme = req.body.theme
        var name = req.body.name
		var description = req.body.description
		var username ;
        
		var home = {
			name : name,
			theme : theme,
			description: description
		};

			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			
			  console.log("username="+username);
            confapp.addHome(username, home, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(true);
			});
			}
			else {
				return res.json(false);
			}
            
        });
		
    
	}
	
		
	
	this.sendsocial = function(req, res, next) {
        "use strict";

        var facebook = req.body.facebook
        var twitter = req.body.twitter
		var username ;
        
		var social = {
			facebook : facebook,
			twitter : twitter
		};

			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			
			  console.log("username="+username);
            confapp.addSocial(username, social, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(true);
			});
			}
			else {
				return res.json(false);
			}
            
        });
		
      
        
       

		}
		
		this.getorderby = function(req, res, next) {
        "use strict";

        var what = req.params.what;
		

        visualapp.getorderby(what, function(err, results) {
            "use strict";

            if (err) return res.json({error:err}); 

            return res.json(results);
        });
    }
	
	this.getloginuser = function(req, res) {
        "use strict";

        
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              
			  var obj =
			  {
				username: username1  
			  };
			  return res.json(obj);
			}
			else {
				return res.json(false);
			}
            
        });
		
    
	}
	
	this.gettransaction = function(req, res) {
        "use strict";

		var txHex = req.body.asset.txHex;
		var assetId = req.body.asset.assetId;
			   
		var obj ={
			txHex: txHex,
			assetId: assetId
		};
        transaction.getrecord(obj, function(err, record) {
            "use strict";

            if (err) {
              
			  
			  return res.json(err);
			}
			else {
				return res.json(record);
			}
            
        });
		
    
	}
	

	this.getassetowner = function(req, res) {
        "use strict";

		var assetId = req.body.assetid;
		
	getApi('stakeholders', assetId+'/1', function(err, body) {

    if (err) console.log('error: ', err)
		return res.json(body);
	});
	
	}
	
	
	
	
	
	
	this.getassetdetail = function(req, res) {
        "use strict";

		var assetId = req.body.assetId;
		var utxo = req.body.someUtxo +':1';
  
/*  
		 var assetId = 'LYfzkq2KP6K5rhNR7mE9B6BmhiHTtxvMxY'
var txid = '98a1ebf2b80eafe4cc58bb01e1eb74a09038e60a67032cacdb3dfb8bf83175de'
var utxo = txid+':1'
*/
	getApi('assetmetadata', assetId+'/'+utxo , function(err, body) {


    if (err) console.log('error: ', err)
		return res.json(body);
	});
	
	}

	
	this.updatetx = function(req, res) {
        "use strict";

       
	   var assetId = req.body.assetId;
	   
		var txid = req.body.txid;
		
		var obj = req.body;
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
  
			assetstore.updateasset(username, data, function(err, obj) {
				if (err) return res.json({error:err});
				return res.json(obj);
				});
			}else {
				
				return res.json({error:err});
			}
		});
	}
  
  
	this.signasset = function(req, res) {
        "use strict";

       
	   var asset = req.body.asset;
	   var issueAddress = asset.asset.issueAddress;
		var txHex = req.body.asset.txHex;
		var assetId = req.body.asset.assetId;
		
		console.log("asset="+asset);
		console.log("issueAddress="+issueAddress);
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
  
			//var unsignedTx = txHex;

			var obj = {
				issueAddress: issueAddress,
				txHex: txHex,
				assetId: assetId
				
			};

			userrecord.getrecordbyaddress(issueAddress,function(err, object) {
			if(err) return res.json({error:err});
			else {
				
				console.log("txHex="+txHex);
				console.log(object);
				
				
				var key1 = object.record.testnet.privatekey ;
			
				var key = bitcoin.ECKey.fromWIF(key1);

			var sign = signTx(txHex,key);

			console.log('Signed: '+sign);
			var signedTxHex = sign;
			
			var data_params = {
			'txHex': signedTxHex
			};

			console.log('signed: '+signedTxHex)

			postToApi('broadcast',data_params,function(err, body){
				if (err) {return console.log('error: '+err); }

				if(body.status == 500){
					return res.json(body);
				}
					var obj1 = {
						username: username,
					txid: body.txid,
					assetId: assetId,
					txHex: txHex
					
					};
					console.log(JSON.stringify(obj1));
					assetstore.updateasset(username, obj1,function(err, object) {
						if(err) return res.json({error:err});
						else {
							return res.json(object);
						}
					});
					
			});

			
            }
			});
			
			}
		});
			
		
	
    }
			
			
	this.signandsendasset = function(req, res) {
        "use strict";

       
	   var asset = req.body.asset;
		var txHex = asset.txHex;
		var assetId = asset.assetId;
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
  
			//var unsignedTx = txHex;


			keystore.getkeys(username,function(err, object) {
			if(err) return res.json({error:err});
			else {
				
				console.log(object);
				
				
				var key1 = object.testnet.privatekey ;
			
				var key = bitcoin.ECKey.fromWIF(key1);

			var sign = signTx(txHex,key);

			console.log('Signed: '+sign);
			var signedTxHex = sign;
			
			var data_params = {
			'txHex': signedTxHex
			};

			console.log('signed: '+signedTxHex)

			postToApi('broadcast',data_params,function(err, body){
				if (err) console.log('error: '+err);
				
					res.json(body);
			});

/*

{"address":"mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT","utxos":[{"index":1,"txid":"696aca3f203e9b09ff1f2bb1628f3e7ff9400c802d07e15c1c8201c7e0b76f62","blocktime":1472728381000,"blockheight":926257,"value":100000,"used":false,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d OP_EQUALVERIFY OP_CHECKSIG","hex":"76a914613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d88ac","reqSigs":1,"type":"pubkeyhash","addresses":["mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT"]},"assets":[]},{"index":1,"txid":"648548844aa931e72051a920968cb4dcce5a83d2dd03ffdc3ff88d7445df5865","blocktime":1472728381000,"blockheight":926257,"value":100000,"used":false,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d OP_EQUALVERIFY OP_CHECKSIG","hex":"76a914613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d88ac","reqSigs":1,"type":"pubkeyhash","addresses":["mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT"]},"assets":[]}]}

after issuing asset below

{"address":"mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT","utxos":[{"index":1,"txid":"648548844aa931e72051a920968cb4dcce5a83d2dd03ffdc3ff88d7445df5865","blocktime":1472728381000,"blockheight":926257,"value":100000,"used":false,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d OP_EQUALVERIFY OP_CHECKSIG","hex":"76a914613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d88ac","reqSigs":1,"type":"pubkeyhash","addresses":["mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT"]},"assets":[]},{"index":0,"txid":"da6bb38c8828c398e2dd943f5cdc381fb004c2ec0a5a009e69ef1d377b5f130d","blocktime":1472801123705,"blockheight":-1,"value":600,"used":false,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d OP_EQUALVERIFY OP_CHECKSIG","hex":"76a914613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d88ac","reqSigs":1,"type":"pubkeyhash","addresses":["mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT"]},"assets":[{"assetId":"La6T8wU1kffP5LAohxHRBm8XfauPLvEyh7wrN1","amount":100,"issueTxid":"da6bb38c8828c398e2dd943f5cdc381fb004c2ec0a5a009e69ef1d377b5f130d","divisibility":0,"lockStatus":true,"aggregationPolicy":"aggregatable"}]},{"index":2,"txid":"da6bb38c8828c398e2dd943f5cdc381fb004c2ec0a5a009e69ef1d377b5f130d","blocktime":1472801123705,"blockheight":-1,"value":94400,"used":false,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d OP_EQUALVERIFY OP_CHECKSIG","hex":"76a914613cd6ced630d1fde1cc2f1d4ce34a37b6c6ab3d88ac","reqSigs":1,"type":"pubkeyhash","addresses":["mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT"]},"assets":[]}]}


*/			
			
/*
{
  "txid": [
    {
      "txid": "da6bb38c8828c398e2dd943f5cdc381fb004c2ec0a5a009e69ef1d377b5f130d"
    }
  ]
}
*/
			
            }
			});
			
			}
		});
			
		
	
    }

	this.getaddresscontents = function(req, res) {
        "use strict";
		var address = 'mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT';

				getApi('addressinfo', address , function(err, body) {

    if (err) console.log('error: ', err)
		res.json(body);
		});


				
				

	}
	
	this.getaddressbalance = function(req, res) {
        "use strict";
		
		
		var address = req.body.address; //'mpP6iqSDweyTFHTUZAo4ZVX5MJkhr4GAnT';

				getApi('addressinfo', address , function(err, body) {

    if (err) console.log('error: ', err)
		res.json(body);
		});


				
				

	}
	
    
	this.gettestnetassets = function(req, res) {
        "use strict";
		

		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
        
		assetstore.getassets(username,  function(err, obj) {
				if (err) return res.json({error:err});
				return res.json(obj);
			});
			
			}
			
		else {
				 return res.json({error:err});
			}
            
        });

				
				

	}	
	 
	
	this.createasset = function(req, res) {
        "use strict";

     var network = req.body.network;
	 var ownerid = req.body.ownerid;
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
		   console.log("username="+username);
		   
           userrecord.getrecordbyid(ownerid,function(err, object) {
			if(err) return res.json({error:err});
			else {
				
				console.log(object);
				
				//var key1 = 'L32oQn3Df8nvCoZiNnfTeRhC8rVjtC1tAMeDk9ovxBPWardxT5tT';
				//var address1 = 'mnZzLW7SFi1zfGD8RBRZkyV8EQps1rmBLE';
				
				var key1 = object.record.testnet.privatekey ;
				var address1 = object.record.testnet.address ;


				var asset = {
				'issueAddress': address1,
				'amount': 100,
				'divisibility': 0,
				'fee': 5000,
				'reissueable': false,
				'transfer': [{
				'address': address1,
					'amount': 100
				}],
				'metadata': {
					'assetId': req.body.assetnumber,
					'assetName': req.body.title,
					'issuer': req.body.ownername,
					'issueraddress': address1, 
					'description': req.body.description,
				'userData': {
					'meta' : [
					{key: 'Item ID', value: 1, type: 'Number'},
					{key: 'Item Name', value: 'Item Name', type: 'String'},
					{key: 'Company', value: 'My Company', type: 'String'},
					{key: 'Address', value: 'San Francisco, CA', type: 'String'}
					]
				}
			}
			};

			postToApi('issue', asset, function(err, body){
				if (err || body== null) {
					console.log('error: ',err);
				}else {
					console.log('issue: ',body);
					if(body.txHex != null) {
				var data = {
					network : network,
					assetId : body.assetId,
					txHex : body.txHex,
					assetName: req.body.title,
					issuer: req.body.ownername,
					issueraddress: address1, 
					asset: asset
					
				};
				assetstore.insertasset(username, data, function(err, obj) {
				if (err) return res.json({error:err});
				return res.json(obj);
				});
					} else {
						return res.json(body);
					}
			  }
			});
				
		//			res.json(body);
			


				
				
				
				
				
			
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
	
    }
	
	this.createtestasset = function(req, res) {
        "use strict";

     var network = req.body.network;
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
		   console.log("username="+username);
           keystore.getkeys(username,function(err, object) {
			if(err) return res.json({error:err});
			else {
				
				console.log(object);
				
				//var key1 = 'L32oQn3Df8nvCoZiNnfTeRhC8rVjtC1tAMeDk9ovxBPWardxT5tT';
				//var address1 = 'mnZzLW7SFi1zfGD8RBRZkyV8EQps1rmBLE';
				
				var key1 = object.testnet.privatekey ;
				var address1 = object.testnet.address ;


				var asset = {
				'issueAddress': address1,
				'amount': 100,
				'divisibility': 0,
				'fee': 5000,
				'reissueable': false,
				'transfer': [{
				'address': address1,
					'amount': 100
				}],
				'metadata': {
					'assetId': '1',
					'assetName': 'Mission Impossible 15',
					'issuer': 'Fox Theater',
					'description': 'Movie ticket to see the New Tom Cruise flick',
				'userData': {
					'meta' : [
					{key: 'Item ID', value: 1, type: 'Number'},
					{key: 'Item Name', value: 'Item Name', type: 'String'},
					{key: 'Company', value: 'My Company', type: 'String'},
					{key: 'Address', value: 'San Francisco, CA', type: 'String'}
					]
				}
			}
			};

			postToApi('issue', asset, function(err, body){
				if (err) console.log('error: ',err);
				
				var data = {
					network : network,
					assetId : body.assetId,
					txHex : body. txHex
					
				};
				assetstore.insertasset(username, data, function(err, obj) {
				if (err) return res.json({error:err});
				return res.json(obj);
			});
				
		//			res.json(body);
			});


				
				
				
				
				
			
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
	
    }
	
	
	
	
	this.getkeys = function(req, res) {
        "use strict";

     
		
		var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
              var  username = username1;
            
			
		   console.log("username="+username);
           keystore.getkeys(username,function(err, object) {
			if(err) return res.json({error:err});
			else {
				res.json(object);
			}
			
		});
		
			}
			else {
				if (err) return res.json({error:err});
			}
            
        });
	
    }
	
	
	this.createkeys = function(req, res) {
        "use strict";

    
		var network = req.body.network;
	
		var username ;
        var data = {
			network: '',
			mainnet:{},
			testnet: {}
			
		};
	
			var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username1) {
            "use strict";

            if (!err && username1) {
                username = username1;
            
			if(network == 'mainnet'){
			key = bitcoin.ECKey.makeRandom();
			var address = key.pub.getAddress().toString();
			console.log('new bitcoin address: ['+address+']');

			var wif = key.toWIF();
			console.log('new mainnet address: ['+address+']');
			console.log('Private Key of new address (WIF format): ['+wif+']');
	
			data.network = 'mainnet';
			data.address = address;
			data.privatekey = wif;
			data.publickey = 'xxx';
			
				
			}else if(network == 'testnet'){
			
			var key = bitcoin.ECKey.makeRandom();
			//var address = key.getAddress().toString();
			var address = key.pub.getAddress(bitcoin.networks.testnet).toString();
			var wif = key.toWIF();
			console.log('new TESTNET address: ['+address+']');
			console.log('Private Key of new address (WIF format): ['+wif+']');
			
			data.network = 'testnet';
			data.address = address;
			data.privatekey = wif;
			data.publickey = 'xxx';
			
			
			}else {
				
				return res.json(false);
			}
			
			
			

			console.log("username="+username);
            keystore.insertkeys(username, data, function(err, user) {
				if (err) return res.json({error:err});
				return res.json(user);
			});
			
			
			}
			else {
				return res.json(false);
			}
            
        });
		
    
	}
	
	
}

module.exports = SessionColored;
