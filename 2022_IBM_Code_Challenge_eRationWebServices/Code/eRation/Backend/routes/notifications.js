const express = require('express');
const router = express.Router();
const Notification = require('../models/NotificationModel')


router.get('/',(req,res)=>{
  Notification.find()
    .then(data=>{
      res.json(data);
    })
    .catch(e=>{
      res.json({message: e});
    })
})

router.post('/',(req,res)=>{
  const newNotification = new Notification({
    title: req.body.title,
    content: req.body.content
  })
  console.log(newNotification);
  newNotification.save()
    .then(data=>{
      res.json(data);
    })
    .catch(e=>{
      res.json({message: e});
  })
})


router.delete('/:id',(req,res)=> {
  Notification.deleteOne({_id: req.params.id})
  .then(data =>{
    res.json(data);
  })
  .catch(e=>{
    res.json({message: e});
  })
})




router.patch('/:id',(req,res)=>{
  Notification.updateOne({_id: req.params.id},{
    $set: {                                       // setting the new value over the requested values
      title: req.body.title,
      content: req.body.content
    }
  })
  .then(data =>{
    res.json(data); // sending updated data to DB
  })
  .catch(e=>{
    res.json({message: e});
  })
})

module.exports = router;
