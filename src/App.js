import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddListing from './components/AddListing';
import ListingDetails from './components/ListingDetails';
import ListingsPage from './components/ListingsPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <h1>Com|Unity</h1>
      </header>
        <Link to="/add">Add Listing</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/add" element={<AddListing />} />
          <Route path="/listing/:id" element={<ListingDetails />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
