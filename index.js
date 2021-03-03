const express = require('express');
const morgan = require('morgan');
const app = express();

function logger(req, res, next) {
    console.log('Request Received');
    console.log(`Route Received : ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// Settings
app.set('AppName', 'Express Tutorial');
app.set('port', 4000);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    res.send('Finish');
    next();
});

app.get('/', (req, res) => {
    const data = [{ name: 'jhon' }, { name: 'joe' }, { name: 'jack' }];
    res.render('index.ejs', { people: data });
});

app.get('/get', (req, res) => {
    res.send('GET REQUEST RECEIVED');
});

app.post('/post', (req, res) => {
    res.send('POST REQUEST RECEIVED');
});

app.put('/put', (req, res) => {
    res.send('PUT REQUEST RECEIVED');
});

app.delete('/delete', (req, res) => {
    res.send('DELETE REQUEST RECEIVED');
});

app.get('/user', (req, res) => {
    res.json({
        username: 'Raccoon',
        password: '1234',
        phone: '+56912345678'
    });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
});

app.put('/user/:id', (req, res) => {
    res.send(`User : ${req.params.id} update`);
});

app.delete('/user/:id', (req, res) => {
    res.send(`User : ${req.params.id} delete`);
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('AppName'));
    console.log(`Server on port ${app.get('port')}`);
});