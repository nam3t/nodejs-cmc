import express from 'express'
import bodyParser from "body-parser";
import session from "express-session";

import { validtedEmail, generatePassword, validatePassword } from "./helper";
import User from "./db/User";
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret: 'nodejs cmc',
    // cookie: {secure: true}
}))
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
        const hashedPassword = generatePassword(password)

        const userDB = new User()
        const result = userDB
            .add({ email, username, hashedPassword })
            .list()
        
        req.session.username = username

        // req.session.save(() => {
        //     res.redirect('/dashboard')
        // })

        res.status(200).redirect('dashboard')
        // res.json(result)
    } catch (e) {
        res.status(500).send('Something went wrong')        
    }
})

app.get('/dashboard', (req, res) => {
    const contacts = [
        { username: 'brack obama', email: 'obama@gmail.com'},
        { username: 'rooney wayne', email: 'rooney@gmail.com'},
    ]
    if (!req.session.username) {
        res.redirect('/')
    } else {
        res.render('dashboard', {username: req.session.username, contacts})
    }
})

app.get('/users', (req, res) => {
    const userDB = new User()
    res.json({ users: userDB.list() })
})
app.post('/users', (req, res) => {
    const usersDB = new User()

    const { email, username, password } = req.body
    if (validatePassword(password)) {
        const hashedPassword = generatePassword(password)
        const newUser = { email, username, hashedPassword }
        
        res.json(usersDB.add(newUser).list())
    } else {
        res.status(500).send('Something wrong!!!!')
    }

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
