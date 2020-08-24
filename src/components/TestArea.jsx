import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FinalResult from './FinalResult'
import meaning from '../translation.json'
import { specialCharacters } from '../appConstants'

class TestArea extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      final: false,
      currentQuestion: 0,
      currentAnswer: '',
      totalCorrect: 0,
      totalWrong: 0,
      showMeTheMeaning: false,
      result: []
    }
  }

  checkAnswer = ans => {
    const {
      currentQuestion,
      currentAnswer,
      result,
      totalCorrect,
      totalWrong
    } = this.state
    const { questionList } = this.props
    const questionContent = questionList[currentQuestion]

    const needAux = questionContent['auxiliary']
      ? `${questionContent['auxiliary']} `
      : ''
    const correctAnswer = needAux + questionContent['answer']

    const newResult = [...result]

    if (currentAnswer == correctAnswer) {
      newResult.push({
        questionNum: currentQuestion,
        result: 'Correct',
        question: questionContent,
        answer: correctAnswer,
        userAnswer: currentAnswer
      })

      this.setState({ result: newResult, totalCorrect: totalCorrect + 1 })

      this.moveNextQuestion()
    } else {
      newResult.push({
        questionNum: currentQuestion,
        result: 'Wrong',
        question: questionContent,
        answer: correctAnswer,
        userAnswer: currentAnswer
      })

      this.setState({
        result: newResult,
        totalWrong: totalWrong + 1,
        currentAnswer: ''
      })

      this.moveNextQuestion()
    }
  }

  moveNextQuestion = () => {
    const { currentQuestion } = this.state
    const { totalQuestion } = this.props
    if (currentQuestion < totalQuestion - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        currentAnswer: '',
        showMeTheMeaning: false
      })
    } else {
      this.setState({ final: true })
    }
  }

  render () {
    const {
      currentQuestion,
      currentAnswer,
      final,
      totalCorrect,
      totalWrong,
      showMeTheMeaning,
      result
    } = this.state
    const { questionList, totalQuestion } = this.props
    // console.log(questionList)
    const questionContent = questionList[currentQuestion]
    // console.log(questionContent)
    // console.log(result)

    if (final) return <FinalResult result={result} />

    return (
      <div
        className='container content-container
'
      >
        <div className='row'>
          <div className='col-6 align-left'>
            <h3>
              {currentQuestion + 1} / {totalQuestion}
            </h3>
          </div>
          <div className='col-6 align-right'>
            Correct: <span className='correct'>{totalCorrect}</span> | Wrong:{' '}
            <span className='wrong'>{totalWrong}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <b>
              <h4 className='pronom-highlight'>{questionContent['pronom']}</h4>
            </b>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <span>
              <h3>{questionContent['infinitif']}</h3>
            </span>{' '}
            <span className='show-meaning'>
              {showMeTheMeaning ? (
                <h4>({meaning[questionContent['infinitif']]})</h4>
              ) : (
                <span onClick={() => this.setState({ showMeTheMeaning: true })}>
                  <b>[?]</b>
                </span>
              )}
            </span>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <b>
              <h4>
                {questionContent['temp'] == 'Imparfait'
                  ? `à l'Imparfait`
                  : `au ${questionContent['temp']}`}{' '}
                de l'indicatif
              </h4>
            </b>
          </div>
        </div>

        <div className='row'>
          <input
            type='text'
            className='form-control'
            value={currentAnswer}
            onChange={e => this.setState({ currentAnswer: e.target.value })}
          />
          {specialCharacters.map(item => (
            <button
              className='btn btn-light'
              key={item}
              onClick={() =>
                this.setState({ currentAnswer: currentAnswer + item })
              }
            >
              {item}
            </button>
          ))}
        </div>
        <div className='row' style={{ marginTop: '10px' }}>
          <div className='col-12'>
            <button
              className='btn btn-info'
              onClick={() => {
                this.checkAnswer()
              }}
            >
              {currentQuestion < totalQuestion - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

TestArea.propTypes = {
  totalQuestion: PropTypes.number,
  questionList: PropTypes.array.isRequired
}

export default TestArea
