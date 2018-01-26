import express from 'express'
import bodyParser from "body-parser";

import { validtedEmail, hashedPassword } from "./helper";
import User from "./db/User";
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

/**
 * when user request to /
 * render index page
 */
app.get('/', (req, res) => {
    res.render('index')
})

/**
 * return signup page
 */
app.get('/signup', (req, res) => {
    res.render('signup')
})

/**
 * Get data from req.body
 * Data includes email, username and password
 * check not null three fields. If one field null, return throw Bad Request 400
 * check email is valid format. If not, throw Bad Request 400
 * Hashing password SHA256
 * save user to database
 * if save succesfully, return 200
 * if failed, return Genaral Error 500
 */
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body

    if (!username || !password || !email || !validtedEmail(email)) {
        res.status(400).send('Invalid data!!!!!!!')
    }
    try {
        const hashedPassword = hashedPassword(password)

        const userDB = new User()
        const result = userDB
            .add({ email, username, hashedPassword })
            .list()
        
        // res.status(200).render('dashboard')
        res.json(result)
    } catch (e) {
        res.status(500).send('Something went wrong')        
    }
})
app.get('/users', (req, res) => {
    res.send('List users')
})
app.post('/users', (req, res) => {
    res.send('Created users!!!!!!!!!!!!!')
})
app.put('/users', (req, res) => {
    res.send('Updated users!!!!!!!!!!!!!')
})
app.delete('/users', (req, res) => {
    res.send('Deleted users!!!!!!!!!!!!!')
})

app.get('/messages', (req, res) => {
    res.send('List messages')
})
app.post('/messages', (req, res) => {
    res.send('Created messages!!!!!!!!!!!!!')
})
app.put('/messages', (req, res) => {
    res.send('Updated messages!!!!!!!!!!!!!')
})
app.delete('/messages', (req, res) => {
    res.send('Deleted messages!!!!!!!!!!!!!')
})

app.listen(8000, () => console.log('Listening at 8000...'))
