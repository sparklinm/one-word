import axios from 'axios'

export async function getCards () {
  let cards = (await axios.get('/data/card.json')).data
  const storageCards = localStorage.getItem('cards')

  if (storageCards) {
    cards = cards.concat(JSON.parse(storageCards))
  }
  return cards
}