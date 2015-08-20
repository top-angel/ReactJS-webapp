var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/constants');

var mainActions = {
  addItem: function(item){
    AppDispatcher.handleAction({
      actionType: constants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: constants.REMOVE_ITEM,
      data: index
    })
  }
};

module.exports = mainActions;