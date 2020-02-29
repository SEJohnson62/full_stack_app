import React, {useState} from 'react';

      const Users = ({ users, things, userThings, destroyUserThing, destroyUser })=> {
        return (
          <section>
            <h2>Users ({ users.length })</h2>
            <ul>
              {
                users.map( user => {
                  return (
                    <li key={ user.id }>
                      { user.name }
                      <button onClick={ ()=> destroyUser(user)}>x</button>
                      <ul>
                        {
                          userThings.filter(userThing => userThing.userId === user.id)
                            .map( userThing => {
                              return (
                                <li key={ userThing.id}>
                                  { things.find(thing => thing.id === userThing.thingId).name }
                                  <button onClick={ ()=> destroyUserThing(userThing)}>x</button>
                                </li>
                              );
                            })
                        }
                      </ul>
                    </li>
                  );
                })
              }
            </ul>
          </section>
        );
      };//end Users

export default Users;
