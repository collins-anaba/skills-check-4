require('dotenv').config()
const express = require('express')
controller = require('./controller')
massive = require('massive')

app = express()

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance) 
    console.log('db connected')
})
.catch(error => console.log(error))


let {  SESSION_SECRET } = process.env;

app.use(express.json());

app.listen(process.env.SERVER_PORT,() => {
    console.log(' listening on port 4000');
});