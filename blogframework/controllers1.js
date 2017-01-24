angular.module('myapp.controllers1', ["ngTable", "textAngular", "ngFileUpload", "angularSimplePagination"])
.config(function($provide) {
                // this demonstrates how to register a new tool and add it to the default toolbar
                $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
                    taRegisterTool('test', {
                        buttontext: 'Test',
                        action: function() {
                            alert('Test Pressed')
                        }
                    });
					
                    // add the button to the default toolbar definition
	/*				taOptions.toolbar = [
      [ 'a', 'h3', 'h4', 'p'],
      ['bold', 'italics', 'underline',  'ul', 'ol'],
      ['indent', 'outdent'],
      []
  ];
 
 */
											
  //                  taOptions.toolbar[1].push('colourRed');
                    return taOptions;
                }]);
											
											$provide.decorator('taTools', ['$delegate', function(taTools){
											taTools.bold.iconclass = 'icon-bold';
											taTools.italics.iconclass = 'icon-italic';
											taTools.underline.iconclass = 'icon-underline';
											taTools.ul.iconclass = 'icon-list-ul';
											taTools.ol.iconclass = 'icon-list-ol';
											taTools.insertLink.iconclass = 'icon-link';
										/*	taTools.undo.iconclass = 'icon-undo';
											taTools.redo.iconclass = 'icon-repeat';
											taTools.justifyLeft.iconclass = 'icon-align-left';
											taTools.justifyRight.iconclass = 'icon-align-right';
											taTools.justifyCenter.iconclass = 'icon-align-center';
											taTools.clear.iconclass = 'icon-ban-circle';
											taTools.insertLink.iconclass = 'icon-link';
											taTools.unlink.iconclass = 'icon-link red';
											taTools.insertImage.iconclass = 'icon-picture'; */
											// there is no quote icon in old font-awesome so we change to text as follows
											delete taTools.quote.iconclass;
											taTools.quote.buttontext = 'quote';
											return taTools;
										}]);
										
				 })
				 

				 
