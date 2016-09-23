var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

// GET /api/user/:id/smiles (get all smiles for a user)
// POST /api/user/:id/smiles (create a smile for a user)

// define the home page route
router.get('/users/:userid/smiles', function(req, res) {
  res.send('gets all smiles ' + req.params.userid);
});
// define the about route
router.post('/users/:userid/smiles', function(req, res) {
  res.send('Creates a smile for user ' + req.params.userid);
});

module.exports = router;
