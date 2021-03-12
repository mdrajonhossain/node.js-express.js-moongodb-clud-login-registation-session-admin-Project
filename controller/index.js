var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

var Registration = require('../models/Registration');
var Contact = require('../models/Contact');
var Catagory = require('../models/Catagory');



var session = require('express-session');
router.use(session({
  name : 'app.sid',
  secret: "1234567890QWERTY",
  resave: true,
  saveUninitialized: true
}));

router.get('/', (req, res) => {
  res.render('login')
})



router.post('/auth', (req, res) => {
	const username  = req.body.username;
	const password  = req.body.password;

	Registration.findOne({username})
		.then(user => {
			if(user){
				bcrypt.compare(password, user.password, function(err, result) {					
					console.log(result);
      				 if(result){
      					req.session.password = password;      					      					
      					req.session.username = username;      					      					
						res.redirect('/home');						
      				 }else{      				 	
						res.redirect('/');
      				 }
				});
				}else{
				res.redirect('/');
			}
		})	

 
})



router.get('/home',(req,res)=>{
	
	if(!req.session.password){
		console.log("success2");
		res.redirect('/');		
	}else{
		var password = req.session.password
		var username = req.session.username
		res.render('home',{password:password, username:username});
	}
})



router.get('/logout',(req,res)=>{
	console.log("req.session.password");
	console.log(req.session.password);
  req.session.destroy(function (err) {
  	if(!err){
  		res.locals.title = "Abel's Home Page";  
    	res.redirect('/'); 
  	}
   });
})


router.get('/regis', (req, res) => {
  res.render('regi')
})


router.post('/regissubmit', (req, res) => {	
	const kitte = new Registration({
    		username:req.body.username,
    		email:req.body.email,
    		password:req.body.password,    		
    		conpassword:req.body.conpassword
  		});
  	kitte.save();
    res.json("data");    
})




router.post('/postcatagory', (req, res) => {	
	const catagory = req.body.catagory
	console.log(catagory);

	const data = new Catagory({catagory:req.body.catagory});
  	data.save();  	
	res.json("data");
})

module.exports = router;