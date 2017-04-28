/*jshint esversion: 6 */

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const articlesRoutes = require('./routes/articles.js');
const productsRoutes = require('./routes/products.js');
const methodOverride = require('method-override');

const hbs = handlebars.create({
  extname:'.hbs',
  defaultLayout: 'main'
});

//Handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Routes
app.use('/articles', articlesRoutes);
app.use('/products', productsRoutes);

app.get("*", (req, res) => {
  res.status(404).render('helper/404');
});

if (!module.parent) {
 //activate server
  const server = app.listen(3000, () => {
    console.log('server listening on port 3000');
  });
}

module.exports = app;