const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// we don't need this now
// const recipes = require(path.join(__dirname, '/recipes/recipes.json'));

var mysql = require('mysql');
var connection = mysql.createConnection({
   host: '81.105.56.186',
   user: 'root',
   password: 'recipeapp',
   database: 'recipes', // aka schema
});

connection.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// everything above here is config

//  routes

app.get('/', (req, res) => res.sendFile('index.html'));
app.get('about', (req, res) => res.sendFile('about.html'));
app.get('contact', (req, res) => res.sendFile('contact.html'));

// apis

app.get('/recipes', (req, res) => {
   // with more than onne table in a query you need to be more specific on field selection
   // Is recipe name missing? In the browser?
   // ahh yes sorry when this happens (two table fields have the same name) we need to reasign them
   // Haha shits getting complicated
   // all good, just keep at it and it'll become clearer
   // even just adding line breaks can make it easier to read and understand
   // Yeah definitely
   // inserting data is a bit messy imo
   // Just in general?
   // without using an ORM library
   // Haha whats one of them?
   // you don't write sql, you create objects and assign them table names in your app and it creates all tables and relations for you
   // That sounds easier to be fair
   // it is but this is good to undestand what's actually happening
   // will be easier to architectualy design a model with this knowledge
   //  Yeah definitely better to learn hard way first...same reason I've tried to avoid
   // frameworks so far...on that note though are there any you would recommend getting stuck into first?
   // yeah, angularjs so angular below 2.0
   // or just get straight into react (steeper learning curve but defo worth it)
   // imo i'd just stick with this for now, plain js (maybe use jquery)
   // there are some concepts in react i still get boggled by lmao,
   // lets build a view here to consume the json we're sendinng and to create users and recipes.. if you got time?
   // Yeah go for it...so a view is like something that gets rendered to the user after a request!? Can't type!!!
   // just a page...
   // Yeah I'd rather get good at the basics but just dont wanna drag my heels
   connection.query(
      `SELECT 
         recipes.id,
         recipes.name,
         recipes.description,
         users.name as owner 
      FROM recipes 
      JOIN users ON recipes.owner_id = users.id`,
      function (error, rows) {
         if (error) throw error;
         res.json(rows);
      }
   );
});

app.get('/recipe/:id', (req, res) => {
   connection.query(
      `SELECT
         recipes.id,
         recipes.name,
         recipes.description,
         users.name as owner
      FROM recipes
      JOIN users ON recipes.owner_id = users.id
      WHERE recipes.id = ${req.params.id}`,
      function (error, rows) {
         if (error) throw error;
         // rows = [] of results as {}s
         res.json(rows[0]);
      }
   );
});

app.get('/users', (req, res) => {
   connection.query(
      `SELECT
         *
      FROM users`,
      function (error, rows) {
         if (error) throw error;
         // rows = [] of results as {}s
         res.json(rows);
      }
   );
});

app.post('/recipes', (req, res) => {
   // add a new recipe
   // simple lets see what happens when we call it
   // lets send an error if the request doesn't receive the required fields

   console.log(req.body);

   if (req.body.name && req.body.description && req.body.owner) {
      // cool we got what we wanted
      res.json(req.body);
   } else {
      // we didnt get the stuff we needed
      res.json({ error: 'you need to supply name, description annd owner id' });
   }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
