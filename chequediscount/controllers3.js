angular.module('myapp.controllers3', [])


.controller('GovtPolicyCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.policygroups = ["profitcompliance", "profitincrease", "jobincrease", "investmentincrease", "cleanlinessincrease"];
	
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	$scope.supportdatas = ["investment", "profit", "sales", "projection", "paymentontime", "reputationofbusiness", "qualityofproduct"];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	$scope.supportgroups = ["coopbanks", "privatebanks", "ngobanks", "softwarefundraise", "innovfundraise", "bitbondsbank", "goldbanks", "industrybanks", "agriculturebank"];
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];
	
	$scope.endusergroups = [
  {groupname:'youth20to40', individuals:['ramesh', 'rajesh']},
  {groupname:'youngenterprenors', individuals:['himanshu', 'ganesh', 'geeta']},
  {groupname:'working20to60', individuals:['himanshu', 'ganesh', 'geeta']},
  {groupname:'businessmen', individuals:['shashi']},
  {groupname:'girls20to40', individuals:['geeta']}
  ];
  
	$scope.policycreate = function()
	{
		// policy is saved.
		$scope.createpolicyentry();
	}
	$scope.broadcastpolicy = function ()
	{
		// update policy in ethereum
	}
	
	// to be used for testing
	
	$scope.notifybanks = function ()
	{
		// for all banks that suite policy, inform about policy-link
	}

	$scope.notifyendusers = function ()
	{
		// for all users that suite policy, inform about policy-link
	}
	
	$scope.notifymonitor = function ()
	{
		// for all monioring agencies that suite policy, inform about policy-link
	}
	
	$scope.notifydatacollector = function ()
	{
		// for all data collectors that suite policy, inform about policy-link
	}
	//------------------------------ 1  ------------------------------------//
	
	 $scope.govtpolicy = {
		 title: 'testing',
		 targetgroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 expectation:'',
		 supportexpectation:'',
		 supportgroup: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 datacollectiongroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 incentive : {
			 incentiveparameter: '',
			 incentive: '',
			 dislist: '',
			 list : []
			 
		 },
		 disincentive : {
			 disincentiveparameter: '',
			 disincentive: '',
			 dislist: '',
			 list : []
			 
		 },
		 ratingparameter : {
			 parameter : '',
			 dislist: '',
			 list : []
		 },
		 monitoringgroup: {
			 groupname : 'test',
			 dislist: '',
			 list : []
			 
		 },
		 individualssubscribed: []
		 
		 
		 
	 };
	 
	 $scope.addtargetgroup = function()
	 {
		 $scope.govtpolicy.targetgroup.list.push($scope.govtpolicy.targetgroup.groupname);
		 $scope.govtpolicy.targetgroup.dislist = $scope.govtpolicy.targetgroup.list.join('\n');
	 }
	 $scope.addsupportgroup = function()
	 {
		 $scope.govtpolicy.supportgroup.list.push($scope.govtpolicy.supportgroup.groupname);
		 $scope.govtpolicy.supportgroup.dislist = $scope.govtpolicy.supportgroup.list.join('\n');
	 }
	 
	 
	 $scope.adddatacollectiongroup = function()
	 {
		 $scope.govtpolicy.datacollectiongroup.list.push($scope.govtpolicy.datacollectiongroup.groupname);
		 $scope.govtpolicy.datacollectiongroup.dislist = $scope.govtpolicy.datacollectiongroup.list.join('\n');
	 }
	 
	 $scope.addmonitoringgroup = function()
	 {
		 $scope.govtpolicy.monitoringgroup.list.push($scope.govtpolicy.monitoringgroup.groupname);
		 $scope.govtpolicy.monitoringgroup.dislist = $scope.govtpolicy.monitoringgroup.list.join('\n');
	 }
	 
	  $scope.addrating = function()
	 {
		 $scope.govtpolicy.ratingparameter.list.push($scope.govtpolicy.ratingparameter.parameter);
		 $scope.govtpolicy.ratingparameter.dislist = $scope.govtpolicy.ratingparameter.list.join('\n');
	 }
	 
	 
	 
	 $scope.addincentive = function()
	 {
		 
		 var obj = {
			 incentiveparameter: '',
			 incentive: ''
		 };
		 obj.incentiveparameter = $scope.govtpolicy.incentive.incentiveparameter;
		 obj.incentive = $scope.govtpolicy.incentive.incentive;
		 var pretty = true;
		 
		 $scope.govtpolicy.incentive.list.push(obj);
		 
		 $scope.govtpolicy.incentive.dislist = JSON.stringify($scope.govtpolicy.incentive.list);
		 //$scope.govtpolicy.incentive.dislist = angular.toJson($scope.govtpolicy.incentive.list, pretty);
	 }
	 
	 $scope.adddisincentive = function()
	 {
		 
		 var obj = {
			 disincentiveparameter: '',
			 disincentive: ''
		 };
		 obj.disincentiveparameter = $scope.govtpolicy.disincentive.disincentiveparameter;
		 obj.disincentive = $scope.govtpolicy.disincentive.disincentive;
		 var pretty = false;
		 
		 $scope.govtpolicy.disincentive.list.push(obj);
		 
		// $scope.govtpolicy.incentive.dislist = JSON.stringify($scope.govtpolicy.incentive.list);
		 $scope.govtpolicy.disincentive.dislist = angular.toJson($scope.govtpolicy.disincentive.list, pretty);
	 }
	 
	 //------------------------------ 1.1  ------------------------------------//
	 $scope.createpolicyentry = function ()
	 {
		 
		 
		 $http.post('/govt/policyentry', $scope.govtpolicy).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		alert ("Policy created !!");
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.getpolicies = function ()
	 {
		 
		 
		 $http.get('/govt/listpolicies', null).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.govtpolicylist = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.selectedpolicy = 'hi';
	 $scope.getpolicydata = function (pol)
	 {
		 
		 
		 //alert (pol);
		 $http.get('/govt/getpolicy/'+pol).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.govtpolicyview = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	//------------------------------ 1.2  ------------------------------------//
	
 })

 .controller('EnduserPolicyCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.policygroups = ["profitcompliance", "profitincrease", "jobincrease", "investmentincrease", "cleanlinessincrease"];
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	$scope.supportdatas = ["investment", "profit", "sales", "projection", "paymentontime", "reputationofbusiness", "qualityofproduct"];
	
	$scope.endusergoals = ["improvequality", "increaseproduction", "increasemarket", "increaseeffeciency", "developspecialistskills"];
	$scope.enduserneeds = ["discountedinvestment", "lesserinterestloan", "technicalknowhow", "improvedlaws", "progressivesupport"];
	$scope.enduserbenifttoothers = ["morejobs", "lessercost", "effecient", "longlasting", "lessdefects", "qualitygoods"];
	
	$scope.enduserpolicys = [ "profitincrease", "jobincrease", "investmentincrease", "cleanlinessincrease"];
	
	$scope.bankschemes = ["abc_loan8percent", "abc_loan6percent", "abc_loan12percent", "abc_investonemillion", "abc_investtenmillion"];
	
	$scope.incentiveavailable = ['2% discount on interest', '100% investment'];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];

//------------------------2.1----------------------------------------//

// enduser create, view notification, apply scheme, apply policy

   $scope.endusers = ['ramesh','rajesh','himanshu','ganesh','shashi','geeta'];
   $scope.endusersdetails = [{name:'ramesh',age:30,work:'software'},
	{name:'rajesh',age:50,work:'software'},
	{name:'himanshu',age:30,work:'enterprnour'},
	{name:'ganesh',age:30,work:'enterprnour'},
	{name:'geeta',age:30,work:'enterprnour'},
	{name:'shashi',age:30,work:'teacher'}
	];
  $scope.endusergroups = [
  {groupname:'youth20to40', individuals:['ramesh', 'rajesh']},
  {groupname:'youngenterprenors', individuals:['himanshu', 'ganesh', 'geeta']},
  {groupname:'working20to60', individuals:['himanshu', 'ganesh', 'geeta']},
  {groupname:'businessmen', individuals:['shashi']},
  {groupname:'girls20to40', individuals:['geeta']}
  ];
  
  
  $scope.enduser = {
		 endusername: 'testing',
		 subscribegroups : [],
		 govtpolicynotification: [],
		 bankschemenotification: [],
		 govtpolicyapplied: [],
		 bankschemeapplied: [],
		 enduserbenifttoother: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 enduserneed : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 endusergoal : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 govtpolicies : {
			 groupname : 'test'			 
		 },
		 bank: {
			 schemename:''
		 },
		 
		 howachieving: '',
		 howcanbehelped:''
		 

	
  };
				
	 $scope.addenduserbenifttoother = function()
	 {
		 $scope.enduser.enduserbenifttoother.list.push($scope.enduser.enduserbenifttoother.groupname);
		 $scope.enduser.enduserbenifttoother.dislist = $scope.enduser.enduserbenifttoother.list.join('\n');
	 }	

     $scope.addenduserneed = function()
	 {
		 $scope.enduser.enduserneed.list.push($scope.enduser.enduserneed.groupname);
		 $scope.enduser.enduserneed.dislist = $scope.enduser.enduserneed.list.join('\n');
	 }	 
		 
	
	$scope.addendusergoal = function()
	 {
		 $scope.enduser.endusergoal.list.push($scope.enduser.endusergoal.groupname);
		 $scope.enduser.endusergoal.dislist = $scope.enduser.endusergoal.list.join('\n');
	 }	 
	
	
	
  
  //  create users, with arrays -> in backend
  $scope.endusercreate = function ()
	 {
		 
		 
		 $http.post('/govt/endusercreate', $scope.enduser).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		alert('User created !!');
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
  
   $scope.getenduser = function (user)
	 {
		 
		 
		 $http.get('/govt/getenduser/'+user, null).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.enduser = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	  $scope.userapplypolicy = function (user,policy)
	 {
		 $scope.userapplypol = {
			policy:policy,
			user: user			
		 };
		 
		 $http.post('/govt/userapplypolicy', $scope.userapplypol).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		alert('Policy applied !!');
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
  
     $scope.userapplyscheme = function (user,scheme)
	 {
		 $scope.userapplyscheme = {
			scheme:scheme,
			user: user			
		 };
		 
		 $http.post('/govt/userapplyscheme', $scope.userapplyscheme).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		alert('Scheme applied !!');
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
  
  
// add examples of endusers

// pull data applicable for this users

// apply for policy, contact banks

// get notification



 })

 

 
  .controller('SupportGroupCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.policygroups = ["profitcompliance", "profitincrease", "jobincrease", "investmentincrease", "cleanlinessincrease"];
	
	$scope.bankschemes = ["abc_loan8percent", "abc_loan6percent", "abc_loan12percent", "abc_investonemillion", "abc_investtenmillion"];
	
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	$scope.supportdatas = ["investment", "profit", "sales", "projection", "paymentontime", "reputationofbusiness", "qualityofproduct"];
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];

// add example of bankers
// get notification



// Do business of banking/ investing, taking into account benefit for banker

	$scope.investineducation = function(incentive,disincentive, targetgroup)
	{
		// contact them with offers
	}
	$scope.investinbusiness = function(incentive,disincentive, targetgroup)
	{
		// contact them with offers
	}
	$scope.getlistofbusinesstoinvest = function(targetgroup)
	{
		// get list of business to-suite-us and also govt-policy
	}
	$scope.getnotification = function(targetgroup)
	{
		// decide which we can use.
		
	}

// Measure benefit of bankers investment to endusers

    $scope.measurebenefit = function(policy, investment, targetgroups)
	{
		// send benefit to endusers due to investment.
		// Bank to get incentive if validated by monitoring agency.
		// send data to monitoring and data collection
	}

	$scope.senddata = function(policy, investment, targetgroups)
	{
		// send benefit to endusers due to investment.
		
		// send data to monitoring and data collection
	}

//--------------------------------  3.1      ---------------------------------------//

	 $scope.bankscheme = {
		 title: 'testing',
		 targetgroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 benefit:'',
		 investment:'',
		 govtpolicies: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		  
		 supportdata: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 supportgroup: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 datacollectiongroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 incentive : {
			 incentiveparameter: '',
			 dislist: '',
			 list : []
			 
		 },
		 disincentive : {
			 disincentiveparameter: '',
			 dislist: '',
			 list : []
			 
		 },
		 ratingparameter : {
			 parameter : '',
			 dislist: '',
			 list : []
		 },
		 individualssubscribed:[]
		 
		 
		 
	 };
	 
	 
	 
	 $scope.addgovtpolicy = function()
	 {
		 $scope.bankscheme.govtpolicies.list.push($scope.bankscheme.govtpolicies.groupname);
		 $scope.bankscheme.govtpolicies.dislist = $scope.bankscheme.govtpolicies.list.join('\n');
	 }
	 
	 $scope.addtargetgroup = function()
	 {
		 $scope.bankscheme.targetgroup.list.push($scope.bankscheme.targetgroup.groupname);
		 $scope.bankscheme.targetgroup.dislist = $scope.bankscheme.targetgroup.list.join('\n');
	 }
	 $scope.addsupportdata = function()
	 {
		 $scope.bankscheme.supportdata.list.push($scope.bankscheme.supportdata.groupname);
		 $scope.bankscheme.supportdata.dislist = $scope.bankscheme.supportdata.list.join('\n');
	 }
	 
	 
	  $scope.addrating = function()
	 {
		 $scope.bankscheme.ratingparameter.list.push($scope.bankscheme.ratingparameter.parameter);
		 $scope.bankscheme.ratingparameter.dislist = $scope.bankscheme.ratingparameter.list.join('\n');
	 }
	 
	 
	 
	 $scope.addincentive = function()
	 {
		 
		 var obj = {
			 incentiveparameter: ''
			 
		 };
		 obj.incentiveparameter = $scope.bankscheme.incentive.incentiveparameter;
		 
		 
		 var pretty = true;
		 
		 $scope.bankscheme.incentive.list.push(obj);
		 
		 $scope.bankscheme.incentive.dislist = JSON.stringify($scope.bankscheme.incentive.list);
		 //$scope.bankscheme.incentive.dislist = angular.toJson($scope.bankscheme.incentive.list, pretty);
	 }
	 
	 $scope.adddisincentive = function()
	 {
		 
		 var obj = {
			 disincentiveparameter: ''
			 
		 };
		 obj.disincentiveparameter = $scope.bankscheme.disincentive.disincentiveparameter;
		 
		 
		 var pretty = false;
		 
		 $scope.bankscheme.disincentive.list.push(obj);
		 
		// $scope.bankscheme.incentive.dislist = JSON.stringify($scope.bankscheme.incentive.list);
		 $scope.bankscheme.disincentive.dislist = angular.toJson($scope.bankscheme.disincentive.list, pretty);
	 }
	 
	 //--------------------------------  3.2      ---------------------------------------//
	 
	 $scope.bankschemecreate = function ()
	 {
		 
		 
		 $http.post('/govt/schemeentry', $scope.bankscheme).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		alert ("Bank scheme created !!");
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.getschemes = function ()
	 {
		 
		 
		 $http.get('/govt/listschemes', null).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.bankschemelist = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.selectedscheme = 'hi';
	 $scope.getschemedata = function (pol)
	 {
		 
		 
		 //alert (pol);
		 $http.get('/govt/getscheme/'+pol).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.bankschemeview = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 

 })

 
  .controller('DataCollectionCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.policygroups = ["profitcompliance", "profitincrease", "jobincrease", "investmentincrease", "cleanlinessincrease"];
	
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	$scope.supportdatas = ["investment", "profit", "sales", "projection", "paymentontime", "reputationofbusiness", "qualityofproduct"];
	$scope.supportgroups = ["coopbanks", "privatebanks", "ngobanks", "softwarefundraise", "innovfundraise", "bitbondsbank", "goldbanks", "industrybanks", "agriculturebank"];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];

// add example of datacollection
// get notification


	$scope.geteducationdata = function(targetgroup)
	{
		// bid and get selected from targetgroup to collect information
	}
	$scope.getbusinessdata = function(targetgroup)
	{
		// contact them with offers
	}
	$scope.getlisttocollect = function(targetgroup)
	{
		// get list of business to-suite-us and also target-group
	}
	$scope.getnotification = function(targetgroup)
	{
		// decide which we can use.
		
	}

	$scope.updatecollecteddata = function()
	{
		
	}
	
// Calculate rating as needed for each parameter

	$scope.calculaterating = function(policy, parameters, banks, endusers, targetgroup)
	{
			// update rating in database for monitoring
	}
	
	
 //--------------------------------  4.1      ---------------------------------------//
 
 
 	 $scope.datacollector = {
		 title: 'testing',
		 targetgroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 benefit:'',
		 investment:'',
		 govtpolicies: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		  
		 supportdata: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 supportgroup: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 datacollectiongroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 
		 ratingparameter : {
			 parameter : '',
			 dislist: '',
			 list : []
		 }
		 
		 
		 
	 };
	 
	 
	 
	 $scope.addgovtpolicy = function()
	 {
		 $scope.datacollector.govtpolicies.list.push($scope.datacollector.govtpolicies.groupname);
		 $scope.datacollector.govtpolicies.dislist = $scope.datacollector.govtpolicies.list.join('\n');
	 }
	 
	 $scope.addtargetgroup = function()
	 {
		 $scope.datacollector.targetgroup.list.push($scope.datacollector.targetgroup.groupname);
		 $scope.datacollector.targetgroup.dislist = $scope.datacollector.targetgroup.list.join('\n');
	 }
	 
	 $scope.addsupportgroup = function()
	 {
		 $scope.datacollector.supportgroup.list.push($scope.datacollector.supportgroup.groupname);
		 $scope.datacollector.supportgroup.dislist = $scope.datacollector.supportgroup.list.join('\n');
	 }
	 
	 
	 $scope.addsupportdata = function()
	 {
		 $scope.datacollector.supportdata.list.push($scope.datacollector.supportdata.groupname);
		 $scope.datacollector.supportdata.dislist = $scope.datacollector.supportdata.list.join('\n');
	 }
	 
	 
	  $scope.addrating = function()
	 {
		 $scope.datacollector.ratingparameter.list.push($scope.datacollector.ratingparameter.parameter);
		 $scope.datacollector.ratingparameter.dislist = $scope.datacollector.ratingparameter.list.join('\n');
	 }
	 
	 
//--------------------------------  4.2      ---------------------------------------//	 
	 

	 $scope.createdatacollectorentry = function ()
	 {
		 
		 
		 $http.post('/govt/datacollectorentry', $scope.datacollector).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.getdatacollectors = function ()
	 {
		 
		 
		 $http.get('/govt/listdatacollectors', null).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.datacollectorlist = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.selecteddatacollector = 'hi';
	 $scope.getdatacollectordata = function (pol)
	 {
		 
		 
		 //alert (pol);
		 $http.get('/govt/getdatacollector/'+pol).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.datacollectorview = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 
 
 
 
 
 

 })

 
 
  .controller('MonitorCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.policygroups = ["profitcompliance", "profitincrease", "jobincrease", "investmentincrease", "cleanlinessincrease"];
	
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	$scope.supportdatas = ["investment", "profit", "sales", "projection", "paymentontime", "reputationofbusiness", "qualityofproduct"];
	$scope.supportgroups = ["coopbanks", "privatebanks", "ngobanks", "softwarefundraise", "innovfundraise", "bitbondsbank", "goldbanks", "industrybanks", "agriculturebank"];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];

// add example of monitors
// get notification


	$scope.monitoreducationdata = function( targetgroup)
	{
		// bid and get selected from targetgroup to collect information
	}
	$scope.monitorbusinessdata = function(targetgroup)
	{
		// contact them with offers
	}
	$scope.monitorlisttowork = function(targetgroup)
	{
		// get list of business to-suite-us and also target-group
	}
	$scope.monitornotification = function(targetgroup)
	{
		// decide which we can use.
		
	}
	
	$scope.validateratings = function(banks, endusers, policy)
	{
		// standard deviations, errors identified
	}

	
//--------------------------------  5.1      ---------------------------------------//

 
 	 $scope.monitor = {
		 title: 'testing',
		 targetgroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 benefit:'',
		 investment:'',
		 monitorwhat:'',
		 whatdata:'',
		 govtpolicies: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		  
		 supportdata: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 supportgroup: {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 datacollectiongroup : {
			 groupname : 'test',
			 dislist: '',
			 list: []
		 },
		 
		 ratingparameter : {
			 parameter : '',
			 dislist: '',
			 list : []
		 }
		 
		 
		 
	 };
	 
	 
	 
	 $scope.addgovtpolicy = function()
	 {
		 $scope.monitor.govtpolicies.list.push($scope.monitor.govtpolicies.groupname);
		 $scope.monitor.govtpolicies.dislist = $scope.monitor.govtpolicies.list.join('\n');
	 }
	 
	 $scope.addtargetgroup = function()
	 {
		 $scope.monitor.targetgroup.list.push($scope.monitor.targetgroup.groupname);
		 $scope.monitor.targetgroup.dislist = $scope.monitor.targetgroup.list.join('\n');
	 }
	 $scope.addsupportdata = function()
	 {
		 $scope.monitor.supportdata.list.push($scope.monitor.supportdata.groupname);
		 $scope.monitor.supportdata.dislist = $scope.monitor.supportdata.list.join('\n');
	 }
	 
	 $scope.addsupportgroup = function()
	 {
		 $scope.monitor.supportgroup.list.push($scope.monitor.supportgroup.groupname);
		 $scope.monitor.supportgroup.dislist = $scope.monitor.supportgroup.list.join('\n');
	 }
	 
	 
	  $scope.addrating = function()
	 {
		 $scope.monitor.ratingparameter.list.push($scope.monitor.ratingparameter.parameter);
		 $scope.monitor.ratingparameter.dislist = $scope.monitor.ratingparameter.list.join('\n');
	 }
	 
	  $scope.adddatacollectiongroup = function()
	 {
		 $scope.monitor.datacollectiongroup.list.push($scope.monitor.datacollectiongroup.groupname);
		 $scope.monitor.datacollectiongroup.dislist = $scope.monitor.datacollectiongroup.list.join('\n');
	 }
	 
	 
	 $scope.addincentive = function()
	 {
		 
		 var obj = {
			 incentiveparameter: ''
			 
		 };
		 obj.incentiveparameter = $scope.monitor.incentive.incentiveparameter;
		 
		 var pretty = true;
		 
		 $scope.monitor.incentive.list.push(obj);
		 
		 $scope.monitor.incentive.dislist = JSON.stringify($scope.monitor.incentive.list);
		 //$scope.monitor.incentive.dislist = angular.toJson($scope.monitor.incentive.list, pretty);
	 }
	 
	 $scope.adddisincentive = function()
	 {
		 
		 var obj = {
			 disincentiveparameter: ''
			 
		 };
		 obj.disincentiveparameter = $scope.monitor.disincentive.disincentiveparameter;
		 
		 var pretty = false;
		 
		 $scope.monitor.disincentive.list.push(obj);
		 
		// $scope.monitor.incentive.dislist = JSON.stringify($scope.monitor.incentive.list);
		 $scope.monitor.disincentive.dislist = angular.toJson($scope.monitor.disincentive.list, pretty);
	 }
	 
//--------------------------------  5.2      ---------------------------------------//

	 $scope.createmonitorentry = function ()
	 {
		 
		 
		 $http.post('/govt/monitorentry', $scope.monitor).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.getmonitors = function ()
	 {
		 
		 
		 $http.get('/govt/listmonitors', null).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.monitorlist = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.selectedmonitor = 'hi';
	 $scope.getmonitordata = function (pol)
	 {
		 
		 
		 //alert (pol);
		 $http.get('/govt/getmonitor/'+pol).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.monitorview = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 
 
 	 


 })

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
.controller('AssetCtrl', function($scope, $http) {
	
	 
	 $scope.username= '';
	 $scope.address= '';
	 $scope.publickey= '';
	 $scope.privatekey= '';
	 
	 $scope.assetcheck={
		 assetid : ''
	 };
	 
	 
	 $scope.createtestnetasset = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.post('/hackathon/createtestasset', obj).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.createmainnetkeys = function ()
	 {
		 var obj = {
			network:'mainnet' 
		 };
		 $http.post('/hackathon/createkeys', obj).then(function(response) {
	  
		
		$scope.mainnet = response.data.mainnet;
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.gettestnetassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.post('/hackathon/gettestnetassets', obj).then(function(response) {
		
		$scope.assets = response.data;
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
	 $scope.commitasset = function (obj)
	 {
		
		 
		 $http.post('/hackathon/signandsendasset', obj).then(function(response) {
		
		$scope.assets = response.data;
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
	 
	 $scope.getassetowner = function()
	 {
		 
		$http.post('/hackathon/getassetowner', $scope.assetcheck).then(function(response) {
		
		$scope.checkassets = response.data;
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
	 
	 
	 $scope.getassetdetail = function(obj)
	 {
		 var myassets ={
			someUtxo : obj.someUtxo,
			assetId: obj.assetId
		 };
		 
		$http.post('/hackathon/getassetdetail', myassets).then(function(response) {
		
		
		
		var pretty = true;
		
		$scope.assetsmeta = angular.toJson(response.data, pretty);
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
	 
     
	 
	 
	  
	 
	 
   })

   
.controller('LoginCtrl', function($scope, $http) {
	
	 
	 $scope.username= '';
	 $scope.address= '';
	 $scope.publickey= '';
	 $scope.privatekey= '';
	 
	 $scope.mytest= 'hi';
	 
	 $scope.testnet = {
		 
	 };
	 
	 $scope.mainnet = {
		 
	 };
	 $scope.balance = {
		testnet:'',
		mainnet:''		
	 };
	 $scope.listing = {
		testnet:{},
		mainnet:{}		
	 };
	 
	 function getloginstatus() 
	 {
      $http.get('/hackathon/getloginuser').then(function(response) {
	  
        $scope.username = response.data.username;
		
      }, function(errResponse) {
		  $scope.username= '';
        console.error('Error while fetching notes');
      
	  });
	 }
	 getloginstatus();
	 
	 
	 $scope.createtestnetkeys = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 $http.post('/hackathon/createkeys', obj).then(function(response) {
	  
		$scope.testnet = response.data.testnet;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.createmainnetkeys = function ()
	 {
		 var obj = {
			network:'mainnet' 
		 };
		 $http.post('/hackathon/createkeys', obj).then(function(response) {
	  
		
		$scope.mainnet = response.data.mainnet;
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.getkeys = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 $http.get('/hackathon/getkeys', obj).then(function(response) {
	  
		$scope.testnet = response.data.testnet;
		$scope.mainnet = response.data.mainnet;
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
     
	 $scope.getkeys();
	 
	 function mycall()
	 {
		 
	 }
	 $scope.checktestnetbalance = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 /*
		 $scope.realTimeData;

    var url = "http://testnet.api.coloredcoins.org/v3/addressinfo/"+ $scope.testnet.address + "?callback=JSON_CALLBACK&name=0";

    $http.jsonp(url)
        .success(function(data){
            
			alert(angular.toJson(data));
		//$scope.balance.testnet = data.utxos[0].value;
		//$scope.listing.testnet = data; // angular.toJson(data);
		
        }); */
		
		/*
		
		$http({
        method: 'JSONP',
        url: "http://testnet.api.coloredcoins.org/v3/addressinfo.jsonp"+ $scope.testnet.address+".json",
        params: {
            format: 'jsonp',
            json_callback: 'JSON_CALLBACK'
        }
    }).then(function (response) {
		alert(angular.toJson(response));
        $scope.data = response.data;
        console.log(response.data)
    }, function(errResponse) {
		alert(angular.toJson(errResponse));
		  $scope.error= 'error getting key';
        
      
	  }
	
	);
	*/
		$http.get('/hackathon/getaddresscontents').then(function(response) {
	  
	 // alert(angular.toJson(response));
        $scope.balance.testnet = response.data.utxos;
		var pretty = true;
		$scope.mytest = 'hello';
		$scope.listtestnet = angular.toJson(response.data, pretty);
		
		
		
      }, function(errResponse) {
		  // angular.toJson(errResponse)
        console.error('Error while fetching notes');
      
	  });
	  
		/*
		 var url = "http://testnet.api.coloredcoins.org/v3/addressinfo/"+ $scope.testnet.address;
		 
		 $http.get(url, null).then(function(response) {
	  
		$scope.balance.testnet = response.data.utxos[0].value;
		$scope.listing.testnet = angular.toJson(response.data);
		
      }, function(errResponse) {
		
		  $scope.error= 'error getting key';
        
      
	  }); */
	 }
	 
	 
   })
   
.controller('QuestionCtrl', function($scope, QuestionService) {  
       QuestionService
           .getquestions().then(function (res) {
			   $scope.questions = res.data;
			   for(var i=0; i< $scope.questions.length; i++)
			   {
				   if($scope.questions[i].type == 'multiselect')
				   {
					   $scope.questions[i].qroute = "questionroutedetail";
				   }
				   else {
					   $scope.questions[i].qroute = "questionroutedetail";
				   }
			   }
			    //$scope.qroute = "questionroutedetail";
               // success
            }, function (res) {
               // error
            });
   });
   
	
