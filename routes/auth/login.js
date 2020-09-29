const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  checkCookie
} = require('../../helpers/checkCookie')

router.get('/', (req, res, next) => {
  //dodać sprawdzenie czy użytkownik jest zalogowany
  const cookie = checkCookie(req.cookies)
  const login = req.cookies.login;
  if (cookie) {
    res.redirect('/dashboard')
  } else {
    res.render('login', {
      title: "Logowanie | ITA Tools Sp z o.o",
      jsfiles: 'login.js',
      cssfiles: 'auth'
    });
  }

});


router.post('/', (req, res, next) => {
  const {
    login,
    password
  } = req.body;
  User.findOne({
    login: login
  }, (err, user) => {
    if (err) return handleError(err)
    if (!user) {
      res.send({
        status: 406,
        message: ['Brak użytkownika w bazie']
      })
    } else {
      bcrypt.compare(password, user.password, (err, passwdIsCorrect) => {
        if (passwdIsCorrect) {

          const payload = {
            login
          }
          const token = jwt.sign(payload, 'testSecretChangeIt', {
            expiresIn: '1h'
          });
          res.cookie('login', login, 'role', user.role, {
            httpOnly: true,
            sameSite: true,
          })
          res.cookie('role', user.role, {
            httpOnly: true,
            sameSite: true,
          })
          res.json({
            status: 'success',
            login: login,
            token: token,
            redirect: "/dashboard"
          })
        } else {
          res.send({
            status: 406,
            message: ['Błędny login lub hasło']
          })
        }
      })
    }
  })
})
//dodać wylogowywanie

module.exports = router;