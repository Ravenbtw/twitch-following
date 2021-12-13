const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.static('public'));

const featuredChannels = ['twitchdoespixelart', 'twitchdoespixelart2', 'twitchdoespixelart3', 'twitchdoespixelart4'];

app.get('/', (req, res) => res.render('following', { tool: 'following', featuredChannel: featuredChannels[Math.floor(Math.random() * featuredChannels.length)] }));

app.get('/first', (req, res) => res.render('first', { tool: 'first', featuredChannel: featuredChannels[Math.floor(Math.random() * featuredChannels.length)] }));

app.listen(8081);
