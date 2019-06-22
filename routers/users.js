const express = require('express');
const router  = express.Router();
const UPLOAD_CONFIG = require('../utils/multer.config');
const path = require('path');
const fs   = require('fs');
const { REMOVE_IMAGE } = require('../utils/fs.promise');

const users = [
    { username: 'acb', image: 'abc.png' },
    { username: 'cde', image: 'cde.png' },
]

const usersFake = [
    { username: 'acb', images: ['abc.png'] },
    { username: 'cde', images: ['cde.png', 'cde2.png'] },
]
/**
 * ROUTER-LEVEL MIDDLEWARE
 */

router.get('/list', (req, res) => {
    res.render('users', { users })
});

router.post('/add-user', UPLOAD_CONFIG.single('image'), (req, res) => {
    const { originalname } = req.file;
    const { username } = req.body;

    users.push({ username: username, image: originalname });
    res.redirect('/user/list')
});

router.get('/remove2/:username', (req, res) => {
    const { username } = req.params;
    let indexFinded = users.findIndex(user => Object.is(username.toString(), user.username.toString())); // 0
    const infoUserRemove = users[indexFinded]; // { username: 'abc', image: 'abc.png }
    const imagePathRemove = path.resolve(__dirname, `../public/upload/${infoUserRemove.image}`);
    
    fs.unlink(imagePathRemove, function(err) {
        if (err) res.json({ message: 'LOI' });

        users.splice(indexFinded, 1);
        res.redirect('/user/list');
    })
})

router.get('/remove/:username', async (req, res) => {
    const { username } = req.params;
    let indexFinded = users.findIndex(user => Object.is(username.toString(), user.username.toString())); // 0

    const infoUserRemove = users[indexFinded]; // { username: 'abc', image: 'abc.png }
    const imagePathRemove = path.resolve(__dirname, `../public/upload/${infoUserRemove.image}`);
    let result = await REMOVE_IMAGE(imagePathRemove, users, indexFinded);
    // res.send({ result })
    if (result.error) return res.json(result);
    return res.json({ message: 'THANH CONGs' });   
});

/**
 * BTVN
 */

router.get('/list-fake', (req, res) => {
    res.render('users-demo2', { users: usersFake })
});

router.get('/remove/:username', async (req, res) => {
    const { username } = req.params;
    let indexFinded = usersFake.findIndex(user => Object.is(username.toString(), user.username.toString())); // 0
    const infoUserRemove = usersFake[indexFinded]; // { username: 'abc', images: ['abc.png', 'abc2.png'] }
    
    await infoUserRemove.images.forEach(async img => {
        const imagePathRemove = path.resolve(__dirname, `../public/upload/${img}`);
        await REMOVE_IMAGE(imagePathRemove, usersFake, indexFinded);
    })
    
    return res.json({ message: 'remove_success' });
});
module.exports = router;