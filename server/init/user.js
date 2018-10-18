const mongoose = require('mongoose')
import bcrypt from 'bcryptjs';
const User = require('./../models/User.model')
mongoose.connect('mongodb://127.0.0.1:27017/mis-node')

function initUser() {
  return new Promise(resolve => {
    const salt = bcrypt.genSaltSync(10);
    const username = 'admin';
    const password = bcrypt.hashSync('admin', salt);
    User.create({
      username,
      password
    }, (err) => {
      if (err) console.log('发生错误');
      resolve()
    })
  })
}
module.exports = initUser