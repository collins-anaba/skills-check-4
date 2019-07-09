require('dotenv').config()
const express = require('express')
controller = require('./controller')
massive = require('massive')
session = require('express-session')


app = express()

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance) 
    console.log('db connected')
})
.catch(error => console.log(error))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7  
    }
}))

app.post('/api/register', controller.register)
app.post('/api/login', controller.login)
app.get('/api/session', controller.session)
app.post('/api/logout', controller.logout)
app.post('/api/post/', controller.postMessage)
app.get('/api/messages', controller.getMessages)


app.use(express.json());

app.listen(process.env.SERVER_PORT,() => {
    console.log(' listening on port 4000');
});