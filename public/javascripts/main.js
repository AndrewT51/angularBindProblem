var todoApp = angular.module('TodoApp',['ui.router']);

todoApp.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state('home', {
      url: '/home', 
      templateUrl: '/templates/home.html',
      controller: 'homeCtrl'
  })
   $urlRouterProvider.otherwise('/home');
})


todoApp.controller('homeCtrl',function($scope){
  if (!$scope.taskArray){
    $scope.taskArray = [];
  }
  $scope.addTask =function (){
    $scope.taskArray.push($scope.taskDetails)
    console.log($scope.taskArray)
  }

})