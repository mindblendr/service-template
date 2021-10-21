const router = require('express').Router();
const { User } = require('../db/models')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        let { username, password, firstname, lastname, user_type } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

        const user = await User.create({ username, password, user_type });

        res.send({
            data: { username, password, firstname, lastname, user_type },
            status: 1
        });

    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

module.exports = {
    router,
    prefix: '/',
    middlewares: null
}