const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const cookie = require('cookies');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

// 9wfV3ZvAspk2yucY
dotenv.config();
mongoose.connect(`mongodb+srv://naruto5043:9wfV3ZvAspk2yucY@cluster0-b9fmm.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true }).then((e)=>{
    console.log('Connected');
}).catch((e)=>{
    console.log(e);
    console.log('Not connected');
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/login',secure: true, maxAge: 100000 }
    
  }));


//   app.get('/login', function(req, res, next) {
//     if (req.session.views) {
//       req.session.views++
//       res.setHeader('Content-Type', 'text/html')
//       res.write('<p>views: ' + req.session.views + '</p>')
//       res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      
//       res.end();
//     } else {
//       req.session.views = 1
//       res.end('welcome to the session demo. refresh!')
//     }
//   }) 

 
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(3000);