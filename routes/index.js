var express =  require('express');
var knex = require('../config/knex');
// Init app
const app = express();


// Profile Page
app.get('/profile',isLoggedIn,(req,res)=>{
   var user_id = req.session.passport.user;
   knex('user')
             .where('userid',user_id)
             .then(tupple=>{
               res.render('dashboard_profile',{user:tupple[0]});
             });
});

// Trips Of A User
app.get('/trips',isLoggedIn,(req,res)=>{
   var user_id = req.session.passport.user;
       knex('trip')
             .where('userid',user_id)
             .then(tupple=>{
              //res.render('dashboard_trips',{trip:tupple});
              res.send(tupple);
          }); 
});


// filter trips 
app.post('/trips/filter',isLoggedIn,(req,res)=>{
    
   var user_id = req.session.passport.user; 
   knex('trip')
             .where('userid',user_id).andWhere('date',req.body.date).andWhere('modetype',req.body.type)
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          }); 
});

// sort trips 
app.post('/trips/sort/:type',isLoggedIn,(req,res)=>{
    
   var user_id = req.session.passport.user; 
   var type = req.params.type;
   if(type == 'date')
   {
    knex('trip')
             .where('userid',user_id)
             .orderBy('date')
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          }); 
   }
   else if(type == 'fared')
   {
    knex('trip')
             .where('userid',user_id)
             .orderBy('fare','desc')
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          });
   }
   else
   {
    knex('trip')
             .where('userid',user_id)
             .orderBy('fare')
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          });
   }
});

// Card Details
app.get('/card',isLoggedIn,(req,res)=>{
   var user_id = req.session.passport.user;
    knex('card')
       .where('userid',user_id)
       .then(tupple=>{
             res.render('card',{card :tupple[0]});
       });
});

// Recharge History
app.get('/history',isLoggedIn,(req,res)=>{
   var user_id = req.session.passport.user
    var card_no;
    knex('card')
       .where('userid',user_id)
       .then(tupple=>{
             card_no = tupple[0].cardno;
       });
              
    knex('rechargedby')
      .where('cardno',card_no)
      .then(tupple=>{
        res.send(tupple);
        // res.render(,{history : tupple});
      });
});

// filter recharge history
app.post('/history/filter',isLoggedIn,(req,res)=>{
    
   var user_id = req.session.passport.user; 
   knex('rechargedby')
             .where('userid',user_id).andWhere('rechargedate',req.body.date)
             .then(tupple=>{
              // res.render('dashboard_history',{history:tupple,layout:false})
              res.send(tupple);
          }); 
});

// sort Recharge History
app.post('/trips/sort/:type',isLoggedIn,(req,res)=>{
    
   var user_id = req.session.passport.user; 
   var type = req.params.type;
   if(type == 'date')
   {
    knex('rechargedby')
             .where('userid',user_id)
             .orderBy('rechargedate')
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          }); 
   }
   else if(type == 'amountd')
   {
    knex('rechargedby')
             .where('userid',user_id)
             .orderBy('amount','desc')
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          });
   }
   else
   {
    knex('rechargedby')
             .where('userid',user_id)
             .orderBy('amount')
             .then(tupple=>{
              // res.render('dashboard_trips',{trip:tupple,layout:false})
              res.send(tupple);
          });
   }
});

module.exports = function(passport){
	return app;
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
		return next();
  res.redirect('/');
}