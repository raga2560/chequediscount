var  Chequesession = require('./chequesession')
  
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var chequesession = new Chequesession(db);
	
  

    // Middleware to see if a user is logged in
    app.use(chequesession.isLoggedInMiddleware);

    // The main page of the blog
    // Login form
  
	//------------------------chequediscount top ----------------------------------//

	app.post('/cheque/adminregister', chequesession.adminregister);
	app.post('/cheque/handleLoginRequest', chequesession.handleLoginRequest);
	app.post('/cheque/adminLogout', chequesession.adminLogout);
	
	
	app.get('/cheque/isLoggedIn', chequesession.isLoggedIn);
	app.get('/cheque/getissuers', chequesession.getissuers);
	app.get('/cheque/getreceivers', chequesession.getreceivers);
	app.get('/cheque/getusertransactions', chequesession.getusertransactions);
	app.get('/cheque/gettransactions', chequesession.gettransactions);
	app.get('/cheque/getactivetransactions', chequesession.getactivetransactions);

	app.post('/cheque/createissuer', chequesession.createissuer);
	app.post('/cheque/creatediscounter', chequesession.creatediscounter);
	app.post('/cheque/createreceiver', chequesession.createreceiver);
	
	app.post('/cheque/getratingofuser', chequesession.getratingofuser);
	app.post('/cheque/chequedeposit', chequesession.chequedeposit);
	app.post('/cheque/setmaxdiscount', chequesession.setmaxdiscount);
	app.post('/cheque/setdiscount', chequesession.setdiscount);
	app.post('/cheque/setissuerrating', chequesession.setissuerrating);
	
	



	
	
	
	
	
	//------------------------chequediscount bottom ----------------------------------//
	
	
	
    // Error handling middleware
    app.use(ErrorHandler);
}
