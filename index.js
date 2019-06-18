const express = require('express');
const app = express();

const USERS_ROUTERS = require('./routers/users');

const { logTime } = require('./middleware.demo1');

app.use(logTime);

app.use('/user', USERS_ROUTERS);

app.get('/', (req, res) => res.json({ message: 'hello worl' }))
app.get('/a', (req, res) => res.json({ message: 'hello worl' }))
app.get('/b', (req, res) => res.json({ message: 'hello worl' }))
app.get('/c', (req, res) => res.json({ message: 'hello worl' }))

app.listen(3000, ()=> console.log(`server started at port 3000`));