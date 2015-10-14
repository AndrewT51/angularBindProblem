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
    $scope.reminder = false
    console.log($scope.reminder);
    if($scope.taskDetails && $scope.taskDetails.date && $scope.taskDetails.task){
      $scope.taskDetails.status = false;
      $scope.taskArray.push($scope.taskDetails);
    
    $http.post('http://localhost:3000/addToList',
      $scope.taskDetails
      ,function successCb(response){
     
    }, function errorCb(response){
      
    })
    $scope.taskDetails ={};
  }else{

  $scope.reminder =true;
  console.log('helloe')

  }
  
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

