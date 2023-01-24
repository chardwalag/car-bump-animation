
import { AnimatedSprite } from 'pixi.js'

import { Globals } from '../../Globals'
import { x, y, scale, animation } from './data'


export class Road {
  constructor() {
    const { road1, road2 } = Globals.Resources.images
    this.sprite = new AnimatedSprite([ road1.texture, road2.texture ])
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.scale.set( scale )
    this.sprite.loop = true
    this.sprite.animationSpeed = animation
    this.sprite.play()
  }
}