var connection =require('./Connection')
dbOperations ={};


dbOperations.findUsers = function(contactNo){
    contactNo=parseInt(contactNo)
    return connection.getConnection().then(function(database){
        return database.collection('users').findOne({"contact":contactNo}).then(function(login){
            console.log(login)
            if(login==[])
                throw new Error("User not found!Please register")
            else
                return login
        })
    })
}

dbOperations.addUser = function(newUser){
    return connection.getConnection().then(function(database){
        return database.collection('users').insert(newUser).then(function(inserted){
            if(inserted.insertedCount==1){
                return true
            }else
                throw new Error("Some Error Occured please try again!")
        })
    })
}

module.exports = dbOperations;