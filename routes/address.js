const router = require("express").Router()
const Address = require("../models/address")
const verifyToken = require("../middlewares/verify-token")
const axios = require("axios")
const User = require("../models/user")

// post crreate an adress
router.post("/address",verifyToken, async(req,res)=>{
  try{
    let address = new Address()
    address.user = req.decoded._id
    address.country = req.body.country
    address.fullName = req.body.fullName
    address.streetAddress = req.body.streetAddress
    address.city = req.body.city
    address.state = req.body.state
    address.zipCode = req.body.zipCode
    address.phoneNumber = req.body.phoneNumber
    address.deliveryInstructions = req.body.deliveryInstructions
    address.securityCode = req.body.securityCode

    await address.save()
    res.json({
      success: true,
      message: "successfully saved address"
    })
  }catch (err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// get  an adress

router.get("/address",verifyToken, async(req,res)=>{
  try{
    let address = await Address.find({user: req.decoded._id})
    res.json({
      success:true,
      address: address
    })
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// router.get("/address/:id",verifyToken, async(req,res)=>{
//   try{
//     let address = await Address.find({_id: req.params.id})
//     res.json({
//       success:true,
//       address: address
//     })
//   } catch(err){
//     res.status(500).json({
//       success: false,
//       message: err.message
//     })
//   }
// })

// update an address
router.put("/address/:id",verifyToken, async(req, res)=>{
  try{
    let foundAddress = await Address.findOne({_id: req.params.id})
    if(foundAddress){

    if(req.body.country) foundAddress.country = req.body.country
    if(req.body.fullName) foundAddress.fullName = req.body.fullName
    if(req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress
    if(req.body.city) foundAddress.city = req.body.city
    if(req.body.state) foundAddress.state = req.body.state
    if(req.body.zipCode) foundAddress.zipCode = req.body.zipCode
    if(req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber
    if(req.body.deliveryInstructions) foundAddress.deliveryInstructions = req.body.deliveryInstructions
    if(req.body.securityCode) foundAddress.securityCode = req.body.securityCode
    
    await foundAddress.save()
    res.json({
      success: true,
      message: "successfully updated the aadress"
    })
  }
  } catch (err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.delete("/address/:id",verifyToken, async(req, res)=>{
  try{
    let deletedAddress = await Address.remove({user: req.decoded._id, _id: req.params.id})
    if(deletedAddress){
      res.json({
        success: true,
        message: "address has been deleted"
      })
    }
  }catch (err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// set default
router.put("address/set/default", verifyToken, async(req,res)=>{
  console.log("default")
  try{
    const doc = await User.findOneAndUpdate(
      {_id: req.decoded._id},
       {$set:{address: req.body.id}})
       console.log("doc", doc)
    if(doc) {
      res.json({
        success: true,
        message: "Successfully updated default address"
      })
    }
  }catch (err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router