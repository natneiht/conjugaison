import React from 'react'
import logo from './logo.svg'
import './App.css'
import MainPage from './containers/MainPage'

function App () {
  // const randArray = generateRandomNumberArray(30, 1, 10900);
  // console.log(randArray);
  // console.log(data);
  // randArray.map((item) => console.log(data[item]["Infinitif"]["Présent"][0]));
  return (
    <div className='App'>
      <div className='header'>
        <h4>Conjugaison des verbes français</h4>
      </div>
      <MainPage />
    </div>
  )
}

export default App
