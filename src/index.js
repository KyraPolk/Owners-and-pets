import React from 'react';
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import axios from 'axios'

const App = ()=> {
  const [pets, setPets] = useState([])
  const [handlers, setHandlers] = useState([])
//for handlers
  useEffect(() =>{
    const fetchHandlers = async() => {
      const response = await axios.get('/api/handlers')
      console.log(response.data)
      setHandlers(response.data)
    }
    fetchHandlers()
  }, []);

  //for pets

  return (
    <div>
      <h1>Owners and Their Pets</h1>
      <section>
        <div>
          <h2>Handlers ({handlers.length})</h2>
          <ul>
            {
            handlers.map(handler => {
              return (
                <li key={handler.id}>
                  { handler.name }
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h2>Pets({pets.length})</h2>
        </div>
      </section>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
