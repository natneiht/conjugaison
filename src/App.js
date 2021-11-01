import React from 'react'
import './App.css'
import MainPage from './containers/MainPage'
require('dotenv').config()

function App () {
  console.clear()
  return (
    <div className='App'>
      <div className='header'>
        <h4>La conjugaison des verbes français</h4>
      </div>
      <MainPage />
      <div className='footer'>Par Huynh Thien Tan - 2020</div>
    </div>
  )
}

export default App
