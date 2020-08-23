import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FinalResult extends PureComponent {
  render () {
    const { result } = this.props
    const totalCorrect = result.filter(item => item['result'] == 'Correct')
      .length
    const totalWrong = result.filter(item => item['result'] == 'Wrong').length
    return (
      <div className='container' style={{ marginTop: '100px' }}>
        <div className='row'>
          <h5>
            Number of correct answers:{' '}
            <span style={{ color: 'green' }}>{totalCorrect}</span>
          </h5>
        </div>
        <div className='row'>
          <h5>
            Number of wrong answers:{' '}
            <span style={{ color: 'red' }}>{totalCorrect}</span>
          </h5>
        </div>

        <hr />
        <div className='container'>
          {result.map(item => {
            if (item['result'] == 'Wrong') {
              return (
                <div className='row'>
                  <div className='col-1'> {item['questionNum'] + 1}</div>
                  <div className='col-2'>
                    {' '}
                    <span style={{ color: 'red' }}>
                      <b>{item['question']['infinitif']}</b>
                    </span>
                  </div>
                  <div className='col-3'>
                    <span style={{ color: 'green' }}>
                      {item['question']['pronom']}
                    </span>{' '}
                    - <span>{item['question']['temp']} de l'indicatif</span>
                  </div>
                  <div className='col-3'>
                    <s>{item['userAnswer']}</s>
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
}

FinalResult.propTypes = {}

export default FinalResult
