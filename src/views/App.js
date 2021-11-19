import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar'
import Home from './Pages/Home/Home'
import Sermons from './Pages/Sermons/Sermons'
import Visit from './Pages/Visit/Visit'
import Events from './Pages/Events/Events'
import Gallery from './Pages/Gallery/Gallery'
import VaccineStatement from './Pages/VaccineStatement/VaccineStatement'
import Admin from './Admin/Admin'
import {Route} from 'react-router-dom'
import { SkynetProvider } from '../state/SkynetContext';

function App() {
  return (
    <SkynetProvider>
      <div className="App">
        <Navbar />
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/sermons" component={Sermons} />
          <Route path="/visit" component={Visit} />
          <Route path="/events" component={Events} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/statement-on-vaccines" component={VaccineStatement} />
          <Route path="/admin" component={Admin} />
        </div>
      </div>
    </SkynetProvider>
  );
}

export default App;
