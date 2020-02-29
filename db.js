const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

client.connect();

const sync = async()=> {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS user_things;
  DROP TABLE IF EXISTS things;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    CHECK (length(name) > 0)
  );
  CREATE TABLE things(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL
  );
  CREATE TABLE user_things(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id),
    "thingId" UUID REFERENCES things(id),
    UNIQUE ("userId", "thingId")
  );
  `
  await client.query(SQL);
  const [ lucy, moe, car, hammer ] = await Promise.all([
    createUser({ name: 'Lucy'}),
    createUser({ name: 'Moe'}),
    createThing({ name: 'car'}),
    createThing({ name: 'hammer'})
  ]);
  await Promise.all([
    createUserThings({ userId: lucy.id, thingId: car.id})
  ])
};

const createUser = async({ name }) => {
  const SQL = 'INSERT INTO users(name) VALUES($1) RETURNING *';
  return (await client.query(SQL, [name])).rows[0];
};

const createThing = async({ name }) => {
  const SQL = 'INSERT INTO things(name) VALUES($1) RETURNING *';
  return (await client.query(SQL, [name])).rows[0];
}

const createUserThings = async({ userId, thingId }) => {
  const SQL = 'INSERT INTO user_things("userId", "thingId") VALUES($1, $2) RETURNING *';
  return (await client.query(SQL, [userId, thingId])).rows[0];
}

const readUsers = async() => {
  return (await client.query('SELECT * FROM users')).rows;
};

const readThings = async() => {
  return (await client.query('SELECT * FROM things')).rows;
};

const readUserThings = async() => {
  return (await client.query('SELECT * FROM user_things')).rows;
};

const deleteUser = async(userId) => {
  const SQL = 'DELETE FROM users WHERE id = $1';
  return (await client.query(SQL, [userId])).rows;
}

const deleteThing = async(thingId) => {
  const SQL = 'DELETE FROM things WHERE id = $1';
  return (await client.query(SQL, [thingId])).rows;
}

const deleteUserThing = async(id) => {
  const SQL = 'DELETE FROM user_things WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
}

module.exports = {
  sync,
  readUsers,
  readThings,
  readUserThings,
  createUser,
  createThing,
  createUserThings,
  deleteUser,
  deleteThing,
  deleteUserThing
};
