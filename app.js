const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://db_486example_user:9N2KSOdKB4W8CADTodmTWPjhp2Ks7Riw@dpg-cggkfk02qv28tc48fmk0-a/db_486example')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cat', (req, res) => {
  res.send('Accept Cat Request. Yeh')
})

app.get('/students', (req, res) => {
  db.any('SELECT * from public.student')
  .then((data) => {
    console.log('DATA:', data)
    res.send('Will find student information',data)
  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.send ("ERROR:Can't get data")
  })
  
})

app.listen(port, () => {
  console.log(`My Example app listening on port ${port}`)
})