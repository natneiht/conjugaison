import React from 'react'
import PropTypes from 'prop-types'

function FinalResult (props) {
  // Get result from Test page (TestArea) as an array
  const result = props.result

  // Count result
  const totalCorrect = result.filter(item => item['result'] === 'Correct')
    .length
  const totalWrong = result.filter(item => item['result'] === 'Wrong').length

  return (
    <div className='container content-container'>
      <div className='row'>
        <h5>
          Nombre de bonnes réponses:{' '}
          <span className='correct'>{totalCorrect}</span>
        </h5>
      </div>
      <div className='row'>
        <h5>
          Nombre de mauvaises réponses:{' '}
          <span className='wrong'>{totalWrong}</span>
        </h5>
      </div>

      <hr />

      <div className='container'>
        {result.map(item => {
          if (item['result'] === 'Wrong') {
            return (
              <div className='row' key={item['questionNum']}>
                <div className='col-1'> {item['questionNum'] + 1}</div>
                <div className='col-2'>
                  {' '}
                  <span className='wrong'>
                    <b>{item['question']['infinitif']}</b>
                  </span>
                </div>
                <div className='col-3'>
                  <span className='correct'>{item['question']['pronom']}</span>{' '}
                  - <span>{item['question']['temp']} de l'indicatif</span>
                </div>
                <div className='col-3'>
                  <s>{item['userAnswer'] ? item['userAnswer'] : '-'}</s>
                </div>
                <div className='col-3'>{item['answer']}</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

FinalResult.propTypes = {
  result: PropTypes.array.isRequired
}

export default FinalResult