.controller('QuestionAnswerEntry', function($scope, $stateParams, $http, $state, NgTableParams, LoginService, ConfigService) {

 

    $scope.questionanswerentry = {
        question: {
            title: '',
            description: ''
        },
        answer: {
            title: '',
            description: ''
        },
        affiliate: {
            affiliatelink: '',
            affiliatename: ''
        },

        technology: '',
        field: '',
        lead: ''
    };

	$scope.qasettings = {
            currentPage: 0,
            offset: 0,
            pageLimit: 5,
            pageLimits: ['5', '10','20']
          };
 
	$scope.updateselection = {
		name:''
	};
    $scope.qacallback = function() {
		
			// $scope.qasettings.offset = $scope.qasettings.currentPage + 1;
            console.log($scope.qasettings.offset +','+ $scope.qasettings.currentPage + 'pagination changed...');
          }
    $scope.questionanswer = [];

    $scope.currentqa = {};


    $scope.apptopics = ConfigService.gettopics();
    $scope.apptechnologies = ConfigService.gettechnologies();

	

	$scope.selectedaffiliate = '-1';
	// Below is update affiliate //
	$scope.selectupdateaffiliate = function(id)
	{
		$scope.selectedaffiliate = id;
		$scope.questionanswerentry.affiliate = $scope.currentqa.affiliatelinks[id];
	}
	
	$scope.cancelselectaffiliate = function(id)
	{
		$scope.selectedaffiliate = '-1';
		$scope.questionanswerentry.affiliate = {};
	}
	
	$scope.updateaffiliate = function() {
        var obj = {
            recordid: $stateParams.recordid,
            affiliate: $scope.questionanswerentry.affiliate,
			affiliateindex : $scope.selectedaffiliate
        };
        $http.post('/questionanswer/updateaffiliate', obj).then(function(response) {


            $scope.currentqa = response.data;
			$scope.selectedaffiliate = '-1';

        }, function(errResponse) {
			$scope.selectedaffiliate = '-1';
            console.error('Error while fetching notes');

        });
    }
    
	$scope.deleteaffiliate = function() {
        var obj = {
            recordid: $stateParams.recordid,
            affiliate: $scope.questionanswerentry.affiliate,
			affiliateindex : $scope.selectedaffiliate
        };
        $http.post('/questionanswer/deleteaffiliate', obj).then(function(response) {


            $scope.currentqa = response.data;
			$scope.selectedaffiliate = '-1';

        }, function(errResponse) {
			$scope.selectedaffiliate = '-1';
            console.error('Error while fetching notes');

        });
    }
    
	
    $scope.enteraffiliate = function() {
        var obj = {
            recordid: $stateParams.recordid,
            affiliate: $scope.questionanswerentry.affiliate
        };
        $http.post('/questionanswer/enteraffiliate', obj).then(function(response) {


            $scope.currentqa = response.data;


        }, function(errResponse) {

            console.error('Error while fetching notes');

        });
    }
	
	
	
    $scope.listquestions = function() {
		
        $http.post('/questionanswer/listquestions').then(function(response) {

            $scope.questionanswer = response.data;


        }, function(errResponse) {

            console.error('Error while fetching notes');

        });
    }

    $scope.displayupdatequestion = function() {
        //alert(angular.toJson(rec));
        var obj = {
            recordid: $stateParams.recordid
        };

        $http.post('/questionanswer/getquestionanswer', obj).then(function(response) {


            $scope.questionanswerentry = response.data;
            $scope.currentqa = response.data;
        //    alert(angular.toJson($scope.currentqa));


        }, function(errResponse) {

            console.error('Error while fetching notes');

        });




    }
	
	$scope.deletequestion = function(id) {
        //alert(angular.toJson(rec));
        var obj = {
            recordid: id
        };

        $http.post('/questionanswer/deletequestionanswer', obj).then(function(response) {

			$scope.questionanswer = response.data;
			$scope.listquestions();


        }, function(errResponse) {

            console.error('Error while fetching notes');

        });




    }
	

	$scope.unpublishquestion = function(recordid) {

        var obj = {
            recordid: recordid
            
        };
        $http.post('/questionanswer/setquestionedit', obj).then(function(response) {

    
			$scope.listquestions();

        }, function(errResponse) {
	
            console.error('Error while fetching notes');

        });
    }

	$scope.publishquestion = function(recordid) {

        var obj = {
            recordid: recordid
            
        };
        $http.post('/questionanswer/setquestionpublished', obj).then(function(response) {

    
			$scope.listquestions();

        }, function(errResponse) {
	
            console.error('Error while fetching notes');

        });
    }

	
    $scope.updatequestion = function() {

        var obj = {
            recordid: $stateParams.recordid,
            question: $scope.questionanswerentry
        };
        $http.post('/questionanswer/updatequestionanswer', obj).then(function(response) {

            $scope.questionanswer = response.data;
			$scope.questionanswerentry = {};

        }, function(errResponse) {
			$scope.questionanswerentry = {};
            console.error('Error while fetching notes');

        });
    }


	// Below is update leads //
	$scope.selectedlead = '-1';
	$scope.selectupdatelead = function(id)
	{
		$scope.selectedlead = id;
		$scope.questionanswerentry.lead = $scope.currentqa.leads[id];
	}
	
	$scope.cancelselectlead = function(id)
	{
		$scope.selectedlead = '-1';
		$scope.questionanswerentry.lead = {};
	}
	
	$scope.updatelead = function() {
        var obj = {
            recordid: $stateParams.recordid,
            lead: $scope.questionanswerentry.lead,
			leadindex : $scope.selectedlead
        };

        $http.post('/questionanswer/updatelead', obj).then(function(response) {

            $scope.currentqa = response.data;
$scope.selectedlead = '-1';

        }, function(errResponse) {
$scope.selectedlead = '-1';
            console.error('Error while fetching notes');

        });
    }
	
	$scope.deletelead = function() {
        var obj = {
            recordid: $stateParams.recordid,
            lead: $scope.questionanswerentry.lead,
			leadindex : $scope.selectedlead
        };

        $http.post('/questionanswer/deletelead', obj).then(function(response) {

            $scope.currentqa = response.data;
$scope.selectedlead = '-1';

        }, function(errResponse) {
$scope.selectedlead = '-1';
            console.error('Error while fetching notes');

        });
    }


    $scope.enterlead = function() {
        var obj = {
            recordid: $stateParams.recordid,
            lead: $scope.questionanswerentry.lead,
			
        };

        $http.post('/questionanswer/enterlead', obj).then(function(response) {

            $scope.currentqa = response.data;


        }, function(errResponse) {

            console.error('Error while fetching notes');

        });
    }


    $scope.enteranswer = function() {
        var obj = {
            recordid: $stateParams.recordid,
            answer: $scope.questionanswerentry.answer
        };

        $http.post('/questionanswer/enteranswer', obj).then(function(response) {

            $scope.currentqa = response.data;
			$scope.selectedanswer = '';

        }, function(errResponse) {

            console.error('Error while fetching notes');
			$scope.selectedanswer = '';

        });
    }
	
	// Below is update answer //
	$scope.selectedanswer = '-1';
	$scope.selectupdateanswer = function(id)
	{
		$scope.selectedanswer = id;
		$scope.questionanswerentry.answer = $scope.currentqa.answers[id];
	}
	
	$scope.cancelselectanswer = function(id)
	{
		$scope.selectedanswer = '-1';
		$scope.questionanswerentry.answer = {};
	}
	
	$scope.updateanswer = function() {
        var obj = {
            recordid: $stateParams.recordid,
            answer: $scope.questionanswerentry.answer,
			answerindex : $scope.selectedanswer
        };

        $http.post('/questionanswer/updateanswer', obj).then(function(response) {

            $scope.currentqa = response.data;
			$scope.selectedanswer = '-1';

        }, function(errResponse) {

            console.error('Error while fetching notes');
			$scope.selectedanswer = '-1';

        });
    }
	
	$scope.deleteanswer = function() {
        var obj = {
            recordid: $stateParams.recordid,
            answer: $scope.questionanswerentry.answer,
			answerindex : $scope.selectedanswer
        };

        $http.post('/questionanswer/deleteanswer', obj).then(function(response) {

            $scope.currentqa = response.data;
			$scope.selectedanswer = '-1';

        }, function(errResponse) {

            console.error('Error while fetching notes');
			$scope.selectedanswer = '-1';

        });
    }
	
	// Above is update answer //
	
	
    $scope.enterquestionanswer = function() {


        $http.post('/questionanswer/enterquestionanswer', $scope.questionanswerentry).then(function(response) {

            $scope.questionanswer = response.data;

			$scope.questionanswerentry = {};

        }, function(errResponse) {

            console.error('Error while fetching notes');
			$scope.questionanswerentry = {};

        });
    }
	
	$scope.listquestions();
	if($state.is('questionanswersupdate') || $state.is('questiondisplay') )
	{
		$scope.displayupdatequestion();
		
	}
	
	
	if($state.is('questionsupdate') )
	{
		$scope.displayupdatequestion();
		
	}
	
	

})


