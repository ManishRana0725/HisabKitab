import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/header.jsx'
import Pages from './components/mainpages/pages.jsx'
function App() {
  return (
    <Router>
      <Header />
      <Pages/>
  </Router>
  )
}

export default App
