angular.module('myapp.controllers1', ["ngTable"])


.controller('DiscounterCtrl', function($scope, $http, NgTableParams ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});


})

.controller('AgentCtrl', function($scope, $http, NgTableParams ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});


})


.controller('ReceiverCtrl', function($scope, $http, NgTableParams ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});


})

.controller('IssuerCtrl', function($scope, $http, NgTableParams ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});


})




;


   
	
