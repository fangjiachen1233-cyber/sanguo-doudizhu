import Phaser from 'phaser'
import GameScene from './game/GameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game',
  backgroundColor: '#1e1e1e',
  scene: [GameScene]
}

new Phaser.Game(config)
