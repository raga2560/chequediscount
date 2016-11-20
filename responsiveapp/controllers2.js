angular.module('myapp.controllers2', ['chart.js'])


.controller('SellerRegistrationCtrl', function($scope, $http) {
     
	$scope.seller={
		 name : '',
		 network:'testnet' ,
		 resaddress:'',
		 selection:'',
		 sellerterms:''
	 };
	 	 
		 $scope.owners=[];
		 $scope.events=[];
	
	$scope.balance = {
		testnet:'',
		mainnet:''		
	 };
	 
	 $scope.sellerapplication = {
		  user: {},
			event:{},
			sellerterms:''
		 };
	 $scope.sellerapp = {
		name:'',
		event:'',
		sellerterms:''
	 };
	 
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listevents();
	 
	 $scope.getbalance =function (network, address)
	 {
		 if(network == 'testnet'){

		 var obj = {
			address: address 
		 };
		 
	 $http.post('/hackathon/getaddressbalance', obj).then(function(response) {
	  
	 
        $scope.balance.testnet = response.data.utxos;
		var pretty = true;
		
		$scope.listtestnet = angular.toJson(response.data, pretty);
		
		
		
      }, function(errResponse) {
		  // angular.toJson(errResponse)
        console.error('Error while fetching notes');
      
	  });
		 
			 
		 }
	 
	 }
	 	 
		 
		 
		 
	 $scope.listowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listsellerowners').then(function(response) {
	  
		$scope.owners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listowners();
	 
	 $scope.$watch(
                    'seller.selection',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0) {
								//alert(angular.toJson($scope.events, 1));
							 if($scope.events.length > 0)
							  $scope.seller.sellerterms = $scope.events[count].sellerterms;
							}
						}
						
						
						
                    }
                );
	
	$scope.$watch(
                    'sellerapp.event',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0) {
							//	alert(angular.toJson($scope.events, 1));
							  $scope.sellerapp.sellerterms = $scope.events[count].sellerterms;
						  $scope.sellerapplication.sellerterms = $scope.events[count].sellerterms;
						  $scope.sellerapplication.event = $scope.events[count];
							}
						}
						
						
						
                    }
                );
				
	$scope.$watch(
                    'sellerapp.name',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.owners.length > 0){
							  
						  $scope.sellerapplication.user = $scope.owners[count];
							}
						}
						
						
						
                    }
                );
	 $scope.createseller = function ()
	 {
		 $scope.error= '';
	
		
		if($scope.seller.name == '' || $scope.seller.phoneNumber == '' || $scope.seller.aadharNumber == '' )
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		
		 $http.post('/hackathon/createseller', $scope.seller).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.seller = {};
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	 
	 $scope.sellerapply = function ()
	 {
		 
		 
		$scope.error= '';
	
	    if($scope.sellerapplication.user == null || $scope.sellerapplication.event == null )
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		
		 
		 $http.post('/hackathon/applyseller', $scope.sellerapplication).then(function(response) {
	  
		
		$scope.sellerapplication = {};
		$scope.sellerapp = {};
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	 
   })
   
      .controller('LoginRegistrationCtrl', function($scope, $http) {
	   
	   $scope.login = {
		 username: '',
		 password:''
	   };
	 
	  $scope.register = {
		 username: '',
		 password:'',
		 verify:''
	   };
	   
	   $scope.loggedin = false;
	   
	   
	 
	 $scope.login1 = function() 
	 {
      $http.post('/login', $scope.login).then(function(response) {
	  

		$scope.loggedin = true;
		
      }, function(errResponse) {
		

		$scope.loggedin = false;
        console.error('Error while fetching notes');
      
	  });
	 }
	 
	 $scope.logout = function() 
	 {
      $http.get('/logout').then(function(response) {
	  

		$scope.loggedin = false;
		
      }, function(errResponse) {
		


        console.error('Error while fetching notes');
      
	  });
	 }
	 
	 $scope.register1 = function() 
	 {
      $http.post('/signup', $scope.register).then(function(response) {
	  
        //$scope.username = response.data.username;
		
      }, function(errResponse) {
		  
        console.error('Error while fetching notes');
      
	  });
	 }
	 
	   
   })

   

   .controller('BuyerRegistrationCtrl', function($scope, $http) {
     
	$scope.buyer={
		 name : '',
		 network:'testnet' ,
		 resaddress:'',
		 selection:'',
		 buyerterms:''
	 };
	 	 
		 $scope.events=[];
		 
		 $scope.buyerapplication = {
		  user: {},
			event:{},
			buyerterms:''
		 };
	 $scope.buyerapp = {
		name:'',
		event:'',
		buyerterms:''
	 };
	 $scope.owners = [];
	 
	 $scope.buyer = {
		 name:'',
		 phoneNumber:'',
		 aadharNumber:''
	 };
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listevents();
	 
	 $scope.$watch(
                    'buyer.selection',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0)
							$scope.buyer.buyerterms = $scope.events[count].buyerterms;
						}
						
						
						
                    }
                );
	 $scope.$watch(
                    'buyerapp.event',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0) {
								//alert(angular.toJson($scope.events, 1));
							  $scope.buyerapp.buyerterms = $scope.events[count].buyerterms;
						  $scope.buyerapplication.buyerterms = $scope.events[count].buyerterms;
						  $scope.buyerapplication.event = $scope.events[count];
							}
						}
						
						
						
                    }
                );
				
	$scope.$watch(
                    'buyerapp.name',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.owners != 'undefined' && $scope.owners.length > 0){
							  
						  $scope.buyerapplication.user = $scope.owners[count];
							}
						}
						
						
						
                    }
                );
				
	 $scope.listowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listbuyerowners').then(function(response) {
	  
		$scope.owners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listowners();

	 
	 $scope.createbuyer = function ()
	 {
		 $scope.error= '';
	
		if($scope.buyer.name == '' || $scope.buyer.phoneNumber == '' || $scope.buyer.aadharNumber == '' )
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		 
		 $http.post('/hackathon/createbuyer', $scope.buyer).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.buyer = {};
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	 
	 
	 $scope.buyerapply = function ()
	 {
		 
		 
		$scope.error= '';
	
	    if($scope.buyerapplication.user == null || $scope.buyerapplication.event == null )
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		
		 
		 $http.post('/hackathon/applybuyer', $scope.buyerapplication).then(function(response) {
	  
	    
		$scope.buyerapplication = {};
		$scope.buyerapp = {};
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	 
   })

    .controller('AssetRegistrationCtrl', function($scope, $http) {
		
		$scope.assets = [];
		
		$scope.asset = {
			network:'testnet',
			title: '',
			assetnumber: '',
			description:'',
			ownerid: '',
			ownername:''
		};
		 $scope.owners=[];
		 
		 $scope.owner = {
			 id: '',
			 selection:'',
			 network:'',
			 ownername:''
		 };
		 
		 $scope.assetapplication = {
		  user: {},
			event:{},
			asset:{}
		 };
	 $scope.assetapp = {
		title:'',
		event:'',
		name:''
	 };
	 
	 $scope.asseterror = '';
	 $scope.selectedassets = [];
	$scope.events = [];	 
		 
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listevents();
	 
	 
	 $scope.listowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listsellerowners').then(function(response) {
	  
		$scope.owners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listowners();
	 
	 $scope.$watch(
                    'owner.selection',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.owners[count] != null){
							$scope.owner.id = $scope.owners[count]._id;
								$scope.owner.ownername = $scope.owners[count].record.name;
						
							}
							
						}
						
						
						
                    }
                );
	 
      
$scope.createasset = function ()
	 {
		 $scope.error= '';
	$scope.asseterror = '';
	$scope.asset.ownerid = $scope.owner.id;
	$scope.asset.ownername = $scope.owner.ownername;
	
		if($scope.asset.title == '' || $scope.asset.assetnumber == '' || $scope.asset.ownerid == '')
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		 
		 
		 $http.post('/hackathon/createasset', $scope.asset).then(function(response) {
	  
		if(response.data.code > 0){
			$scope.asseterror = angular.toJson(response.data, 1);
		}
		$scope.asset = {};
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }	

   $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.post('/hackathon/gettestnetassets', obj).then(function(response) {
		
		$scope.assets = response.data;
		$scope.selectedassets = [];
		for(var i = 0; i< $scope.assets.length; i++){
		var x = $scope.assets[i];
		if(x.assetId != null)
		$scope.selectedassets.push(x);	
		}
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 function update_transaction(obj, retdata)
	 {
		 var data ={
			 assetId: obj.assetId,
			 txid : retdata.txid
		 } ;
		 $http.post('/hackathon/updatetx', data).then(function(response) {
		
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	  
	 }
	 
	 $scope.commitasset = function (obj)
	 {
		
		 
		 $http.post('/hackathon/signasset', obj).then(function(response) {
		
		// update_transaction(obj, response.data);
		//$scope.assets = response.data;
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
	 
	 $scope.$watch(
                    'assetapp.title',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.selectedassets != 'undefined' 
								&& $scope.selectedassets.length > 0) {
								//alert(angular.toJson($scope.events, 1));
							  $scope.assetapplication.asset = $scope.selectedassets[count];
						  
							   var owneraddress = $scope.assetapplication.asset.asset.asset.issueAddress;
							   for(var i =0;i< $scope.owners.length ; i++){
								   if($scope.owners[i].record.testnet.address == owneraddress)
								   {
									    $scope.assetapplication.user = $scope.owners[i];
									   break;
								   }
							   }
						  		 
							}
						}
						
						
						
                    }
                );
	
	 
	 $scope.$watch(
                    'assetapp.event',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0) {
								//alert(angular.toJson($scope.events, 1));
						
						  $scope.assetapplication.event = $scope.events[count];
							}
						}
						
						
						
                    }
                );
				
	$scope.$watch(
                    'assetapp.name',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.owners.length > 0){
							  
						  // $scope.assetapplication.user = $scope.owners[count];
							}
						}
						
						
						
                    }
                );
		
		
	 
	 $scope.assetapply = function ()
	 {
		 
		 
		$scope.error= '';
	
	    if($scope.assetapplication.user == null || $scope.assetapplication.event == null || $scope.assetapplication.asset == null)
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		
		 
		 $http.post('/hackathon/applyasset', $scope.assetapplication).then(function(response) {
	  
		
		$scope.assetapplication = {};
		$scope.assetapp = {};
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	 
	 
	 
   })
   
 .controller('EventRegistrationCtrl', function($scope, $http) {
	 
	 
	
	 
	 $scope.username= '';
	 $scope.address= '';
	 $scope.publickey= '';
	 $scope.privatekey= '';
	 
	 $scope.event={
		 title : '',
		 network:'testnet' ,
		 description:'',
		 buyerterms:'',
		 sellerterms:''
	 };
	 
	 
	 $scope.createevent = function ()
	 {
		 $scope.error= '';
	
		if($scope.event.title == '' || $scope.event.description == '')
		{
			$scope.error= 'Enter data in fields';
			return;
		}
		 
		 $http.post('/hackathon/createevent', $scope.event).then(function(response) {
	  
		//$scope.testnet = response.data.testnet;
		$scope.event = {};
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	 
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listevents();
       
   })
   
   
 .controller('SellerpanelCtrl', function($scope, $http) {
	 
	$scope.sellerowners = [];
	$scope.buyerowners = [];
	$scope.assets = [];
	$scope.selectedassets = [];
	
	$scope.events = [];	 
		 
		 
		 $scope.assetapplication = {
		  user: {},
			event:{},
			asset:{},
			price:''
		 };
		 
	 $scope.assetapp = {
		title:'',
		event:'',
		buyername:'',
		sellername:''
	 };
	 
	 $scope.eventaddress ='';
	 
  $scope.escrowobject = {};
	   $scope.bodytosend = {
		eventaddress: '',
			buyeraddress:'',
			
			eventname: '',
			buyername: '',
			minsellersneeded: '',
			buyerprice:''
			
	   };
	
      $scope.chartdata = [];	

	 
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.setdefaultuserandevent = function()
	 {
	
	  $scope.chartdata = [];
		for(var i = 0; i< $scope.escrow.length; i++){
							  if( $scope.escrow[i].eventaddress != null && $scope.escrow[i].assets.length >0  )
							  {
								  $scope.eventaddress = $scope.escrow[i].eventaddress;
							$scope.assets = $scope.escrow[i].assets;
						  $scope.buyers = $scope.escrow[i].buyers;
						  $scope.escrowobject = $scope.escrow[i];	  
								break;  
							  }
							  
						  }
						  
						    
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
			
						  
						  
						  
						  
	
	 }
	 
	 $scope.listevents();

	 $scope.listsellerowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listsellerowners').then(function(response) {
	  
		$scope.sellerowners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listsellerowners();
	
	
$scope.listbuyerowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listbuyerowners').then(function(response) {
	  
		$scope.buyerowners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listbuyerowners();
	 
	 
	 $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.post('/hackathon/gettestnetassets', obj).then(function(response) {
		
		$scope.assets = response.data;
		$scope.selectedassets = [];
		for(var i = 0; i< $scope.assets.length; i++){
		var x = $scope.assets[i];
		if(x.assetId != null)
		$scope.selectedassets.push(x);	
		}
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 $scope.$watch(
                    'assetapp.title',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.selectedassets.length > 0) {
								//alert(angular.toJson($scope.events, 1));
							  $scope.assetapplication.asset = $scope.selectedassets[count];
						  
							}
						}
						
						
						
                    }
                );
	
	 
				
	$scope.$watch(
                    'assetapp.sellername',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.sellerowners.length > 0){
							  
						  $scope.assetapplication.user = $scope.sellerowners[count];
							}
						}
						
						
						
                    }
                );
	
	
	 $scope.$watch(
                    'assetapp.event',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0) {
								
						
						  $scope.assetapplication.event = $scope.events[count];
			//			  alert(angular.toJson($scope.assetapplication.event, 1));
						   $scope.eventaddress =  $scope.assetapplication.event.event.testnet.address;
						  
						  for(var i = 0; i< $scope.escrow.length; i++){
							  if($scope.eventaddress == $scope.escrow[i].eventaddress)
							  {
							$scope.assets = $scope.escrow[i].assets;
						  $scope.buyers = $scope.escrow[i].buyers;
						  $scope.escrowobject = $scope.escrow[i];	  
								break;  
							  }
							  
						  }
						  
						    
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
			
						  
						  
						  
							}
						}
						
						
						
                    }
                );
	
	 $scope.sellerpriceset = function ()
	 {
		 
		 
		 $scope.sellermessage ='';
		$scope.error= '';
	
	    if($scope.assetapplication == 'undefined' || $scope.assetapplication == null 
		|| $scope.assetapplication.user == 'undefined' || $scope.assetapplication.user == null
		|| $scope.assetapplication.event == 'undefined' || $scope.assetapplication.event == null
		|| $scope.assetapplication.asset == 'undefined' || $scope.assetapplication.asset == null
		|| $scope.assetapplication.price == "" || $scope.assetapplication.price == null  )
		
		{
			$scope.error= 'Enter data in fields correctly';
			 alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		 
		$scope.error= '';
	
	    
		
		 
		 $http.post('/hackathon/sellerpriceset', $scope.assetapplication).then(function(response) {
	  
		if(response.data.error){
			$scope.buyermessage = response.data.error;
			
		}
			$scope.getuserassets();
		$scope.redrawchart();
	
		
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	
	
	
	$scope.buyerpriceset = function ()
	 {
		 
		 $scope.buyermessage ='';
		$scope.error= '';
	
	    if($scope.assetapplication == 'undefined' || $scope.assetapplication == null 
		|| $scope.assetapplication.user == 'undefined' || $scope.assetapplication.user == null
		|| $scope.assetapplication.event == 'undefined' || $scope.assetapplication.event == null
		|| $scope.assetapplication.price == "" || $scope.assetapplication.price == null  )
		
		{
			$scope.error= 'Enter data in fields correctly';
			// alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		
		 
		 $http.post('/hackathon/buyerpriceset', $scope.assetapplication).then(function(response) {
	  
		if(response.data.error){
			$scope.buyermessage = response.data.error;
			
		}
		
		$scope.getuserassets();
		$scope.redrawchart();
		/*
		$scope.assetapplication.price = '';
		$scope.assetapplication.user = {};
		$scope.assetapplication.event = {};
		
		$scope.assetapp.title = '';
		$scope.assetapp.event = '';
		$scope.assetapp.name = '';
		$scope.assetapp.buyername = ''; */
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	$scope.redrawchart = function()
	{
		$scope.chartdata = [];
		for(var i = 0; i< $scope.escrow.length; i++){
							  if($scope.eventaddress == $scope.escrow[i].eventaddress)
							  {
							$scope.assets = $scope.escrow[i].assets;
						  $scope.buyers = $scope.escrow[i].buyers;
						  $scope.escrowobject = $scope.escrow[i];	  
								break;  
							  }
							  
						  }
						  
						    
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
			
						  
						  
						  
						  
	}
	$scope.getchartdata = function (buyerobj)
	{
		var bodytosend = {
		eventaddress: '',
			buyeraddress:'',
			
			eventname: '',
			buyername: '',
			minsellersneeded: '',
			buyerprice:''
			
	   };
				bodytosend.eventaddress = $scope.bodytosend.eventaddress ;
				bodytosend.eventname = $scope.bodytosend.eventname;
				bodytosend.minsellersneeded = $scope.bodytosend.minsellersneeded ;
								
		bodytosend.buyername = buyerobj.username;
		bodytosend.buyerprice = buyerobj.price;
		bodytosend.buyeraddress = buyerobj.useraddress;
		
		
		
		 $http.post('/hackathon/getcharts', bodytosend).then(function(response) {
		var chart = response.data;
		
		var category ={
			categorylabels:[],
			categorydata1:[],
			buyerprice: bodytosend.buyerprice,
			buyername: bodytosend.buyername
		};
  

		
			
			category.categorydata1.push(chart.policydemand);
			category.categorydata1.push(chart.matchingsellers);
			category.categorydata1.push(chart.totalsellers-chart.matchingsellers);
			
			category.categorylabels.push('% Policy limit');
			category.categorylabels.push('% Sellers agreeing at price');
			category.categorylabels.push('% Sellers refusing at price' + $scope.bodytosend.buyerprice);
			
			$scope.chartdata.push(category);
				
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	  
	
	}



	   $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/getescrowlist', obj).then(function(response) {
		
		$scope.escrow = response.data;
	//	$scope.assets = $scope.escrow[0].assets;
	//	$scope.buyers = $scope.escrow[0].buyers;
	
		$scope.setdefaultuserandevent ();	
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 
	 
  
  
  
  
	
       
   })
 
	
	
	
   
 .controller('BuyerpanelCtrl', function($scope, $http) {
	 
	$scope.sellerowners = [];
	$scope.buyerowners = [];
	$scope.assets = [];
	$scope.selectedassets = [];
	
	$scope.events = [];	 
		 
		 
		 $scope.assetapplication = {
		  user: {},
			event:{},
			asset:{},
			price:''
		 };
		 
	 $scope.assetapp = {
		title:'',
		event:'',
		buyername:'',
		sellername:''
	 };
	 
	 $scope.eventaddress ='';
	 
  $scope.escrowobject = {};
	   $scope.bodytosend = {
		eventaddress: '',
			buyeraddress:'',
			
			eventname: '',
			buyername: '',
			minsellersneeded: '',
			buyerprice:''
			
	   };
	
      $scope.chartdata = [];	

	 
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 
	 $scope.setdefaultuserandevent = function()
	 {
	
	  $scope.chartdata = [];
		for(var i = 0; i< $scope.escrow.length; i++){
							  if( $scope.escrow[i].eventaddress != null && $scope.escrow[i].assets.length >0  )
							  {
								  $scope.eventaddress = $scope.escrow[i].eventaddress;
							$scope.assets = $scope.escrow[i].assets;
						  $scope.buyers = $scope.escrow[i].buyers;
						  $scope.escrowobject = $scope.escrow[i];	  
								break;  
							  }
							  
						  }
						  
						    
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
			
						  
						  
						  
						  
	
	 }
	 
	 $scope.listevents();

$scope.listbuyerowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listbuyerowners').then(function(response) {
	  
		$scope.buyerowners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listbuyerowners();
	 
	 $scope.$watch(
                    'assetapp.event',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0) {
								
						
						  $scope.assetapplication.event = $scope.events[count];
			//			  alert(angular.toJson($scope.assetapplication.event, 1));
						   $scope.eventaddress =  $scope.assetapplication.event.event.testnet.address;
						  
						  for(var i = 0; i< $scope.escrow.length; i++){
							  if($scope.eventaddress == $scope.escrow[i].eventaddress)
							  {
							$scope.assets = $scope.escrow[i].assets;
						  $scope.buyers = $scope.escrow[i].buyers;
						  $scope.escrowobject = $scope.escrow[i];	  
								break;  
							  }
							  
						  }
						  
						    
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
			
						  
						  
						  
							}
						}
						
						
						
                    }
                );
	
	$scope.$watch(
                    'assetapp.buyername',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.buyerowners.length > 0){
							  
						  $scope.assetapplication.user = $scope.buyerowners[count];
							}
						}
						
						
						
                    }
                );
	
	$scope.buyerpriceset = function ()
	 {
		 
		 $scope.buyermessage ='';
		$scope.error= '';
	
	    if($scope.assetapplication == 'undefined' || $scope.assetapplication == null 
		|| $scope.assetapplication.user == 'undefined' || $scope.assetapplication.user == null
		|| $scope.assetapplication.event == 'undefined' || $scope.assetapplication.event == null
		|| $scope.assetapplication.price == "" || $scope.assetapplication.price == null  )
		
		{
			$scope.error= 'Enter data in fields correctly';
			// alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		
		 
		 $http.post('/hackathon/buyerpriceset', $scope.assetapplication).then(function(response) {
	  
		if(response.data.error){
			$scope.buyermessage = response.data.error;
			
		}
		
		$scope.getuserassets();
		$scope.redrawchart();
		/*
		$scope.assetapplication.price = '';
		$scope.assetapplication.user = {};
		$scope.assetapplication.event = {};
		
		$scope.assetapp.title = '';
		$scope.assetapp.event = '';
		$scope.assetapp.name = '';
		$scope.assetapp.buyername = ''; */
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	$scope.redrawchart = function()
	{
		$scope.chartdata = [];
		for(var i = 0; i< $scope.escrow.length; i++){
							  if($scope.eventaddress == $scope.escrow[i].eventaddress)
							  {
							$scope.assets = $scope.escrow[i].assets;
						  $scope.buyers = $scope.escrow[i].buyers;
						  $scope.escrowobject = $scope.escrow[i];	  
								break;  
							  }
							  
						  }
						  
						    
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
			
						  
						  
						  
						  
	}
	$scope.getchartdata = function (buyerobj)
	{
		var bodytosend = {
		eventaddress: '',
			buyeraddress:'',
			
			eventname: '',
			buyername: '',
			minsellersneeded: '',
			buyerprice:''
			
	   };
				bodytosend.eventaddress = $scope.bodytosend.eventaddress ;
				bodytosend.eventname = $scope.bodytosend.eventname;
				bodytosend.minsellersneeded = $scope.bodytosend.minsellersneeded ;
								
		bodytosend.buyername = buyerobj.username;
		bodytosend.buyerprice = buyerobj.price;
		bodytosend.buyeraddress = buyerobj.useraddress;
		
		
		
		 $http.post('/hackathon/getcharts', bodytosend).then(function(response) {
		var chart = response.data;
		
		var category ={
			categorylabels:[],
			categorydata1:[],
			buyerprice: bodytosend.buyerprice,
			buyername: bodytosend.buyername
		};
  

		
			
			category.categorydata1.push(chart.policydemand);
			category.categorydata1.push(chart.matchingsellers);
			category.categorydata1.push(chart.totalsellers-chart.matchingsellers);
			
			category.categorylabels.push('% Policy limit');
			category.categorylabels.push('% Sellers agreeing at price');
			category.categorylabels.push('% Sellers refusing at price' + $scope.bodytosend.buyerprice);
			
			$scope.chartdata.push(category);
				
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	  
	
	}



	   $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/getescrowlist', obj).then(function(response) {
		
		$scope.escrow = response.data;
	//	$scope.assets = $scope.escrow[0].assets;
	//	$scope.buyers = $scope.escrow[0].buyers;
	
		$scope.setdefaultuserandevent ();	
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 
	 
  
  
  
  
	
       
   })
 
	
	
	 
	 
	 


	 
   
 .controller('AssetPriceCtrl', function($scope, $http) {
	 
	$scope.sellerowners = [];
	$scope.buyerowners = [];
	$scope.assets = [];
	$scope.selectedassets = [];
	
	$scope.events = [];	 
		 
		 
		 $scope.assetapplication = {
		  user: {},
			event:{},
			asset:{},
			price:''
		 };
		 
	 $scope.assetapp = {
		title:'',
		event:'',
		buyername:'',
		sellername:''
	 };
	 
	 
	 $scope.listevents = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listevents').then(function(response) {
	  
		$scope.events = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listevents();
	 
	$scope.listsellerowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listsellerowners').then(function(response) {
	  
		$scope.sellerowners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listsellerowners();
	 
	 $scope.listbuyerowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listbuyerowners').then(function(response) {
	  
		$scope.buyerowners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listbuyerowners();
	 
	 $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.post('/hackathon/gettestnetassets', obj).then(function(response) {
		
		$scope.assets = response.data;
		$scope.selectedassets = [];
		for(var i = 0; i< $scope.assets.length; i++){
		var x = $scope.assets[i];
		if(x.assetId != null)
		$scope.selectedassets.push(x);	
		}
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 $scope.$watch(
                    'assetapp.title',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.selectedassets.length > 0) {
								//alert(angular.toJson($scope.events, 1));
							  $scope.assetapplication.asset = $scope.selectedassets[count];
						  
							}
						}
						
						
						
                    }
                );
	
	 
	 $scope.$watch(
                    'assetapp.event',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.events.length > 0) {
								//alert(angular.toJson($scope.events, 1));
						
						  $scope.assetapplication.event = $scope.events[count];
							}
						}
						
						
						
                    }
                );
				
	$scope.$watch(
                    'assetapp.sellername',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.sellerowners.length > 0){
							  
						  $scope.assetapplication.user = $scope.sellerowners[count];
							}
						}
						
						
						
                    }
                );
	
	$scope.$watch(
                    'assetapp.buyername',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.buyerowners.length > 0){
							  
						  $scope.assetapplication.user = $scope.buyerowners[count];
							}
						}
						
						
						
                    }
                );
	
	// user is selected (from owners). 
	// event is selected from list.
	// Then list of assets in escrow is seen for this user and event. Then
	// returned for setting price.
	
	// when price is set for that asset, event. It is updated for that asset.

	 $scope.sellerpriceset = function ()
	 {
		 
		 
		 $scope.sellermessage ='';
		$scope.error= '';
	
	    if($scope.assetapplication == 'undefined' || $scope.assetapplication == null 
		|| $scope.assetapplication.user == 'undefined' || $scope.assetapplication.user == null
		|| $scope.assetapplication.event == 'undefined' || $scope.assetapplication.event == null
		|| $scope.assetapplication.asset == 'undefined' || $scope.assetapplication.asset == null
		|| $scope.assetapplication.price == "" || $scope.assetapplication.price == null  )
		
		{
			$scope.error= 'Enter data in fields correctly';
			 alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		 
		$scope.error= '';
	
	    
		
		 
		 $http.post('/hackathon/sellerpriceset', $scope.assetapplication).then(function(response) {
	  
		if(response.data.error){
			$scope.buyermessage = response.data.error;
			
		}
		$scope.assetapplication.price = '';
		$scope.assetapplication.user = {};
		$scope.assetapplication.event = {};
		
		$scope.assetapp.title = '';
		$scope.assetapp.event = '';
		$scope.assetapp.sellername = '';
		$scope.assetapp.buyername = '';
		
		
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	
	$scope.buyerpriceset = function ()
	 {
		 
		 $scope.buyermessage ='';
		$scope.error= '';
	
	    if($scope.assetapplication == 'undefined' || $scope.assetapplication == null 
		|| $scope.assetapplication.user == 'undefined' || $scope.assetapplication.user == null
		|| $scope.assetapplication.event == 'undefined' || $scope.assetapplication.event == null
		|| $scope.assetapplication.price == "" || $scope.assetapplication.price == null  )
		
		{
			$scope.error= 'Enter data in fields correctly';
			// alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		
		 
		 $http.post('/hackathon/buyerpriceset', $scope.assetapplication).then(function(response) {
	  
		if(response.data.error){
			$scope.buyermessage = response.data.error;
			
		}
		
		
		$scope.assetapplication.price = '';
		$scope.assetapplication.user = {};
		$scope.assetapplication.event = {};
		
		$scope.assetapp.title = '';
		$scope.assetapp.event = '';
		$scope.assetapp.name = '';
		$scope.assetapp.buyername = '';
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	
       
   })
 
 
 
 
 
.controller('TableCtrl', function($scope, $http) {
	$scope.table ={
		name:'',
		operation:''
	};
	
	$scope.tableoutput ={
		contents:''
		
	};
	$scope.tableinput ={
		names:['escrow','events'],
		operations: ['list', 'clear']
	};
	
	$scope.tableoperate = function ()
	 {
		 
		 $scope.buyermessage ='';
		$scope.error= '';
	
	    if($scope.table == 'undefined' || $scope.table == null 
		|| $scope.table.name == 'undefined' || $scope.table.name == null
		|| $scope.table.operation == 'undefined' || $scope.table.operation == null
		)
		
		{
			$scope.error= 'Enter data in fields correctly';
			// alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		
		 
		 $http.post('/hackathon/tableoperate', $scope.table).then(function(response) {
	  
		
		
		$scope.tableoutput.contents = angular.toJson(response.data, true);
		
		
		$scope.table.operation = '';
		$scope.table.name = '';
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	 }
	
	
       
   }) 
   
   
   
  .controller('MapTradeCtrl', function($scope, $http) {
	  
	  $scope.assets = [];
	  $scope.buyers = [];
	  $scope.escrow = [];
	  $scope.selectedassets = [];
	  $scope.events = [];
	  $scope.selectedevent = '';
       
	   $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/getescrowlist', obj).then(function(response) {
		
		$scope.escrow = response.data;
	//	$scope.assets = $scope.escrow[0].assets;
	//	$scope.buyers = $scope.escrow[0].buyers;
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 
	 $scope.$watch(
                    'selectedevent',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.escrow.length > 0) {
								//alert(angular.toJson($scope.events, 1));
						
						  $scope.assets = $scope.escrow[count].assets;
						  $scope.buyers = $scope.escrow[count].buyers;
							}
						}
						
						
						
                    }
                );
	   
   })
  
  
  .controller('ChartsCtrl', function($scope, $http) {
	  
	  $scope.assets = [];
	  $scope.buyers = [];
	  $scope.escrow = [];
	  $scope.selectedassets = [];
	  $scope.events = [];
	  $scope.selectedevent = '';
      $scope.escrowobject = {};
	   $scope.bodytosend = {
		eventaddress: '',
			buyeraddress:'',
			
			eventname: '',
			buyername: '',
			minsellersneeded: '',
			buyerprice:''
			
	   };
	
      $scope.chartdata = [];	
	   $scope.getuserassets = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/getescrowlist', obj).then(function(response) {
		
		$scope.escrow = response.data;
	//	$scope.assets = $scope.escrow[0].assets;
	//	$scope.buyers = $scope.escrow[0].buyers;
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 $scope.getuserassets();
	 
	 
	 $scope.$watch(
                    'selectedevent',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.escrow.length > 0) {
								//alert(angular.toJson($scope.events, 1));
						
						  $scope.assets = $scope.escrow[count].assets;
						  $scope.buyers = $scope.escrow[count].buyers;
						  $scope.escrowobject = $scope.escrow[count];
						 
								$scope.bodytosend.eventaddress = $scope.escrowobject.eventaddress;
								$scope.bodytosend.eventname = $scope.escrowobject.escrowdata.title;
								$scope.bodytosend.minsellersneeded = $scope.escrowobject.policy.minsellersneeded;
								for(var i =0; i< $scope.buyers.length; i++){
									$scope.getchartdata($scope.buyers[i]);
								}
			
							}
						}
						
						
						
                    }
                );
	
  
  
  

	$scope.getchartdata = function (buyerobj)
	{
		var bodytosend = {
		eventaddress: '',
			buyeraddress:'',
			
			eventname: '',
			buyername: '',
			minsellersneeded: '',
			buyerprice:''
			
	   };
				bodytosend.eventaddress = $scope.bodytosend.eventaddress ;
				bodytosend.eventname = $scope.bodytosend.eventname;
				bodytosend.minsellersneeded = $scope.bodytosend.minsellersneeded ;
								
		bodytosend.buyername = buyerobj.username;
		bodytosend.buyerprice = buyerobj.price;
		bodytosend.buyeraddress = buyerobj.useraddress;
		
		
		
		 $http.post('/hackathon/getcharts', bodytosend).then(function(response) {
		var chart = response.data;
		
		var category ={
			categorylabels:[],
			categorydata1:[],
			buyerprice: bodytosend.buyerprice,
			buyername: bodytosend.buyername
		};
  

		
			
			category.categorydata1.push(chart.policydemand);
			category.categorydata1.push(chart.matchingsellers);
			category.categorydata1.push(chart.totalsellers-chart.matchingsellers);
			
			category.categorylabels.push('% Policy limit');
			category.categorylabels.push('% Sellers agreeing at price');
			category.categorylabels.push('% Sellers refusing at price' + $scope.bodytosend.buyerprice);
			
			$scope.chartdata.push(category);
				
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	  
			
	}

	
	$scope.getchart = function (buyerobj)
	{
		$scope.bodytosend.buyername = buyerobj.username;
		$scope.bodytosend.buyerprice = buyerobj.price;
		$scope.bodytosend.buyeraddress = buyerobj.useraddress;
		
		$scope.chart = {};
		 $http.post('/hackathon/getcharts', $scope.bodytosend).then(function(response) {
		
		$scope.chart = response.data;
		
  $scope.categorylabels =[];
  $scope.categorydata1 = [];
  $scope.categorydata2 = [];

		
			
			$scope.categorydata1.push($scope.chart.policydemand);
			$scope.categorydata1.push($scope.chart.matchingsellers);
			$scope.categorydata1.push($scope.chart.totalsellers-$scope.chart.matchingsellers);
			
			$scope.categorylabels.push('Policy');
			$scope.categorylabels.push('Sellers agreeing');
			$scope.categorylabels.push('Gap at price' + $scope.bodytosend.buyerprice);
				
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	  
			
	}
	   
   })
  
  
  .controller('GovtEventCtrl', function($scope, $http) 
  {
       
	   
	  
	  
	  $scope.policy = {
		  eventaddress: '',
		  minsellersneeded: '' // Percentage of approval
		  
	  };
	  $scope.selectedassets = [];
	  $scope.events = [];
	  $scope.selectedevent = '';
	  $scope.escrow = [];
       
	   $scope.getescrowlist = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/getescrowlist', obj).then(function(response) {
		
		$scope.escrow = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 
	 
	 $scope.getescrowlist();
	 
	 
	 $scope.$watch(
                    'selectedevent',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 &&  $scope.escrow.length > 0) {
								//alert(angular.toJson($scope.events, 1));
						
						  $scope.policy.eventaddress = $scope.escrow[count].eventaddress;
						  
							}
						}
						
						
						
                    }
                );
				
				
	  $scope.setpolicyrates = function()
	  {
		  
		 $scope.policymessage ='';
		$scope.error= '';
	
	    if($scope.policy == 'undefined' || $scope.policy == null 
		|| $scope.policy.eventaddress == 'undefined' || $scope.policy.eventaddress == null
		|| $scope.policy.minsellersneeded == 'undefined' || $scope.policy.minsellersneeded == null)
		{
			$scope.error= 'Enter data in fields correctly';
			// alert(angular.toJson($scope.assetapplication, true));
			return;
		}
		  
		 
		 $http.post('/hackathon/setpolicyrate', $scope.policy).then(function(response) {
	  
		if(response.data.error){
			$scope.policymessage = response.data.error;
			
		}
		
		
		
		$scope.policy.eventaddress = '';
		$scope.policy.minsellersneeded = '';
		
		
      }, function(errResponse) {
		  $scope.error= 'error';
        
      
	  });
	  
	  }
   
   
   })
   
   
  .controller('BlockAssetsCtrl', function($scope, $http) 
  {
       
	   
	  
	  
	  $scope.eventholder = {
		  eventaddress: '',
		  minsellersneeded: '' // Percentage of approval
		  
	  };
	  $scope.selectedassets = [];
	  $scope.events = [];
	  $scope.selectedevent = '';
	  $scope.escrow = [];
	  
	  $scope.utxosaddressinfo = [];
	  $scope.owners = [];
	  $scope.sellerapp = {
		  name:'',
		  address:''
	  };
       
	   $scope.getescrowlist = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 $http.get('/hackathon/getescrowlist', obj).then(function(response) {
		
		$scope.escrow = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }	 
	 
	 
	 
	 $scope.getescrowlist();
	 
	 
	 $scope.$watch(
                    'selectedevent',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 &&  $scope.escrow.length > 0) {
								//alert(angular.toJson($scope.events, 1));
						
						  $scope.eventholder.eventaddress = $scope.escrow[count].eventaddress;
						  
							}
						}
						
						
						
                    }
                );
				
	  
	  $scope.getaddressinfo = function() {
		  var obj = {
			  address : $scope.eventholder.eventaddress
		  };
		  
	  $http.post('/hackathon/getaddressbalance', obj).then(function(response) {
	  
	 
        
		var pretty = true;
		$scope.utxosaddressinfo = response.data.utxos;
		
		$scope.listaddressinfo = angular.toJson(response.data, pretty);
		
		
		
		
		
      }, function(errResponse) {
		  // angular.toJson(errResponse)
        console.error('Error while fetching notes');
      
	  });
	  }
	  
	  $scope.getassetdetail2 = function(someUtxo, assetId)
	 {
		 var myassets ={
			someUtxo : someUtxo+":0",
			assetId: assetId
		 };
		 
		$http.post('/hackathon/getassetdetail', myassets).then(function(response) {
		
		
		
		var pretty = true;
		
		$scope.assetsmeta = angular.toJson(response.data, pretty);
		
		
      }, function(errResponse) {
		  $scope.error= 'error getting key';
        
      
	  });
	 }
	 $scope.getselleraddressinfo = function() {
		  var obj = {
			  address : $scope.sellerapp.address
		  };
		  
	  $http.post('/hackathon/getaddressbalance', obj).then(function(response) {
	  
	 
        
		var pretty = true;
		$scope.utxosaddressinfo = response.data.utxos;
		
		$scope.listaddressinfo = angular.toJson(response.data, pretty);
		
		
		
		
		
      }, function(errResponse) {
		  // angular.toJson(errResponse)
        console.error('Error while fetching notes');
      
	  });
	  }
	  
	 $scope.listowners = function ()
	 {
		 var obj = {
			network:'testnet' 
		 };
		 
		 
		 $http.get('/hackathon/listsellerowners').then(function(response) {
	  
		$scope.owners = response.data;
		
		
      }, function(errResponse) {
		  $scope.error= 'error creating key';
        
      
	  });
	 }
	 $scope.listowners();
	 
	 $scope.$watch(
                    'sellerapp.name',
                    function handleFooChange( newValue, oldValue ) {
						if(newValue != 'undefined' && newValue != null && newValue != ' '){
							var res = newValue.split('-');
							
							var count = res[0];
							if(isNaN(count) == false && count >= 0 && $scope.owners.length > 0){
							  
						  $scope.sellerapp.address = $scope.owners[count].record.testnet.address;
							}
						}
						
						
						
                    }
                );
	
	  
   
   
   })
   

     
;
   
	
