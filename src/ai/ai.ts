// src/ai/ai.ts

/**
 * 非常简单的启发式出牌示例：
 * - hand: array of numbers representing card ranks (示例简化)
 * - 返回要出的牌（array）或 null 表示过牌
 */
export function choosePlay(hand: number[]): number[] | null {
  if (!hand || hand.length === 0) return null
  // 简单策略：如果有 11（J）或更高则出最大的一个
  const high = hand.filter(v=>v>=11)
  if (high.length>0) return [Math.max(...high)]
  // 否则出最小的单张
  return [Math.min(...hand)]
}
