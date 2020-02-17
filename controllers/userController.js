const User = require("../models/user");

exports.addUser = function (req, res) {
    if (!req.body) return res.sendStatus(400);

    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;

    const user = new User({ age: age, name: name });
    user.save()
        .then(() => {
            return res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
}

exports.getUser = function (req, res){
    var userId = req.params.id;
    var user = User.findById(userId)
    .then((user) => {
        return res.json(user);
    })
    .catch((err) => {
        console.log(err);
        return res.sendStatus(400);
    });;
}

exports.deleteUser = function (req, res){
    var userId = req.params.id;
    var user = User.findByIdAndDelete(userId)
    .then((user) => {
        if(!user){
            return res.sendStatus(404);
        }
        return res.json(user);
    })
    .catch((err) => {
        console.log(err);
        return res.sendStatus(400);
    });;
}

exports.getUsers = function (req, res) {
    User.find({})
        .then(users => res.json(users));
}