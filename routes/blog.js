var express = require('express');
var router = express.Router();

const { check, validationResult, Result } = require('express-validator');

const db = require('monk')("localhost:27017/TutorialDB")

router.get('/', function(req, res, next) {
  res.render("blog");
});

router.get('/add', function(req, res, next) {
  res.render("addblog");
});

router.post('/add',[
  check("name","Plase Input your blog name").not().isEmpty(),
  check("discription","Plase Input your blog discription").not().isEmpty(),
  check("author","Plase Input your blog author").not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req);
  var errors=result.errors;
  if (!result.isEmpty()) {
    res.render('addblog',{errors:errors});
  }else{
    //insert to db
    var ct=db.get('blogs');
    ct.insert({
      name:req.body.name,
      discription:req.body.discription,
      author:req.body.author
    },function(err,blog){
      if (err){
        res.send(err);
      }else{
        req.flash("error", "บันทึกบทความเรียบร้อยแล้ว");
        res.location('/blog/add');
        res.redirect('/blog/add');
      }
    });
  }
});


module.exports = router;
