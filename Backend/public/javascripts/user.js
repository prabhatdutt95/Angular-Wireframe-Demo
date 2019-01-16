var users = function ( name, email, contact,salary){
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.salary = salary;
}

users.toObject = function(result){
    return new users( result.name, result.email, result.contact,result.salary);
}

module.exports = users;