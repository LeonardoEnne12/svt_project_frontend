
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import CoursePage from './components/pages/CoursePage';
import Ecomp from './components/pages/Ecomp';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/estudante" element={<CoursePage />} />
          <Route path="/estudante/ECOMP" element={<Ecomp />} />
        </Routes> 
       
      </Layout>
    </Router>
  );
}

export default App;