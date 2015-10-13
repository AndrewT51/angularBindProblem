var mongoose = require('mongoose');

var list = new mongoose.Schema({
  task: {type: String, required: true},
  date: {type: Date, required: true},
  status: {type: Boolean, required: true}

})

list.methods.toggleCompleted = function(cb){
  this.status = !this.status;
  this.save(cb);
};

module.exports = mongoose.model('List',list);