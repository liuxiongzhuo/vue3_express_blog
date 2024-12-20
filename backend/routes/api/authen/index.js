const express=require('express')
const jsonwebtoken=require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.SECRETKEY || "123456"
const admin= process.env.ADMIN || "admin"
const password= process.env.PASSWORD || "123456"
const router=express.Router()
router.post('/login',(req,res)=>{
    try {
        if (req.body.username==admin&&req.body.password==password) {
            res.json({status:0,data:jsonwebtoken.sign({id:0,role:0},secretKey,{expiresIn:'2d'})})
        }else{
            res.json({status:2})
        }
    } catch (error) {
        res.json({status:1,data:error})
    }
})
module.exports=router