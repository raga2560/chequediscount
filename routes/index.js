var    multiparty = require('connect-multiparty')
      ,Questionanswer = require('./questionanswer')
       , ErrorHandler = require('./error').errorHandler;
  
	multipartyMiddleware = multiparty(); 

	module.exports = exports = function(app, db) {

    
	var questionanswer = new Questionanswer(db);
	
  

    // Middleware to see if a user is logged in
    app.use(questionanswer.isLoggedInMiddleware);

    // The main page of the blog
    // Login form
  
	//------------------------chequediscount top ----------------------------------//

	
	app.post('/questionanswer/enteranswer', questionanswer.enteranswer);
	app.post('/questionanswer/updateanswer', questionanswer.updateanswer);
	app.post('/questionanswer/updatelead', questionanswer.updatelead);
	app.post('/questionanswer/updateaffilate', questionanswer.updateaffilate);
	
	app.post('/questionanswer/deleteanswer', questionanswer.deleteanswer);
	app.post('/questionanswer/deletelead', questionanswer.deletelead);
	app.post('/questionanswer/deleteaffiliate', questionanswer.deleteaffilate);
	
	app.post('/questionanswer/setquestionedit', questionanswer.setquestionedit);
	app.post('/questionanswer/setquestionpublished', questionanswer.setquestionpublished);
	
	
	
	app.post('/questionanswer/enterquestionanswer', questionanswer.enterquestionanswer);
	app.post('/questionanswer/enteraffiliate', questionanswer.enteraffiliate);
	app.post('/questionanswer/enterlead', questionanswer.enterlead);
	app.post('/questionanswer/getquestionanswer', questionanswer.getquestionanswer);
	app.post('/questionanswer/deletequestionanswer', questionanswer.deletequestionanswer);
	app.post('/questionanswer/listquestions', questionanswer.listquestions);
	
	app.post('/questionanswer/listsearchquestions', questionanswer.listsearchquestions);
	app.post('/questionanswer/updatequestionanswer', questionanswer.updatequestionanswer);
	
	
	
	app.post('/questionanswer/adminregister', questionanswer.adminregister);
	app.post('/questionanswer/handleLoginRequest', questionanswer.handleLoginRequest);
	app.post('/questionanswer/adminLogout', questionanswer.adminLogout);
	
	app.post('/questionanswer/isLoggedIn', questionanswer.isLoggedIn);
	
	
	app.post('/upload/document', multipartyMiddleware, questionanswer.document);
	app.post('/download', questionanswer.download);
	
	



	
	
	
	
	
	//------------------------chequediscount bottom ----------------------------------//
	
	
	
    // Error handling middleware
    app.use(ErrorHandler);
}
