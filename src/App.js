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
      <MainPage />
    </div>
  )
}

export default App
