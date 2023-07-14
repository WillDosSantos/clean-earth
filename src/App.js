import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddListing from './components/AddListing';
import ListingDetails from './components/ListingDetails';
import ListingsPage from './components/ListingsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Com|Unity</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/add" element={<AddListing />} />
          <Route path="/listing/:id" element={<ListingDetails />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
