import React from 'react';
import Post from './components/Post';
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
