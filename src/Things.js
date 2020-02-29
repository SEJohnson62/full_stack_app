import React, {useState} from 'react';

      const Things = ({ things, users, userThings, destroyUserThing, destroyThing })=> {
        return (
          <section>
            <h2>Things ({ things.length })</h2>
            <ul>
              {
                things.map( thing => {
                  return (
                    <li key={ thing.id }>
                      { thing.name }
                      <button onClick={ ()=> destroyThing(thing)}>x</button>

                      <ul>
                        {
                          userThings.filter(userThing => userThing.thingId === thing.id)
                            .map( userThing => {
                              return (
                                <li key={ userThing.id}>
                                  { users.find(user => user.id === userThing.userId).name }
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
      };// end Things

export default Things;
