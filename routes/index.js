var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = require('../models/listSchema')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/readList', function(req, res){
  List.find({}, function(err, list){
    if(err){
      res.send(err)
    }
    res.send(list)
  })
})

router.post('/addToList',function (req,res){
  console.log(req.body)
  List.create({
    task: req.body.task,
    date: new Date(req.body.date),
    status: req.body.status
  }, function (err, success){
    if(err){
      res.send('Failed')
    }
    res.send('Success')
  })

})

router.delete('/deleteTask/:task', function(req,res){
  console.log(req.params)
  List.findByIdAndRemove(req.params.task, function(err, data){
    res.send(data);
  })

})

router.put('/completeTask/:taskId', function(req,res){
  console.log(req.params.taskId)
  List.findById(req.params.taskId, function(err,task){
    task.toggleCompleted();
    console.log(task)
    task.save(function(err,savedTask){
      res.send(savedTask)
    });
  })
 
})


module.exports = router;
