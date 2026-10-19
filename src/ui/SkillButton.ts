import Phaser from 'phaser'

export function createSkillButton(scene: Phaser.Scene, x:number, y:number, label:string, cb:()=>void) {
  const bg = scene.add.rectangle(x,y,120,40,0x6b4f2b).setInteractive({useHandCursor:true})
  const txt = scene.add.text(x, y, label, {font:'14px Arial', color:'#fff'}).setOrigin(0.5)
  bg.on('pointerdown', ()=> cb())
  const container = scene.add.container(0,0, [bg, txt])
  container.setPosition(x,y)
  return container
}
