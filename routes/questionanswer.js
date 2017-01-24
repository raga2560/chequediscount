var fs = require('fs-extra');
var path = require('path');
var crypto = require('crypto');
var request = require('request');


var UsersDAO = require('../users').UsersDAO
  , SessionsDAO = require('../sessions').SessionsDAO
   , UserrecordDAO = require('../userrecord').UserrecordDAO
  //, IPFSAppDAO = require('../ipfs').IPFSAppDAO

  , QuestionAnswerDAO = require('../questionanswer').QuestionAnswerDAO

  ;

  
 /* The SessionHandler must be constructed with a connected db */
function QuestionAnswerHandler (db) {
    "use strict";

    var users = new UsersDAO(db);
    var sessions = new SessionsDAO(db);
	var userrecord = new UserrecordDAO(db);
  
  //	var ipfsapp = new IPFSAppDAO(db);

	var questionanswer = new QuestionAnswerDAO(db);
	
	
	
	
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
	
		this.download = function(req, res) {
		var path = req.body.path;
		var hash = req.body.hash;
		var size = req.body.size;

		var obj = req.body;

	/*
			ipfsapp.viewrecord(obj, function(err, linkrecord) {
			res.json(linkrecord);
		}); */

	}

	this.document = function(req, res) {
        "use strict";

		var file = req.files.file;

		var file1 = {
	
        path: file.name,
        content: fs.createReadStream(file.path)
      };
	  /*
		ipfsapp.uploadrecord(file1, function(err, hashrecord) {
			if(err || (hashrecord == null))
			{
					return res.json(null);
			}
			else {
				return res.json(hashrecord);
			}
		
		});
	*/	
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
	
	
	this.enteranswer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var answer = data.answer;
		
		questionanswer.enteranswer(req.username,recordid,answer, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	this.updateanswer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var answer = data.answer;
		var answerindex = data.answerindex;
		
		questionanswer.updateanswer(req.username,recordid,answer, answerindex, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	this.deleteanswer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var answer = data.answer;
		var answerindex = data.answerindex;
		
		questionanswer.deleteanswer(req.username,recordid,answer, answerindex, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	
	
	this.enterlead = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var lead = data.lead;
		
		questionanswer.enterlead(req.username,recordid,lead, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	
	this.updatelead = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var lead = data.lead;
		var leadindex = data.leadindex;
		
		questionanswer.updatelead(req.username,recordid,lead,leadindex, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	
	this.deletelead = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var lead = data.lead;
		var leadindex = data.leadindex;
		
		questionanswer.deletelead(req.username,recordid,lead,leadindex, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	this.enterquestionanswer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		
		var qa = data;
		
		questionanswer.addquestion(req.username,qa, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	this.updatequestionanswer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		var question = data.question;
		
		
		questionanswer.updatequestion(req.username,recordid,question, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});

		

	}
	
	
	this.setquestionedit = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		
		
		
		questionanswer.setquestionedit(req.username,recordid,function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});

		

	}
	
	this.setquestionpublished = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var recordid = data.recordid;
		
		
		
		questionanswer.setquestionpublished(req.username,recordid,function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});

		

	}
	
	
	this.enteraffiliate = function(req, res) {
        "use strict";

		var data = req.body;
		
		var recordid = data.recordid;
		var affiliate = data.affiliate;
		
		questionanswer.enteraffiliate(req.username,recordid,affiliate, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		
	}
	
	
	this.updateaffilate = function(req, res) {
        "use strict";

		var data = req.body;
		
		var recordid = data.recordid;
		var affiliate = data.affiliate;
		var affiliateindex = data.affiliateindex;
		
		questionanswer.updateaffiliate(req.username,recordid,affiliate,affiliateindex, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		
	}
	
	this.deleteaffilate = function(req, res) {
        "use strict";

		var data = req.body;
		
		var recordid = data.recordid;
		var affiliate = data.affiliate;
		var affiliateindex = data.affiliateindex;
		
		questionanswer.deleteaffiliate(req.username,recordid,affiliate,affiliateindex, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		
	}
	
	this.getquestionanswer = function(req, res) {
        "use strict";

		var data = req.body;
		
		var recordid = data.recordid;
		
		questionanswer.getquestion(req.username,recordid, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		
	}
	
	this.deletequestionanswer = function(req, res) {
        "use strict";

		var data = req.body;
		
		var recordid = data.recordid;
		
		questionanswer.deletequestionanswer(req.username,recordid, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		
	}
	
	

	this.listquestions = function(req, res) {
		
		questionanswer.listquestions(req.username, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		
	}
	
	this.listsearchquestions = function(req, res) {
		
		var data = req.body;
		
		var technology = data.technology;
		var purpose = data.purpose;
		
		
		questionanswer.listsearchquestions(req.username,technology, purpose, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
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



module.exports = QuestionAnswerHandler;
