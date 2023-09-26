const pg = require('pg');
const client = new pg.Client('postgres://localhost/owners');
const express = require('express');
const app = express();
const path = require('path');

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

app.get("/api/owners", async(req, res, next) =>{
  try{
    const response = await client.query('SELECT * FROM owners');
    res.send(response.rows)

  } catch(error) {
    next(error)
  }
})

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
  DROP TABLE IF EXISTS pets;
  DROP TABLE IF EXISTS handlers;
  CREATE TABLE handlers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
  );
  CREATE TABLE pets(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    handler_id INTEGER REFERENCES handlers(id)
  );
    INSERT INTO handlers(name) VALUES ('Sara');
    INSERT INTO handlers(name) VALUES ('Corey');
    INSERT INTO handlers(name) VALUES ('Eddie');
    INSERT INTO pets(name) VALUES ('Bear');
    INSERT INTO pets(name) VALUES ('Boots');
    INSERT INTO pets(name) VALUES ('Spinx');

  `;
  //console.log('create your tables and seed data');
  await client.query(SQL);

  const port = process.env.PORT || 2600;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
