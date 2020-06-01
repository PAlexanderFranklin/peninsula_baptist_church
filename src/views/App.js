import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar'
import Home from './Pages/Home/Home'
import Gallery from './Pages/Gallery/Gallery'
import Visit from './Pages/Visit/Visit'
import Events from './Pages/Events/Events'
import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Route path="/" exact component={Home} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/visit" component={Visit} />
        <Route path="/events" component={Events} />
      </div>
    </div>
  );
}

export default App;
