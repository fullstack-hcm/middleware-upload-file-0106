const express = require('express');
const router  = express.Router();
const UPLOAD_CONFIG = require('../utils/multer.config');

const users = [
    { username: 'acb', image: 'abc.png' },
    { username: 'cde', image: 'cde.png' },
]
/**
 * ROUTER-LEVEL MIDDLEWARE
 */

router.get('/list', (req, res) => {
    res.render('users', { users })
})

router.post('/add-user', UPLOAD_CONFIG.single('image'), (req, res) => {
    const { originalname } = req.file;
    const { username } = req.body;

    users.push({ username: username, image: originalname });
    res.redirect('/user/list')
})

module.exports = router;