import React from 'react';
import ReactDOM from 'react-dom/client';

const App = ()=> {
  return (
    <h1>Owners and Their Pets</h1>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
