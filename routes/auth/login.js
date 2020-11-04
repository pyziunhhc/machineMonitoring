const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const LoggedUser = require('../../models/LoggedUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  authUser
} = require('../../helpers/authUser')

router.get('/', (req, res, next) => {
  //dodać sprawdzenie czy użytkownik jest zalogowany
  const cookie = authUser(req.cookies);

  cookie
    .then(auth => {

      if (auth) {
        console.log('Przenies kurwa do dashboardu')
        res.redirect('/dashboard')
      }
    })
    .catch(error => {
      res.render('login', {
        title: "Logowanie | ITA Tools Sp z o.o",
        jsfiles: 'login.js',
        cssfiles: 'auth'
      });
    })


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
          LoggedUser.findOne({
            userID: user._id
          }, (error, document) => {
            if (document) {
              res.send({
                status: 406,
                message: [`Użytkownik ${user.login} jest już zalogowany`]
              })
            } else {
              const loggedUser = new LoggedUser({
                user: user.login,
                userID: user._id,
                loggedAt: new Date()
              })
              loggedUser.save((err, document) => {
                if (document) {
                  const payload = {
                    login
                  }
                  const token = jwt.sign(payload, 'testSecretChangeIt', {
                    expiresIn: '1h'
                  });
                  res.cookie('login', login, {
                    httpOnly: true,
                    sameSite: true,
                  })
                  res.cookie('role', user.role, {
                    httpOnly: true,
                    sameSite: true,
                  })
                  res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: true,
                  })
                  res.json({
                    status: 'success',
                    login: login,
                    token: token,
                    redirect: "/dashboard"
                  })
                }
              })

            }
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