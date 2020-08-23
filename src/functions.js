import { db } from './database'
import {
  verbWithEtre,
  composeTemp,
  tempOfAuxiliary,
  auxConjugaison
} from './appConstants'

export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function generateRandomNumberArray (arrSize, min, max) {
  let randomArray = []
  while (randomArray.length < arrSize) {
    const randNum = getRandomInt(min, max)
    if (!randomArray.includes(randNum)) randomArray.push(randNum)
  }
  return randomArray
}

export function getAnswer (verb) {
  return new Promise((resolve, reject) => {
    db.ref(verb)
      .once('value')
      .then(snapshot => resolve(snapshot.val()))
      .catch(err => reject(err))
  })
}

export function getAuxiliary (verb, temp, pronom) {
  const aux = verbWithEtre.includes(verb) ? 'être' : 'avoir'
  if (composeTemp.includes(temp)) {
    const convertedTemp = tempOfAuxiliary[temp]
    // console.log(convertedTemp)
    return auxConjugaison[aux]['Indicatif'][convertedTemp][pronom]
  } else {
    return null
  }
}
