angular.module('myapp.services', [])


		
.factory('VisualappService', function($http) {
            var result = [];
			var account = {
				username:""
			};

			var url = "";
            return {
				
                 
				 getsaleslist: function() {
				
   var url = '../visual/getorderby/sales'		;		
                     return $http.get(url);
                 },
				 getsalesbycustomersegment: function() {
				
   var url = '../visual/getorderby/customersegment'		;		
                     return $http.get(url);
                 },
				 getsalesproductbymonth:function() {
				
   //var url = 'http://localhost:8888/visual/getorderby/sales_permonth_percategory'		;		
   var url = '../visual/getorderby/sales_permonth_percategory'		;		
                     return $http.get(url);
                 },
				 
				  getsalesbycustomername: function() {
				
   //var url = 'http://localhost:8888/visual/getorderby/customername'		;		
   var url = '../visual/getorderby/customername'		;		
                     return $http.get(url);
                 },
				getsalesbyproductcategory: function() {
				
   var url = '../visual/getorderby/productcategory'		;		
                     return $http.get(url);
                 },
				 
				 
				 
				 
            };  
        });
		

        
		
		
