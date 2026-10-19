export type Card = number // 3-15 (3..10,J,Q,K, A=14,2=15), 16=小王,17=大王

export enum HandType {
  PASS = 'PASS',
  SINGLE = 'SINGLE',
  PAIR = 'PAIR',
  TRIPLET = 'TRIPLET',
  STRAIGHT = 'STRAIGHT',
  BOMB = 'BOMB',
  UNKNOWN = 'UNKNOWN'
}

// Simple detector: recognizes single, pair, triplet, bomb (4 of a kind), straight (len>=5 consecutive)
export function detectHandType(cards: Card[]): {type: HandType, primary?: number, length?: number} {
  if (!cards || cards.length === 0) return {type: HandType.PASS}
  const counts = new Map<number, number>()
  for (const c of cards) counts.set(c, (counts.get(c)||0)+1)
  const values = Array.from(counts.keys()).sort((a,b)=>a-b)
  // bomb
  if (Array.from(counts.values()).some(v=>v>=4)) return {type: HandType.BOMB, primary: values[0]}
  // triplet
  if (cards.length===3 && counts.size===1) return {type: HandType.TRIPLET, primary: values[0]}
  // pair
  if (cards.length===2 && counts.size===1) return {type: HandType.PAIR, primary: values[0]}
  // single
  if (cards.length===1) return {type: HandType.SINGLE, primary: cards[0]}
  // straight detection (simplified: all single counts and consecutive)
  if (cards.length>=5 && Array.from(counts.values()).every(v=>v===1)){
    let sorted = cards.slice().sort((a,b)=>a-b)
    let ok = true
    for (let i=1;i<sorted.length;i++){
      if (sorted[i] !== sorted[i-1]+1) { ok = false; break }
    }
    if (ok) return {type: HandType.STRAIGHT, primary: sorted[sorted.length-1], length: sorted.length}
  }
  return {type: HandType.UNKNOWN}
}
