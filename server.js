const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/users', async(req, res, next)=> {
  db.readUsers()
    .then(response => res.send(response))
    .catch(next)
});

app.get('/api/things', async(req, res, next)=> {
  db.readThings()
    .then(response => res.send(response))
    .catch(next)
});

app.get('/api/user_things', async(req, res, next)=> {
  db.readUserThings()
    .then(response => res.send(response))
    .catch(next)
});

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Additional routes here
// POST, DELETE for /api/users
app.post('/api/users', async(req, res, next)=> {
  const name = req.body;
  db.createUser( name )
  .then(response => res.send(response))
  .catch(next)
});

app.delete('/api/users/:id', async(req, res, next)=> {
  db.deleteUser( req.params.id )
  .then(response => res.send(response))
  .catch(next)
})

// POST, DELETE for /api/things
app.post('/api/things', async(req, res, next)=> {
  const name = req.body;
  db.createThing( name )
  .then(response => res.send(response))
  .catch(next)
});

app.delete('/api/things/:id', async(req, res, next)=> {
  db.deleteThing( req.params.id )
  .then(response => res.send(response))
  .catch(next)
});

// POST, DELETE for /api/user_things
app.post('/api/user_things', async(req, res, next)=> {
  db.createUserThings( req.body )
  .then(response => res.send(response))
  .catch(next)
});

app.delete('/api/user_things/:id', async(req, res, next)=> {
  db.deleteUserThing( req.params.id )
  .then(response => res.send(response))
  .catch(next)
});

app.use((req, res, next)=> {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  })
});

app.use((err, req, res, next)=> {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});



const port = process.env.PORT || 3000;

db.sync()
  .then(()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`)
    });
  });
