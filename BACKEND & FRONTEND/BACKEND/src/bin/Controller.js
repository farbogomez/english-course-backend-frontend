const Usuario = require("./models/Usuario");
const mongoose = require("mongoose");

class Controller {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect("mongodb://localhost/englishcourse", {
        useNewUrlParser: true
      });
      console.log("Database Connected");
    } catch (err) {
      console.error(err);
    }
  }

  setUser(user, res) {
    Usuario.create(user, (err, nUser) => {
      if (err) throw err;
      res.send({ status: 200, newUser: nUser });
    });
  }

  Login(log, res) {
    Usuario.findOne(
      {
        $and: [
          { nickname: { $eq: log.nickname } },
          { password: { $eq: log.password } }
        ]
      },
      (err, login) => {
        if (err) throw err;
        if (!login) {
          res.json({
            message: "User not found"
          });
        } else {
          res.json({
            message: "User found",
            login
          });
        }
      }
    );
  }

  getUsers(res) {
    Usuario.find({}, (err, users) => {
      if (err) throw err;
      res.send({ allUsers: users });
    });
  }
}

exports.controller = new Controller();
