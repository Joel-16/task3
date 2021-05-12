var mongoose=require('mongoose')
var loc=mongoose.model('user')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  loc
      .find({})
      .exec((err,ans)=>{
         if (err){
            sendstatus(res, 404, err)
         } else{
            sendstatus(res, 200, ans)
         }
      })
});

router.patch('/update', function(req, res) {
  if (req.body && req.body.name && req.body.email && req.body.country){
    loc
      .find(req.body.email)
      .exec((err,ans)=>{
        if (err){
          sendstatus(res, 400, err)
        }
        ans.name=req.body.name
        ans.email=req.body.email
        ans.body=req.body.country
      })
  }else{
    sendstatus(res, 400, {"message":" all fields required"})
  }
});
router.delete('/delete', function(req, res) {
  if (!req.body.email){
    loc
        .findOneAndDelete(req.body.email)
    }else{
      sendstatus(res, 400, {"message":" all fields required"})
    }
});
router.post('/create', function(req, res) {
  if (req.body && req.body.name && req.body.email && req.body.country){
    loc
      .create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
      },(err, location)=>{
          if (err) {
             sendstatus(res, 400, err);
          } else {
             sendstatus(res, 201, {"message": "sucessful data creation"});
          }})
  } else{
    sendstatus(res, 400, {"message":" all fields required"})
  }
});

module.exports = router;
let sendstatus= (res, status, data)=>{
  res.status(status)
  res.json(data)
}
