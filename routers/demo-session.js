const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    req.session.LOGIN = true;
    res.json({ message: 'DANG NHAP THANH CONG' });
})

router.get('/dashboard', (req, res) => {
    const { LOGIN } = req.session;
    if (LOGIN) return res.json({ message: 'CHAO BAN _ TRANG DASHBOARD' });
    res.redirect('/demo-session/err-login');
})

router.get('/err-login', (req, res) => {
    res.json({ message: 'VUI LONG DANG NHAP' });
})

module.exports = router;