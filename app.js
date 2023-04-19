const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

// const Pool = require('pg').Pool
// const pool = new Pool({
//    user: 'db_486example_user',
//    host: 'dpg-cggkfk02qv28tc48fmk0-a.singapore-postgres.render.com',
//    database: 'db_486example',
//    password: '9N2KSOdKB4W8CADTodmTWPjhp2Ks7Riw',
//    port: 5432,
// })

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://db_486example_user:9N2KSOdKB4W8CADTodmTWPjhp2Ks7Riw@dpg-cggkfk02qv28tc48fmk0-a/db_486example')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cat', (req, res) => {
  const { color, region } = req.query;
  res.send(`Accept Cat Request. Need color = ${color} in ${region}`)
})

app.get('/cat/:subPath', (req, res) => {
  const { subPath } = req.params;
  res.send(`Accept Cat ${subPath} Sub Request.`)
})

// app.get('/students', (req, res) => {
//   pool.query('SELECT * from public.student', (error, results) =>{
//     if (error) { throw error }

//     console.log('DATA:', results.rows)
//     res.json(results.rows)

//   })
// })

app.get('/students', (req, res) => {
  db.any('SELECT * from public.student')
    .then((data) => {
      console.log('DATA:', data)
      res.json(data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
      res.send("ERROR:Can't get data")
    })

})

app.post('/student', (req, res) => {
  console.log('Got body:', req.body);
  const {id} = req.body;
  db.any('select * from public.student where "id" = $1',id)
    .then((data) => {
      console.log('DATA:', data)
      res.json(data)
    })
    .catch((error) => {
      console.log('ERROR:', error)
      res.send("ERROR:Can't get data")
    }) 
});

app.listen(port, () => {
  console.log(`My Example app listening on port ${port}`)
})