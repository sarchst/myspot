import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Sidebar from './Layouts/Sidebar';

function App() {
  return (
    <div className="App">
      {/* <MiniDrawer /> */}
      <Sidebar />
    </div>
  );
}

export default App;