.controller('FrontCtrl', function($scope, $stateParams, $location, $http, $state, NgTableParams, LoginService, ConfigService, FrontService) {


    $scope.apptopics = ConfigService.gettopics();

	$scope.apptechnologies = ConfigService.gettechnologies();
	
    // alert(angular.toJson($scope.apptopics));

    $scope.fronttype1 = {
        questions: '',
        leads: '',
        answers: '',
        links: ''
    };

	$scope.selectedpurpose = 'Concept'; // Concept, Business, Consulting, Support.
	$scope.technology = 'Bitcoin'; // Bitcoin, Blockchain, Wallet.
	
	$scope.frontbottom = [];
	
    $scope.go = function(path) {
        $location.path(path);
    }
	
	$scope.setpurpose = function(purp)
	{
		$scope.selectedpurpose = purp;
		FrontService.setPurpose($scope.selectedpurpose);
		//$scope.getfrontdata();
	}
	
	$scope.settechnology = function(tech)
	{
		$scope.technology = tech;
		FrontService.setTechnology($scope.technology);
		// $scope.getfrontdata();
	}
	
	$scope.setanswer = function(id)
	{
		$scope.frontquestion = $scope.frontdata[id].question.description;
		$scope.frontanswer = $scope.frontdata[id].answers;
		$scope.frontlead = $scope.frontdata[id].leads;
		$scope.frontaffiliate = $scope.frontdata[id].affiliatelinks;
	}
	

	$scope.$watch(function () { return FrontService.getTechnology(); },
   function (value) {
       
	   $scope.technology = value;
	   FrontService.getquestions().then(function(data)
		{
			
			
			
			$scope.frontdata = data;
			$scope.frontanswer = $scope.frontdata[0].answers;
			$scope.frontquestion = $scope.frontdata[0].question.description;
			$scope.frontlead = $scope.frontdata[0].leads;
			$scope.frontaffiliate = $scope.frontdata[0].affiliatelinks;
	
	
			
		});
		
		
	   
   }
);

$scope.$watch(function () { return FrontService.getPurpose(); },
   function (value) {
       //$scope.number = value;
	   $scope.selectedpurpose = value;
	   FrontService.getquestions().then(function(data)
		{
			
			
			
			$scope.frontdata = data;
			$scope.frontanswer = $scope.frontdata[0].answers;
			$scope.frontquestion = $scope.frontdata[0].question.description;
			$scope.frontlead = $scope.frontdata[0].leads;
			$scope.frontaffiliate = $scope.frontdata[0].affiliatelinks;
	
			
		});
		
		
	   
   }
);

	
    $scope.getfrontdata = function() {

  /*      //alert(angular.toJson($state.current.name));
        if (($state.current.name == 'front') && $stateParams != undefined) {
            $scope.technology = $stateParams.technology;

            FrontService.getfrontdata($stateParams.technology);
        } 
*/	
	// http://stackoverflow.com/questions/19445029/refresh-a-controller-from-another-controller-in-angular
	
	// https://docs.angularjs.org/api/ng/service/$q	
	
	
		FrontService.getquestions($scope.technology, $scope.selectedpurpose).then(function(data)
		{
			
			
			
			$scope.frontdata = data;
			$scope.frontanswer = $scope.frontdata[0].answers;
			$scope.frontquestion = $scope.frontdata[0].question.description;
			$scope.frontlead = $scope.frontdata[0].leads;
			$scope.frontaffiliate = $scope.frontdata[0].affiliatelinks;
		//	$scope.frontbottom = 
	
			
		});
		
		
        
    }
	
	
    $scope.getfrontdata();




})




;