const router = require('express').Router();
const verify = require('./VerifyToken');
router.get('/', verify, (req, res,next) =>{
    res.send(req.user);
    User.findbyOne({_id:req.user});
});




module.exports = router;