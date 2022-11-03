import express, {Application, Request, Response, NextFunction} from 'express'
import mysql from 'mysql'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4585',
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MySql Connected...')
})

const app: Application = express()

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'create database instagramdb'
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.log(result)
        res.send('database created...')
    })

})

const add = (a: number, b: number): number => a + b 

app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.listen(5000, () => console.log('Server running'))