const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const UPLOAD_CONFIG = require('./utils/multer.config');

const USERS_ROUTERS = require('./routers/users');

const { logTime } = require('./middleware.demo1');

app.use(logTime);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public/'));

app.use('/user', USERS_ROUTERS);

app.get('/', (req, res) => res.json({ message: 'hello worl' }))
app.get('/a', (req, res) => res.json({ message: 'hello worl' }))
app.get('/b', (req, res) => res.json({ message: 'hello worl' }))
app.get('/c', (req, res) => res.json({ message: 'hello worl' }))

/**
 * HANDLE UPLOAD
 */
app.get('/upload-image', (req, res) => {
    res.render('upload-image');
})

app.post('/upload-image-demo', UPLOAD_CONFIG.single('avatar'), (req, res) => {
    const file = req.file;
    console.log({ file })
}); 

app.listen(3000, ()=> console.log(`server started at port 3000`));