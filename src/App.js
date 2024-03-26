import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,HashRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import Account from './Pages/Account';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CreateComputer from './Pages/AddUpdate/CreateComputer';
import CreateVehicle from './Pages/AddUpdate/CreateVehicle';
import CreatePhone from './Pages/AddUpdate/CreatePhone';
import CreatePrivateLesson from './Pages/AddUpdate/CreatePrivateLesson';
import Landing from './Pages/Landing';
import DynamicFields from './Pages/AddUpdate/DynamicFields';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar/>
        
          <Routes>
            <Route exact path='/account' element={<Account/>}/>

            <Route exact path='/add-computer' element={<CreateComputer/>}/>
            <Route exact path='/add-vehicle' element={<CreateVehicle/>}/>
            <Route exact path='/add-phone' element={<CreatePhone/>}/>
            <Route exact path='/add-private-lesson' element={<CreatePrivateLesson/>}/>
            
            <Route exact path='/:category' element={<HomePage/>}/>
            <Route exact path='/update/:category/:id' element={<DynamicFields/>}/>

            
            <Route exact path='/' element={<Landing/>}/>

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
