import Phaser from 'phaser'
import { choosePlay } from '../ai/ai'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    // load placeholder portraits (SVGs)
    this.load.svg('guanyu', '/assets/portraits/guanyu.svg')
    this.load.svg('zhuge', '/assets/portraits/zhuge.svg')
    this.load.svg('lvbu', '/assets/portraits/lvbu.svg')
    this.load.svg('sunshang', '/assets/portraits/sunshang.svg')
    this.load.svg('caocao', '/assets/portraits/caocao.svg')
    this.load.svg('zhangfei', '/assets/portraits/zhangfei.svg')
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    // table background
    const table = this.add.rectangle(w/2, h/2, w*0.95, h*0.85, 0x2b4d2b)
    table.setStrokeStyle(4, 0x000000)

    // portraits
    const portraits = ['guanyu','zhuge','lvbu','sunshang','caocao','zhangfei']
    portraits.forEach((key, i)=>{
      const x = 100 + i*150
      const y = 80
      const img = this.add.image(x, y, key).setOrigin(0,0).setDisplaySize(120,180)
      this.add.rectangle(x, y+190, 120, 28, 0x000000, 0.5)
      this.add.text(x+6, y+194, key, {font:'12px Arial', color:'#fff'})
    })

    // placeholder player area
    this.add.text(w/2, h-60, '玩家手牌： [占位]（demo）', {font: '20px Arial', color: '#fff'}).setOrigin(0.5)

    // simple AI demo button
    const btn = this.add.text(w-160, 40, 'AI 出牌示例', {font:'16px Arial', color:'#fff', backgroundColor:'#333'})
      .setPadding(8)
      .setInteractive()
      .on('pointerdown', ()=>{
        const hand = [3,5,7,9,11]
        const play = choosePlay(hand)
        this.showPlay(play)
      })
  }

  showPlay(play: number[] | null) {
    const w = this.scale.width
    this.add.text(w/2, this.scale.height/2, 'AI 出牌: ' + JSON.stringify(play), {font:'18px Arial', color:'#fffa'})
      .setOrigin(0.5)
      .setDepth(10)
  }
}
