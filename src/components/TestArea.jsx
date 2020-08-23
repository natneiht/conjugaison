import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FinalResult from './FinalResult'

class TestArea extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      final: false,
      currentQuestion: 0,
      currentAnswer: '',
      totalCorrect: 0,
      totalWrong: 0,
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
      this.setState({ currentQuestion: currentQuestion + 1, currentAnswer: '' })
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
      result
    } = this.state
    const { questionList, totalQuestion } = this.props
    // console.log(questionList)
    const questionContent = questionList[currentQuestion]
    // console.log(questionContent)
    // console.log(result)

    if (final) return <FinalResult result={result} />

    return (
      <div style={{ marginTop: '100px' }}>
        <div className='row'>
          <div className='col-6'>
            <h3>
              {currentQuestion + 1} / {totalQuestion}
            </h3>
          </div>
          <div className='col-6'>
            Correct: {totalCorrect} | Wrong: {totalWrong}
          </div>
        </div>
        <div style={{ color: 'green' }}>
          <b>
            <h4>{questionContent['pronom']}</h4>
          </b>
        </div>

        <h3>{questionContent['infinitif']}</h3>

        <b>
          <h4>au {questionContent['temp']} de l'indicatif</h4>
        </b>
        <input
          type='text'
          className='form-control'
          value={currentAnswer}
          onChange={e => this.setState({ currentAnswer: e.target.value })}
        />
        <button
          className='btn btn-info'
          onClick={() => {
            this.checkAnswer()
          }}
        >
          Check
        </button>
      </div>
    )
  }
}

TestArea.propTypes = {
  totalQuestion: PropTypes.number,
  questionList: PropTypes.array.isRequired
}

export default TestArea
