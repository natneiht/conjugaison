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
      tempList: tempDuVerbe,
      loading: true
    }
  }

  componentDidMount () {
    this.generateQuestions()
  }

  generateQuestions = async () => {
    const { maxVerb, tempList } = this.state
    const promiseList = []
    const tempListKeys = Object.keys(tempList)
    const tempListArray = tempListKeys.filter(item => {
      if (tempList[item] == true) return item
    })
    // console.log(tempListArray)
    // Make random questions and get answers
    const maxCommonVerb = commonVerbs.length - 1
    const randArray = generateRandomNumberArray(maxVerb, 1, maxCommonVerb)

    randArray.forEach(async item => {
      promiseList.push(getAnswer(commonVerbs[item]))
    })
    const answerList = await Promise.all(promiseList)
    // console.log(answerList)
    const questionList = answerList.map(item => {
      const tempNum = getRandomInt(0, tempListArray.length - 1)
      const pronomNum = getRandomInt(0, pronomList.length - 1)

      const temp = tempListArray[tempNum]
      const pronom = pronomList[pronomNum]

      const infinitif = item['Infinitif']['Présent'][0]

      const auxiliary = getAuxiliary(infinitif, temp, pronomNum)
      // console.log(auxiliary)
      if (item['Indicatif'][temp] == undefined) console.log(item)
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

  changeTempStatus = (temp, status) => {
    const { tempList } = this.state
    const newTempList = { ...tempList }
    newTempList[temp] = status
    this.setState({ tempList: newTempList })
  }
  render () {
    const {
      start,
      final,
      maxVerb,
      questionList,
      tempList,
      loading
    } = this.state
    // console.log(questionList)
    if (!(questionList.length > 0)) return <div>Loading...</div>
    const tempListArray = Object.keys(tempList)
    const questionNumList = [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      150,
      200,
      250
    ]
    return (
      <div className='container content-container'>
        {/* {loading && <div>Please wait for a few seconds...</div>} */}
        {!start && (
          <>
            <div className='form-group row'>
              <label htmlFor='maxVerb' className='col-sm-4 col-form-label'>
                How many verbs?
              </label>
              <div className='col-sm-4'>
                {/* <input
                  className='form-control-plaintext'
                  type='text'
                  name='maxVerb'
                  className='form-control'
                  value={maxVerb}
                  onChange={e => this.setState({ maxVerb: e.target.value })}
                /> */}
                <select
                  name='maxVerb'
                  id='maxVerb'
                  className='max-question-select'
                >
                  {questionNumList.map(item => (
                    <option
                      value={item}
                      key={item}
                      onChange={e => this.setState({ maxVerb: e.target.value })}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className='col-sm-4'>
                <button
                  className='btn btn-info main-start-button'
                  onClick={() => {
                    this.setState({ loading: true })
                    this.startTest()
                  }}
                  disabled={loading}
                  // onClick={() => this.generateQuestions()}
                >
                  {loading ? 'Loading...' : 'Start'}
                </button>
              </div>
            </div>
            <div className=' form-group row'>
              <div className='col-sm-4' />
              <div className='col-sm-8 temp-list'>
                {tempListArray.map(item => (
                  <div className='form-check' key={item}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      checked={tempList[item]}
                      onChange={e =>
                        this.changeTempStatus(item, e.target.checked)
                      }
                      id={item}
                    />
                    <span className='form-check-label' htmlFor={item}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
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
