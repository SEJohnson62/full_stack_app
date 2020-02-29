import React, {useState} from 'react';

      const UserForm = ({ createUser })=> {
        const [name, setName] = useState('');
        const onSubmit = (ev)=> {
          ev.preventDefault();
          createUser({ name });
        };
        return (
          <section>
            <form onSubmit={ onSubmit }>
              <h2>Create User</h2>
              <input value={ name } onChange={ ev => setName(ev.target.value)} />
              <button>Create</button>
            </form>
          </section>
        );
      };

      export default UserForm;
