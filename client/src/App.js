import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import { Homepage } from './pages/homepage';
import { Login } from './pages/login';
import { CharacterCreation } from './pages/characterCreation';
import { Profile } from './pages/profile';
import { AboutUs } from './pages/aboutUs';


function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/character-creator' element={<CharacterCreation />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/about-us' element={<AboutUs />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
