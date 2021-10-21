const router = require('express').Router();
const jwt = require('../bin/jwt');
const session_cache = require('../bin/session_cache');
const { User } = require('../db/models')
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let login = await User.findOne({ where: { username } });

        if (login && bcrypt.compareSync(password, login.password)) {
            const { id, username, status, user_type } = login;
            const login_data = { id, username, status, user_type};
            await session_cache.set('session_' + id, login_data);
            const token = jwt.encode(login_data);
            return res.send({
                data: { token },
                status: 1
            });
        }
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