import axios from 'axios'

export async function getCards () {
  let cards = (await axios.get('/data/card.json')).data
  const storageCards = localStorage.getItem('cards')

  if (storageCards) {
    cards = cards.concat(JSON.parse(storageCards))
  }
  return cards
}

export async function putCards (card) {
  let storageCards = localStorage.getItem('cards')

  if (storageCards) {
    storageCards = JSON.parse(storageCards)
    const index = storageCards.findIndex(item => item.id === card.id)

    storageCards[index] = card
    localStorage.setItem('cards', JSON.stringify(storageCards))
  }
}

export async function insertCards (card) {
  let cards = localStorage.getItem('cards')

  if (cards) {
    cards = JSON.parse(cards)
  } else {
    cards = []
  }
  cards.push(card)
  localStorage.setItem('cards', JSON.stringify(cards))
}


export async function getRooms () {
  let rooms = (await axios.get('/data/room.json')).data
  const storageRooms = localStorage.getItem('rooms')

  if (storageRooms) {
    rooms = rooms.concat(JSON.parse(storageRooms))
  }
  return rooms
}