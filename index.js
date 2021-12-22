const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.static('public'));

const featuredChannels = ['twitchdoespixelart', 'twitchdoespixelart2', 'twitchdoespixelart3', 'twitchdoespixelart4'];

app.get('*', (req, res, next) => {
    if (new Date() > new Date('02/27/2022')) {
        res.redirect('https://www.twitchdatabase.com');
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    const name = Object.keys(req.query)[0];
    if (Math.floor(Math.random() * Math.floor((new Date('02/27/2022') - new Date()) / (1000 * 3600 * 24))) === 0) {
        res.redirect(`https://www.twitchdatabase.com/following${name ? `/${name}`:''}`);
    } else {
        res.render('following', { tool: 'following', featuredChannel: featuredChannels[Math.floor(Math.random() * featuredChannels.length)] });
    }
});

app.get('/first', (req, res) => res.render('first', { tool: 'first', featuredChannel: featuredChannels[Math.floor(Math.random() * featuredChannels.length)] }));

app.listen(8083);
