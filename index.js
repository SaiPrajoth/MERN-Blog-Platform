const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const UserModel = require('./user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use(express.json());
app.use(cookieParser())

mongoose.connect('mongodb+srv://saiprajoth1:Sl7rNLXOn1ZwlTwr@blog-mern.elkudzs.mongodb.net/?retryWrites=true&w=majority')

var bcrypt = require('bcryptjs'); // 5b. code for hashing
var salt = bcrypt.genSaltSync(10);
const secret = 'skdjkjfdjfkj00d';

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.userpassword;
  const HashPassword =  bcrypt.hashSync(password, salt);
  // const userDoc = await UserModel.create({username,password:HashPassword});
  // // 6d. we the usermodel is an async operation, so we use the await here

  // // res.json({'username':username,'password': bcrypt.hashSync(password, salt)}); 5b code here commented
  // res.json(userDoc);

  try{
    const userDoc = await UserModel.create({ username, password: HashPassword });
    res.json(userDoc);
  }catch(error){
    if (error.code === 11000 && error.keyPattern.username) { // 7c.
      // Duplicate key error (username already exists)
      res.status(400).json({ error: 'Username already exists. Please choose a different one.' });
    } else {
      // Other errors
      console.error(error);
      res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
  }


  
})

app.post('/login',async (req,res)=>{
  const username = req.body.username;
  const password = req.body.userpassword;
  const HashPassword =  bcrypt.hashSync(password, salt);
  // const userDoc = await UserModel.create({username,password:HashPassword});
  // // 6d. we the usermodel is an async operation, so we use the await here

  // // res.json({'username':username,'password': bcrypt.hashSync(password, salt)}); 5b code here commented
  // res.json(userDoc);

  const userDoc = await UserModel.findOne({"username":username});
  if(userDoc==null){
    console.log("user doesnt exist")
    res.status(400).json("The username doesn't exist, please try registering")
  }else{
    const compare = bcrypt.compareSync(password, userDoc.password);
    if(compare==true){
      jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
        if (err) throw err;
        res.cookie('token',token).status(200).json(token)
      })
    }else{
      res.status(400).json("incorrect password");
    }
  }
  

  // try{
  //   const userDoc = await UserModel.create({ username, password: HashPassword });
  //   res.json(userDoc);
  // }catch(error){
  //   if (error.code === 11000 && error.keyPattern.username) { // 7c.
  //     // Duplicate key error (username already exists)
  //     res.status(400).json({ error: 'Username already exists. Please choose a different one.' });
  //   } else {
  //     // Other errors
  //     console.error(error);
  //     res.status(500).json({ error: 'Registration failed. Please try again later.' });
  //   }
  // }
})

app.get('/profile',(req,res)=>{
  const token = req.cookies;
  jwt.verify(token,secret,{},(err,info)=>{ // 9a. this is the code for the jwt verification
    if(err)throw err;
    res.json(info);
  })
  // res.json(req.cookies); // 9 
  // we dont get the cookies here directly, we have to cookie-parser middle ware which we used at the top.
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// mongodb+srv://saiprajoth:7XN7XkfoN98BS1un@cluster0.hhruwd9.mongodb.net/?retryWrites=true&w=majority

// Sl7rNLXOn1ZwlTwr