import { Card, detectHandType, HandType } from './Rules'

export type PlayerState = {
  id: number,
  hand: Card[],
  isAI: boolean,
  role?: 'landlord'|'farmer'
}

export default class GameEngine {
  deck: Card[] = []
  players: PlayerState[] = []
  table: {lastPlay: Card[] | null, lastPlayerId: number | null} = {lastPlay: null, lastPlayerId: null}
  currentPlayer = 0

  constructor(playerCount = 3){
    this.initDeck()
    for (let i=0;i<playerCount;i++){
      this.players.push({id:i, hand:[], isAI:true})
    }
  }

  initDeck(){
    this.deck = []
    // numbers 3..15 (3..A=14,2=15), plus two jokers 16,17
    for (let v=3; v<=15; v++){
      for (let s=0;s<4;s++) this.deck.push(v)
    }
    this.deck.push(16); this.deck.push(17)
    this.shuffle()
  }

  shuffle(){
    for (let i=this.deck.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1))
      const t = this.deck[i]; this.deck[i]=this.deck[j]; this.deck[j]=t
    }
  }

  deal(){
    // deal 17 to each, leave 3 for landlord
    for (let r=0;r<17;r++){
      for (let p=0;p<this.players.length;p++){
        const c = this.deck.pop()!
        this.players[p].hand.push(c)
      }
    }
    // last 3 remain as bottom
  }

  playCards(playerId:number, cards: Card[] | null){
    // null means pass
    if (!cards || cards.length===0){
      // pass
      // if all players passed except the one who played last, clear table
      // simplified: just record pass
      return true
    }
    // remove cards from player's hand
    const ps = this.players.find(p=>p.id===playerId)!
    for (const c of cards){
      const idx = ps.hand.indexOf(c)
      if (idx<0) { console.warn('card not in hand', c); return false }
      ps.hand.splice(idx,1)
    }
    this.table.lastPlay = cards
    this.table.lastPlayerId = playerId
    return true
  }

  isGameOver(){
    return this.players.some(p=>p.hand.length===0)
  }
}
