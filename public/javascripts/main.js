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


todoApp.controller('homeCtrl',function($scope,$http, readTasks){
  if (!$scope.taskArray){
    $scope.taskArray = [];
  }
  readTasks.retrieve()
   .success(function(data, status) {
      $scope.taskArray = data;
    })
  
  $scope.addTask =function (){
    $scope.taskDetails.status = false;
    $scope.taskArray.push($scope.taskDetails);
    // console.log($scope.taskDetails);
    $http.post('http://localhost:3000/addToList',
      $scope.taskDetails
    ,function successCb(response){
      // console.log(response)
    }, function errorCb(response){
      // console.log(response)
    })
    $scope.taskDetails ={};
  }

  $scope.change = function (task){ 
    task.status = !task.status;
    console.log(task)
    $http.put('http://localhost:3000/completeTask/'+task._id)
    .then( function(data){
      console.log(data);
    })
  }

  $scope.removeTask =function(task){
    $http.delete('http://localhost:3000/deleteTask/'+ task._id)
    .then(function(data){
      // console.log(data)
    })
    readTasks.retrieve()
    .success(function(data, status) {
      $scope.taskArray = data;
    })

  }
})

todoApp.service('readTasks', function($http){
   this.retrieve = function(){
    return $http.get('http://localhost:3000/readList');

  }

})

 