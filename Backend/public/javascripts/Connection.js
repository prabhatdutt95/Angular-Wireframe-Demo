var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/RegisterDB";

var connection={};

connection.getConnection = function(){
    return MongoClient.connect(url).then(function(database){
        return database.db();
    })
}
module.exports=connection;