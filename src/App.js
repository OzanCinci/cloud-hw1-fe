import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,HashRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar/>
        
          <Routes>
            <Route exact path='/:category' element={<HomePage/>}/>

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
