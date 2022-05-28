const express = require('express');
const router = express.Router();
const Item = require('../models/ItemModel')// importing item model

// router.get('/',(req,res)=>{
//   res.json({data: "The GET is working perfectly"})
// })

router.get('/',(req,res)=>{
  Item.find()
    .then(data=>{
      res.json(data);
    })
    .catch(e=>{
      res.json({message: e});
    })
})
//
// router.post('/',(req,res)=>{
//   res.json({data: "This is a POST response. Its working perfectly."})
// })

router.post('/',(req,res)=>{
  console.log(req.body.unit);

  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    price: req.body.price
  }) //creating a new item


  newItem.save() // saving the created item to DB
    .then(data=>{
      res.json(data);
      console.log('item saved');
    })
    .catch(e=>{
      res.json({message: e});
      console.log(e);
  })
})
//
//
// router.delete('/', (req,res)=>{
//   res.json({data: "The delete option works!"})
// })

router.delete('/:id',(req,res)=> {
  Item.deleteOne({_id: req.params.id})
  .then(data =>{
    res.json(data);
  })
  .catch(e=>{
    res.json({message: e});
  })
})

// router.patch('/',(req,res)=>{
//   res.json({data: "Yes, you can Patch!"})
// })


router.patch('/:id',(req,res)=>{
  Item.updateOne({_id: req.params.id},{
    $set: {                                       // setting the new value over the requested values
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      price: req.body.price}
  })
  .then(data =>{
    res.json(data); // sending updated data to DB
  })
  .catch(e=>{
    res.json({message: e});
  })
})

module.exports = router;
