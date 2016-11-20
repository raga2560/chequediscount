var fs = require('fs-extra');
var path = require('path');
var crypto = require('crypto');


var UsersDAO = require('../users').UsersDAO
  , SessionsDAO = require('../sessions').SessionsDAO
  , VisualappDAO = require('../visualapp').VisualappDAO
  , ConfappDAO = require('../confapp').ConfappDAO;

/* The SessionHandler must be constructed with a connected db */
function SessionHandler (db) {
    "use strict";

    var users = new UsersDAO(db);
    var sessions = new SessionsDAO(db);
    var confapp = new ConfappDAO(db);
	var visualapp = new VisualappDAO(db);
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
                    return res.status(500).json({username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.status(500).json( {username:username, password:"", login_error:"Invalid password"});
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
				return res.json(session_id);
                //return res.redirect('/welcome');
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
			res.json(true);
            //return res.redirect('/');
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
                        return res.status(500).	json(errors);
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
					return res.json(session_id);
                    //return res.redirect('/welcome');
                });
            });
        }
        else {
            console.log("user did not validate");
            return res.status(500).json(errors);
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
	
}

module.exports = SessionHandler;
