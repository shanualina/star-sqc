const jwt = require('jsonwebtoken')
exports.validJWT = (req, res, next) => {
    if (req.headers['x-access-token']) {
        try {
            let authorization = req.headers['x-access-token'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};