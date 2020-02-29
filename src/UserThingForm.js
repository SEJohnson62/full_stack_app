import React, {useState} from 'react';

const UserThingForm = ({ things, users, createUserThing })=> {
  const [thingId, setThingId] = useState('');
  const [userId, setUserId] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    createUserThing({ thingId, userId });
  };
  return (
    <section>
      <form onSubmit={ onSubmit }>
        <h2>Create User Thing</h2>
        <select value={ thingId } onChange={ ev => setThingId(ev.target.value)}>
          <option value=''>-- choose thing --</option>
          {
            things.map( thing => {
              return (
                <option value={ thing.id } key={ thing.id }>
                  { thing.name }
                </option>
              );
            })
          }
        </select>
        <select value={ userId } onChange={ ev => setUserId(ev.target.value)}>
          <option value=''>-- choose user --</option>
          {
            users.map( user => {
              return (
                <option value={ user.id } key={ user.id }>
                  { user.name }
                </option>
              );
            })
          }
        </select>
        <button>Create</button>
      </form>
    </section>
  );
};//end UserThingForm

export default UserThingForm;
