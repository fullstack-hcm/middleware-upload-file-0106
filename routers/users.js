const express = require('express');
const router  = express.Router();

/**
 * ROUTER-LEVEL MIDDLEWARE
 */

router.get('/demo1', (req, res) => res.send(`hello demo1`))
router.get('/demo2', (req, res) => res.send(`hello demo2`))

module.exports = router;