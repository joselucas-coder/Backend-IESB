var express = require('express');
var router = express.Router();
const { verificarToken } = require("../middlewares/auth")

/* GET home page. */
router.get('/', verificarToken, function(req, res, next) {
  res.json("API está ON!");
});

module.exports = router;
