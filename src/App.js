import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import MiniDrawer from './Layouts/MiniDrawer';

function App() {
  return (
    <div className="App">
      <MiniDrawer />
    </div>
  );
}

export default App;
