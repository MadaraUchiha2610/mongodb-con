const express = require('express');
const  app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose= require('mongoose');

//middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));

//constant
require('dotenv/config');
const api = process.env.API_URL;

//mongoose Schema
const productSchema = mongoose.Schema({
    id:Number,
    name:String,
    email:String,
})
const Product =mongoose.model('Product',productSchema);

//Get Method for display all product in frontend
app.get(`${api}/products`,async(req,res)=>{
    const productList=await Product.find()
    res.send(productList);
})

//Post Method for send Data
app.post(`${api}/products`, (req,res)=>{
    const product = new Product({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email
    })
    product.save().then((createdProduct)=>{
        res.status(201).json(createdProduct)
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false,
        })
    })
})

//Database Connection
mongoose.connect('mongodb+srv://2610sachinsharma:1155jai@cluster0.6vnpwjz.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'try'
}).then(()=>{
    console.log('Database is connected!!!!!!');
}).catch((err)=>{
    console.log(err)
})

//server
app.listen(3000,()=>{
    console.log('server i s running.....')
}) 