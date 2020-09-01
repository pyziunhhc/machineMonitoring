const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate')


router.get('/', /*auth,*/ (req, res, next) => {
   res.status(200).send({
    token: req.cookies.token
   })
})

module.exports = router;