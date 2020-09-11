import { db } from './database'
import {
  verbWithEtre,
  composeTemps,
  tempsOfAuxiliary,
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

export function getAuxiliary (verb, temps, pronom) {
  const aux = verbWithEtre.includes(verb) ? 'être' : 'avoir'
  if (composeTemps.includes(temps)) {
    const convertedTemps = tempsOfAuxiliary[temps]
    // console.log(convertedTemps)
    return auxConjugaison[aux]['Indicatif'][convertedTemps][pronom]
  } else {
    return null
  }
}
