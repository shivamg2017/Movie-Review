const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const db = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'MR'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// const create_table_query = "create table movie (movie_id int, movie_name varchar(20));";

app.post('/apis/insert',(req,res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const insert_query = "insert into review values (?,?);";
    db.query(insert_query, [movieName, movieReview], (err,result) => {
        if(err) console.log(err);
        else {
            console.log("insertion successful");
        }
    })
});

app.delete('/apis/delete',(req,res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const delete_query = "delete from review where name = ? and review = ?;";

    db.query(delete_query, [movieName,movieReview], (err,result) => {
        if(err) console.log(err);
        else {
            console.log("Deletion Successful...");
        }
    });
});

app.put('/apis/update',(req,res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const newReview = req.body.newReview;
    //console.log(movieName , " " , movieReview , " " , newReview);
    const update_query = "Update review set review = ? where name = ? and review = ?;";
    db.query(update_query, [newReview,movieName,movieReview] , (err,result) => {
        if(err) console.log(err);
        else {
            console.log("Update Successful...");
        }
    });
});

app.get('/apis/fetch', (req,res) => {
    const fetch_query = "select * from review";
    db.query(fetch_query,(err,result) => {
        console.log('fetched...');
        res.send(result);
    })
})

app.get('/', (req,res) => {
    res.send("Welcome to Server side home page...");
})

app.listen(5000,() => {
    console.log("Running on port 5000");
})