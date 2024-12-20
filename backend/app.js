const express=require('express')
const app=express()
const cors=require('cors')
const mainRouter=require('./routes')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()
app.use(express.static('public'))
app.use('/',mainRouter)
app.get('*',(req,res)=>{
    res.redirect('/')
})
const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`The server is listening on port ${port}.`);
    
})