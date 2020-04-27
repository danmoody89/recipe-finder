const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const recipes = require(path.join(__dirname, '/recipes/recipes.json'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile('index.html'));
app.get('about', (req, res) => res.sendFile('about.html'));
app.get('contact', (req, res) => res.sendFile('contact.html'));

app.get('/recipes/all', (req, res) => res.json(recipes));
app.get('/recipes', (req, res) => console.log(req.query.tag));

app.post('/recipes', (req, res) => {
   recipes.push(req.body);
   fs.writeFile(path.join(__dirname, '/recipes/recipes.json'), JSON.stringify(recipes), err => {
      if (err) {
         console.log(err);
         return;
      } else res.send({ result: 'Recipe Posted!' });
   });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
