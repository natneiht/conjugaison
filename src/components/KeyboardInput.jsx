import React from 'react'
import { specialCharacters } from '../appConstants'

export default function KeyboardInput(props) {
    return (
        <div>
                      {specialCharacters.map(item => (
            <button
              className='btn btn-light'
              key={item}
              onClick={() =>
                props.insertSymbol(item)
              }
            >
              {item}
            </button>
          ))}
        </div>
    )
}
