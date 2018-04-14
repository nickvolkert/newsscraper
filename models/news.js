var orm = require ("../config/orm.js");

var news = {
    all: function(cb) {
    	orm.all("newsArticles", function(res){
    		cb(res);
    	});
    },
    create: function(cols, vals, cb){
    	orm.create("newsArticles", cols, vals, function(res){
    		cb(res);
    	});
    },
    update: function(objColVals, condition, cb){
    	orm.update("newsArticles", objColVals, condition, function(res){
    		cb(res);
    	});
    }
};

module.exports = news;
