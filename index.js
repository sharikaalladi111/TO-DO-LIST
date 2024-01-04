// require express for setting up the express server
const express = require('express');

// set up the port number
const port = 7001;

// importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  Task  = require('./models/task');

// using express
const app = express();

// using static files
app.use(express.static("./views"));
// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req, res){
    const studt=Task.find({}).exec();
    studt.then(data=>{
        
            console.log(data);
        
    res.render('home', {data});
    }).catch(err=>{console.log("Error while fetching data.. :)"
)});
})



// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    const promise=new Promise((resolve,reject)=>{
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }); 
    });
        promise.then(newdata=>{
            console.log("****")
            reject(newdata)
        }).catch(err=>{
            console.log(err);
            reject(err);
        })
        promise.then(
            (newdata)=>{
                res.redirect('/');
            }
            ).catch(
                (err)=>{
                    console.log(err);
                }
            )

        //console.log(newtask);
         res.redirect('/');

   
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i])
        .then(data=>{
            console.log(data);
            res.redirect('back');
         }).catch(err=> console.log('error in deleting task'));
        }
        });
    


// make the app to listen on asigned port number
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})