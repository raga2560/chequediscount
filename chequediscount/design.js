
.controller('GovtPolicyCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];
	
	$scope.savepolicy = function()
	{
		// policy is saved.
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
	
	
 })

 .controller('EnduserPolicyCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	
	$scope.datacollectiongroups = ["jobsdata", "profitdata", "investmentdata", "pollutiondata", "cleanlinessdata"];
	$scope.ratingparameters = ["topprofit", "toploss", "topmarks", "topollutors", "mostclean"];
	$scope.monitoringgroups = ["sandp200", "usamonitor", "indiamonitor", "asiamonitor"];

// add examples of endusers

// pull data applicable for this users

// apply for policy, contact banks

// get notification



 })

 

 
  .controller('BankPolicyCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	
	$scope.incentivetooling = '';
	$scope.disincentivetooling = '';
	
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



 })

 
  .controller('DataCollectionCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	
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

 })

 
 
  .controller('MonitorCtrl', function($scope, $http) {

	$scope.names = ["Emil", "Tobias", "Linus"];
	$scope.targetgroups = ["youth20to40", "working20to60", "girls20to40", "businessmen", "youngenterprenors"];
	$scope.incentive = '';
	$scope.incentiveparameters = ["profitlast3years", "markspast3years", "jobcreatedpast3years", "investmentpast3years", "pollutionpast3years" ];
	$scope.disincentiveparameters = ["losslast3years", "pollutionpast3years", "jobexportedpast3years", "joblosspast3years", "uninvestedmoneypast3years" ];
	
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


 })

 