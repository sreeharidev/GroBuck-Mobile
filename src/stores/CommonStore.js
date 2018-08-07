var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GroceryConstant = require('../constants/GroceryConstants.js');
var assign = require('object-assign');
var stats = false;
var CommonStore = assign({}, EventEmitter.prototype, {
    emitChange: function(event,data) {
      this.emit(event,data);
    },
    addChangeListener:function(eventType,callback){
      this.on(eventType, callback);
    },
    removeChangeListener: function(eventType,callback) {
        this.removeListener(eventType,callback);
    }
});
AppDispatcher.register(function(payload) {
  var action = payload.action;
  CommonStore.emitChange(action.actionType,action.data);
  return true;
  });
module.exports =  CommonStore; 