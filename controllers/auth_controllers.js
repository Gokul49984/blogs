import crypto from "crypto";
import jwt from 'jsonwebtoken';
import envConfigJs from "../env.config.js";
const { jwt_secret } = envConfigJs;

function generatePassword(arg) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(arg)
        .digest("base64");
    return salt + "$" + hash;
}

const user = {
    "email": "admin@example.com",
    "password": generatePassword("Admin@123")
}

export function validateLoginCredentials(req, res, next) {

    if (req.body.email === user.email) {
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt)
            .update(req.body.password)
            .digest("base64");

        if (hash === passwordFields[1]) {
            return next();
        } else {
            return res.status(400).send({ errors: 'Wrong email or password' });
        }
    } else {
        return res.status(400).send({ errors: 'Wrong email or password' });
    }

};

export function login(req, res) {
    try {
        let refreshId = req.body.email + jwt_secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwt_secret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({ accessToken: token, refreshToken: refresh_token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};