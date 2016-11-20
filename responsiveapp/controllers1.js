angular.module('myapp.controllers1', [])


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
   
	
