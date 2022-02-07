const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.static('public'));

const featuredChannels = ['twitchdoespixelart', 'twitchdoespixelart2', 'twitchdoespixelart3', 'twitchdoespixelart4'];

app.use((req, res, next) => {
    res.locals.showFirstFollowersButton = new Date() < new Date('02/20/2022');
    next();
});

app.get('/', (req, res) => {
    res.render('following', { tool: 'following', featuredChannel: featuredChannels[Math.floor(Math.random() * featuredChannels.length)] });
});

app.use((req, res, next) => {
    if (new Date() > new Date('02/20/2022')) {
        res.redirect('https://www.twitchdatabase.com');
    } else {
        next();
    }
});

app.get('/first', (req, res) => {
    res.render('first', {
        tool: 'first',
        featuredChannel: featuredChannels[Math.floor(Math.random() * featuredChannels.length)]
    });
});

app.listen(8083);
