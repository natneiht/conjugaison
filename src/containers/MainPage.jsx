import React, { PureComponent } from 'react'
// import data from '../data/verbs.json'
import {
  generateRandomNumberArray,
  getRandomInt,
  getAnswer,
  getAuxiliary
} from '../functions'
import { tempDuVerbe, pronomList, verbWithEtre } from '../appConstants'
import PropTypes from 'prop-types'
import TestArea from '../components/TestArea'
import { db } from '../database'
import { commonVerbs } from '../commonVerb'

class MainPage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      start: false,
      final: false,
      maxVerb: 20,
      questionList: [],
      loading: true
    }
  }

  componentDidMount () {
    this.generateQuestions()
  }

  generateQuestions = async () => {
    const { maxVerb } = this.state
    const promiseList = []

    // Make random questions and get answers
    const maxCommonVerb = commonVerbs.length - 1
    const randArray = generateRandomNumberArray(maxVerb, 1, maxCommonVerb)

    randArray.forEach(async item => {
      promiseList.push(getAnswer(commonVerbs[item]))
    })
    const answerList = await Promise.all(promiseList)
    // console.log(answerList)
    const questionList = answerList.map(item => {
      const tempNum = getRandomInt(0, tempDuVerbe.length - 1)
      const pronomNum = getRandomInt(0, pronomList.length - 1)

      const temp = tempDuVerbe[tempNum]
      const pronom = pronomList[pronomNum]

      const infinitif = item['Infinitif']['Présent'][0]

      const auxiliary = getAuxiliary(infinitif, temp, pronomNum)
      // console.log(auxiliary)
      // if (item['Indicatif'][temp] == undefined) console.log(item)
      return {
        infinitif,
        temp,
        pronom,
        auxiliary,

        answer: item['Indicatif'][temp][pronomNum]
      }
    })
    // console.log(questionList)
    this.setState({ questionList, loading: false })
  }

  startTest = async () => {
    await this.generateQuestions()
    this.setState({ start: true })
  }

  render () {
    const { start, final, maxVerb, questionList, loading } = this.state
    // console.log(questionList)
    if (!(questionList.length > 0)) return <div>Loading...</div>
    return (
      <div className='container' style={{ marginTop: '100px' }}>
        {/* {loading && <div>Please wait for a few seconds...</div>} */}
        {!start && (
          <div className='form-group row'>
            <label htmlFor='maxVerb' className='col-sm-2 col-form-label'>
              Number of verbs?
            </label>
            <div className='col-sm-10'>
              <input
                className='form-control-plaintext'
                type='text'
                name='maxVerb'
                className='form-control'
                value={maxVerb}
                onChange={e => this.setState({ maxVerb: e.target.value })}
              />
            </div>
            <div
              className='row'
              style={{ marginTop: '25px', textAlign: 'center' }}
            >
              <center>
                <button
                  className='btn btn-info'
                  onClick={() => {
                    this.setState({ loading: true })
                    this.startTest()
                  }}
                  disabled={loading}
                  // onClick={() => this.generateQuestions()}
                >
                  {loading ? 'Loading...' : 'Start'}
                </button>
              </center>
            </div>
          </div>
        )}
        {start && !loading && (
          <TestArea
            totalQuestion={Number(maxVerb)}
            questionList={questionList}
          />
        )}
      </div>
    )
  }
}

MainPage.propTypes = {}

export default MainPage
