function answer(cor_ans,usr_ans,stats){
	this.cor_ans = cor_ans;
	this.usr_ans = usr_ans;
	if(stats) this.status = "Correct";
	else this.status = "Incorrect";
}
var app = angular.module('CBApp', ["ui.router"]);
var time;
var nama_gambar = ['kotak','segitiga','bintang','hati','bebek'];
app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
			templateUrl: 'layout.html'
        })
        .state('about', {
            url: '/about',
			views: {
				'': { templateUrl: 'partial-about.html' },
			}
        })
		.state('guide', {
            url: '/guide',
			views: {
				'': { templateUrl: 'partial-guide.html' },
			}
		});
        
});
function resetTimer(){
	window.clearTimeout(time);
}
function Timer(){
    document.getElementById('image').style.visibility = "hidden"; 
}
app.directive('test', function(testFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'layout2.html',
		link: function(scope, elem, attrs) {
			
			scope.start = function(x) {
				scope.id = 0;
				scope.bundle_id = x;
				scope.testOver = false;
				scope.inProgress = true;
				scope.many = 0;
				if(x == 0) scope.problem = 24;
				else scope.problem = 10;
				scope.result = new Array();
				scope.getQuestion();
			};
 
			scope.getQuestion = function() {
				document.getElementById("f").focus();
				var q = testFactory.getQuestion(scope.bundle_id,scope.id);
				if(q) {
					scope.question = q.question;
					scope.answer = q.answer;
					scope.many++;
					
					scope.answerMode = true;
					document.getElementById("submit_button").disabled = false;
					
				} else {
					scope.score = Math.round((scope.score/scope.many)*10000)/100;
					scope.testOver = true;
				}
			};
			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.checkAnswer = function() {
				if(!$('input[name=answer]').length) return;
 
				var ans = $('input[name=answer]').val();
				if(ans == scope.answer) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}
				var xx = new answer(scope.answer,ans,scope.correctAns);
				scope.result.push(xx);
				scope.answerMode = false;
				document.getElementById("submit_button").disabled = true;
				scope.id++;
				scope.getQuestion();
			};
 
 
			scope.reset();
		}
	}
});

app.factory('testFactory', function() {
	var questions = [];
	
	for(var i = 0; i < 4;i++){
		questions[i] = [];
	}
	questions[0][0] = 	{ 	color:[[26,356,140],[14,239,142],[60,269,124],[123,263,39],[213,360,180]],
							answer: -1
						}
	for(var i = 1; i < 24;i++){
		questions[0][i] = 	{
								color:[[64,135,64],[86,50,86],[36,109,36],[270,169,0],[107,39,107]],
								answer: -1
							}
	}
	for(var i = 0; i < 10;i++){
		questions[1][i] = 	{
								color:[[44,128,44],[243,327,243],[299,209,299],[60,120,60]],
								answer: -1
							}
	}
	for(var i = 0; i < 10;i++){
		questions[2][i] = 	{
								color:[[4,138,4],[212,127,52],[303,148,349],[337,169,270],[42,130,42]],
								answer: -1
							}
	}
	for(var i = 0; i < 10;i++){
		questions[3][i] = 	{
								color:[[176,98,176],[322,30,332],[170,120,170],[343,33,343],[0,300,0]],
								answer: -1
							}
	}
	return {
		getQuestion: function(bundle_id,id) {
		
			if(id < questions[bundle_id].length) {
				$('input[name=answer]').val('');
				
				
				document.getElementById('image').style.visibility = "visible"; 
				//time = setTimeout(Timer,5000);
				
				
				var ind = Math.round(1+Math.random()*questions[bundle_id][id].color.length);
				x = 1+Math.round(Math.random()*3);
				//ind = 2;
				//console.log(ind);
				if( ind == 1){
					
					var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					var number =alphabet.charAt(Math.floor(Math.random()* alphabet.length));
					ishi_buat(questions[bundle_id][id].color[x][0],questions[bundle_id][id].color[x][1],questions[bundle_id][id].color[x][2],number,0);
				    questions[bundle_id][id].answer = number;
				}
				else if( ind == 2){
					var number = nama_gambar[Math.round(Math.random()*3)];
					//console.log(number);
					
					ishi_buat(questions[bundle_id][id].color[x][0],questions[bundle_id][id].color[x][1],questions[bundle_id][id].color[x][2],number,2);
					questions[bundle_id][id].answer = number;
				
				}
				else {
					var number = Math.round(Math.random()*99);
					if(number < 10) number+=10;
					ishi_buat(questions[bundle_id][id].color[x][0],questions[bundle_id][id].color[x][1],questions[bundle_id][id].color[x][2],number,1);
				    questions[bundle_id][id].answer = number;
				
				}
				return questions[bundle_id][id];
			} else {
				return false;
			}
		}
	};
});