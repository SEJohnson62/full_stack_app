      import axios from 'axios';
      import React from 'react';
      import Users from './Users.js';
      import Things from './Things.js';
      import UserThingForm from './UserThingForm.js';
      import UserForm from './UserForm.js';
      import ThingForm from './ThingForm.js';

      const { useState, useEffect } = React;

      const App = ()=> {
        const [ error, setError ] = useState('');
        const [users, setUsers] = useState([]);
        const [things, setThings] = useState([]);
        const [userThings, setUserThings] = useState([]);
        const createUserThing = async(userThing)=> {
          try{
            const created = (await axios.post('/api/user_things', userThing)).data;
            setUserThings([...userThings, created]);
            setError('');
          }
          catch(ex){
            setError(ex.response.data.message)
          }
        };
        const createThing = async(thing)=> {
          try{
            const created = (await axios.post('/api/things', thing)).data;
            setThings([...things, created]);
            setError('');
          }
          catch(ex){
            setError(ex.response.data.message)
          }
        };
        const destroyUserThing = async(userThingToDestroy)=> {
          await axios.delete(`/api/user_things/${userThingToDestroy.id}`);
          setUserThings(userThings.filter( userThing => userThing.id !== userThingToDestroy.id));
          setError('');
        };
        const createUser = async(user)=> {
          try{
            const created = (await axios.post('/api/users', user)).data;
            setUsers([...users, created]);
            setError('');
          }
          catch(ex){
            setError(ex.response.data.message)
          }
        };
        const destroyUser = async(userToDestroy)=> {
          try {
            await axios.delete(`/api/users/${userToDestroy.id}`);
            setUsers(users.filter( user => user.id !== userToDestroy.id));
            setError('');
          }
          catch(ex){
            setError(ex.response.data.message)
          }
        };
        const destroyThing = async(thingToDestroy)=> {
          try {
            await axios.delete(`/api/things/${thingToDestroy.id}`);
            setThings(things.filter( thing => thing.id !== thingToDestroy.id));
            setError('');
          }
          catch(ex){
            setError(ex.response.data.message)
          }
        };
        useEffect(()=> {
          Promise.all([
            axios.get('/api/users'),
            axios.get('/api/things'),
            axios.get('/api/user_things'),
          ])
          .then( responses => responses.map( response => response.data))
          .then( results => {
            setUsers(results[0]);
            setThings(results[1]);
            setUserThings(results[2]);
            setError('');
          })
          .catch(ex => setError(ex.response.data.message));
        }, []);
        return (
          <div>
            <h1>Acme Ownership</h1>
            {
              !!error && <div className='error'>{ error }</div>
            }
            <div className='forms'>
              <UserForm createUser={ createUser }/>
              <ThingForm createThing={ createThing } />
              <UserThingForm users={ users } things={ things } createUserThing={ createUserThing}/>
            </div>
            <div className='lists'>
              <Users users={ users } things={ things } userThings={ userThings } destroyUserThing={ destroyUserThing } destroyUser={ destroyUser }/>
              <Things users={ users }  things = { things } userThings={ userThings } destroyUserThing={ destroyUserThing } destroyThing={ destroyThing }/>
            </div>
          </div>
        );
      };
export default App;
