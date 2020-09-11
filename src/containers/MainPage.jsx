import React, { PureComponent } from 'react'
import {
  generateRandomNumberArray,
  getRandomInt,
  getAnswer,
  getAuxiliary
} from '../functions'
import { sampleTempsList, pronomList, questionNumList } from '../appConstants'
import TestArea from '../components/TestArea'
import { commonVerbs } from '../commonVerb'

class MainPage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      start: false,
      final: false,
      maxVerb: 20,
      questionList: [],
      tempsList: sampleTempsList,
      loading: true
    }
  }

  componentDidMount () {
    try {
      const localTempsList = JSON.parse(localStorage.getItem('tempsList'))
      if (localTempsList) this.setState({ tempsList: localTempsList })
    } catch {
      localStorage.clear()
      this.setState({ tempsList: sampleTempsList })
    }
    this.generateQuestions()
  }

  generateQuestions = async () => {
    const { maxVerb, tempsList } = this.state
    const promiseList = []
    const tempsListKeys = Object.keys(tempsList)
    const tempsListArray = tempsListKeys.filter(item => {
      if (tempsList[item] === true) return item
    })

    // Generate a random array of question number
    const maxCommonVerb = commonVerbs.length - 1
    const randArray = generateRandomNumberArray(maxVerb, 1, maxCommonVerb)

    randArray.forEach(async item => {
      // Get question contents
      promiseList.push(getAnswer(commonVerbs[item]))
    })

    // Fetch answer from database
    const answerList = await Promise.all(promiseList)

    // Generate random pronoun and tense
    const questionList = answerList.map(item => {
      const tempsNum = getRandomInt(0, tempsListArray.length - 1)
      const pronomNum = getRandomInt(0, pronomList.length - 1)

      const temps = tempsListArray[tempsNum]
      const pronom = pronomList[pronomNum]

      const infinitif = item['Infinitif']['Présent'][0]

      // Check auxiliary (if it has)
      const auxiliary = getAuxiliary(infinitif, temps, pronomNum)

      if (item['Indicatif'][temps] === undefined) console.log(item) // Check error verbs

      // Finall array of questions and their answers
      return {
        infinitif,
        temps,
        pronom,
        auxiliary,
        answer: item['Indicatif'][temps][pronomNum]
      }
    })

    this.setState({ questionList, loading: false })
  }

  startTest = async () => {
    await this.generateQuestions()
    this.setState({ start: true })
  }

  changeTempStatus = (temps, status) => {
    const { tempsList } = this.state
    const newTempsList = { ...tempsList }
    newTempsList[temps] = status
    // Save "temps" option for next time
    localStorage.setItem('tempsList', JSON.stringify(newTempsList))

    this.setState({ tempsList: newTempsList })
  }

  render () {
    const { start, maxVerb, questionList, tempsList, loading } = this.state
    if (!(questionList.length > 0)) return <div>Chargement...</div>
    const tempsListArray = Object.keys(tempsList)

    return (
      <div className='container content-container'>
        {!start && (
          <>
            <div className='form-group row'>
              <label htmlFor='maxVerb' className='col-sm-4 col-form-label'>
                Nombre de verbes:
              </label>
              <div className='col-sm-4'>
                <select
                  name='maxVerb'
                  id='maxVerb'
                  className='max-question-select'
                  onChange={e => this.setState({ maxVerb: e.target.value })}
                  value={maxVerb}
                >
                  {questionNumList.map(item => (
                    <option value={item} key={item}>
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
                >
                  {loading ? 'Chargement...' : 'Démarrer'}
                </button>
              </div>
            </div>
            <div className=' form-group row'>
              <div className='col-sm-4' />
              <div className='col-sm-8 temps-list'>
                {tempsListArray.map(item => (
                  <div className='form-check' key={item}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      checked={tempsList[item]}
                      onChange={e =>
                        this.changeTempsStatus(item, e.target.checked)
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
