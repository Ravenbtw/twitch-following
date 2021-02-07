const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.static('public'));

app.get('/', (req, res) => res.render('following', { tool: 'following' }));

app.get('/first', (req, res) => res.render('first', { tool: 'first' }));

app.listen(8081);