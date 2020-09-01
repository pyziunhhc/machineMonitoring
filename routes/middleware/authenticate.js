const jwt = require('jsonwebtoken');

module.exports = auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({
            status:401,
            message: 'Brak autoryzacji',
            url: '/login'
        })
    } else {
        jwt.verify(token, 'testSecretChangeIt', (err, decoded) => {
            if(err){
                res.status(401).send({message: 'Błędny token'})
            } else {
                req.login = decoded.login;
                next();
            }
        })
    }
}