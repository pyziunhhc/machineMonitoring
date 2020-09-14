const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const User = require('../models/User')
const auth = require('./middleware/authenticate')
const bcrypt = require('bcrypt');
router.get('/', (req, res, next) => {
  const login = req.cookies.login;
  if (login) {
    res.render('users', {
      title: 'Użytkownicy | ITA Tools Sp. z o.o',
      jsfiles: 'controller.js',
      cssfiles: 'users',
      login: login
    })
  } else {
    res.redirect('/login')
  }




})

router.post('/list', (req, res, next) => {
  User.find((err, users) => {
    res.send({
      status: 200,
      users: users,
    })
  })
})
router.post('/user', (req, res, next) => {
  const login = req.body.name;
  User.findOne({
    login: login
  }, (err, user) => {
    res.send({
      user: user
    })
  })
})

router.put('/update/password', (req, res, next) => {
  const login = req.body.login,
    oldPassword = req.body.oldPassword,
    newPassword = req.body.newPassword,
    reNewPassword = req.body.reNewPassword;

  if (newPassword == reNewPassword) {
    User.findOne({
      login: login
    }, (err, user) => {
      bcrypt.compare(oldPassword, user.password, (err, passwdIsCorrect) => {
        if (passwdIsCorrect) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) {
                next(err)
              } else {
                User.findOneAndUpdate({
                  login: login,
                }, {
                  password: hash
                }, (err, user) => {
                  if (!err) {
                    res.send({
                      status: 200,
                      message: ['Hasło zostało zmienione']
                    })
                  }
                })

              }
            })
          })
        } else {
          res.send({
            status: 406,
            message: ['Stare hasło jest niepoprawne']
          })
        }
      })
    })

  } else {
    res.send({
      status: 406,
      message: ['Hasła nie są zgodne']
    })
  }



})
router.put('/update/email', (req, res, next) => {
  const login = req.body.login,
    email = req.body.email;


  User.findOneAndUpdate({
    login: login
  }, {
    email: email
  }, (err, res) => {
    console.log(err, res)
    if (!err) {
      res.send({
        status: 200,
        message: ['Adres email został zmieniony']
      })
    }
  })


});
router.delete('/delete', (req, res, next) => {
  const login = req.body.login;

  User.findOneAndRemove({
    login: login
  }, (err, callback) => {
    if (callback) {
      res.send({
        status: 200,
        message: [`Usunięto użytkownika ${login}`]
      })
    }

  })
})
router.post('/register',
  [
    check('login')
    .not().isEmpty().withMessage('Login nie może być pusty!')
    .isLength({
      min: 3
    }).withMessage('Minimalna długość loginu to 3 znaki!'),
    check('email')
    .isEmail().withMessage('Wprowadź poprawny adres email!'),
    check('password')
    .not().isEmpty().withMessage('Hasło nie może być puste!')
    .isLength({
      min: 5
    }).withMessage('Hasło musi zawierać przynajmniej 5 znaków!'),
    check('name')
    .not().isEmpty().withMessage('Musisz wpisać imię!'),
    check('surname')
    .not().isEmpty().withMessage('Musisz wpisać nazwisko!'),
    check('role')
    .not().isEmpty().withMessage('Musisz wybrać rolę!'),
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const {
        login,
        password,
        repassword,
        name,
        surname,
        email,
        role
      } = req.body;
      /*Sprawdzenie czy hasla sa zgodne*/
      if (password !== repassword) {
        res.send({
          status: 406,
          message: ['Hasła nie są zgodne']
        })
      } else {
        /*Znajdz uzytkownika*/
        User.findOne({
          login: login
        }, (err, user) => {
          if (err) return handleError(err)

          if (user) {
            res.send({
              status: 406,
              message: ['Użytownik istnieje']
            })
          } else {
            /*Brak uzytkownika - rejestracja */

            /*Hashowanie hasła odbywa się w modelu uzytkownika*/
            const newUser = new User({
              login,
              password,
              email,
              name,
              surname,
              role,
            })
            newUser.save(err => {
              if (err) {
                if (err.code == 11000) {
                  res.status(500)
                    .send({
                      status: 500,
                      message: ['Adres email istnieje w bazie danych. Wprowadź inny.']
                    })
                    return false;
                }
                res.status(500)
                  .send({
                    status: 500,
                    message: ['Błąd rejestracji']
                  })
                  return false;
              } else {
                res.status(200)
                  .send({
                    status: 200,
                    message: ['Rejestracja przebiegła pomyślnie'],
                    user: newUser
                  })
                  return true;
              }
            })
          }
        })
      }

    } else {
      let message = [];
      errors.errors.map(error => {
        message.push(error.msg)
      })
      console.log(message)
      res.send({
        status: 406,
        message: message
      })
    }

  })

router.post('/myAccount', (req, res, next) => {
  const login = req.cookies.login;
  if (login) {
    User.findOne({
      login: login
    }, (err, user) => {
      if (user) {
        res.send({
          title: 'Moje konto | ITA Tools Sp. z o.o',
          jsfiles: 'myAccount.js',
          cssfiles: 'users',
          user: user,
          login: login
        })

      } else {
        res.send({
          status: 500,
          message: ['Błąd bazy danych']
        })
      }
    })

  } else {
    res.redirect('/login')
  }

})
module.exports = router;