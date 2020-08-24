import React from 'react'
import logo from './logo.svg'
import './App.css'
import MainPage from './containers/MainPage'

function App () {
  return (
    <div className='App'>
      <div className='header'>
        <h4>La conjugaison des verbes français</h4>
      </div>
      <MainPage />
    </div>
  )
}

export default App
