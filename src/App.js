import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Sidebar from './components/Sidebar';
import Appbar from './components/Appbar';

function App() {
  return (
    <div className="App">
      <Appbar />
      <Sidebar />
    </div>
  );
}

export default App;
