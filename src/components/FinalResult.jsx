import React, { useState } from 'react'
import PropTypes from 'prop-types'

function FinalResult (props) {
  // Get result from Test page (TestArea) as an array
  const result = props.result

  //

  const [showAll, setshowAll] = useState(false)

  // Count result
  const totalCorrect = result.filter(item => item['result'] === 'Correct')
    .length
  const wrongAnswerOnly = result.filter(item => item['result'] === 'Wrong')

  const totalWrong = wrongAnswerOnly.length

  const renderList = showAll ? result : wrongAnswerOnly

  console.log(showAll)
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
      <div className='row'>
        <a href='/'>
          <h5>Réessayer</h5>
        </a>
      </div>

      <hr />
      <div className='row'>
        <h5>Détail</h5>
      </div>
      <div className='row checkbox'>
        <label>
          <input
            type='checkbox'
            value={showAll}
            onChange={e => setshowAll(e.target.checked)}
          />{' '}
          Afficher toutes les réponses
        </label>
      </div>
      <hr />

      <div className='container'>
        {renderList.map(item => {
          const questionResult =
            item['result'] === 'Correct' ? 'correct' : 'wrong'

          return (
            <div className='row' key={item['questionNum']}>
              <div className='col-1'> {item['questionNum'] + 1}</div>
              <div className='col-2'>
                {' '}
                <span className={questionResult}>
                  <b>{item['question']['infinitif']}</b>
                </span>
              </div>
              <div className='col-3'>
                <span className='correct'>{item['question']['pronom']}</span> -{' '}
                <span>{item['question']['temps']}</span>
              </div>
              <div className='col-3'>
                {questionResult === 'correct' && (
                  <span className={questionResult}>{item['userAnswer']}</span>
                )}
                {questionResult === 'wrong' && (
                  <s>{item['userAnswer'] ? item['userAnswer'] : '-'}</s>
                )}
              </div>
              <div className='col-3'>
                {questionResult === 'wrong' && item['answer']}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

FinalResult.propTypes = {
  result: PropTypes.array.isRequired
}

export default FinalResult
