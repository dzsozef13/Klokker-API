/**
 * Welcome Route
 */

const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('Welcome to Klokker API.');
});

module.exports = router;