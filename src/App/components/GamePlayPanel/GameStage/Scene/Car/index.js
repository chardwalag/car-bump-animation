
import { Sprite } from 'pixi.js'

import { Globals } from '../../Globals'
import { IncomingObject } from '../IncomingObject'
import { coordinate, roughness, speed } from './data'


export const CarPosition = {
  CENTER: 'car_center', LEFT: 'car_left', RIGHT: 'car_right',
  ENEMYCENTER: 'enemy_center', ENEMYLEFT: 'enemy_left', ENEMYRIGHT: 'enemy_right',
}

export class Car {
  constructor( position = CarPosition.CENTER ) {
    this.position = position
    this.create()
  }

  create() {
    this.sprite = new Sprite( Globals.Resources.images[ this.position ].texture )
    this.sprite.x = coordinate[ this.position ].x
    this.sprite.y = coordinate[ this.position ].y
    this.sprite.scale.set( coordinate[ this.position ].scale )
    if ( !this.isEnemy()) this.sprite.zIndex = 1
  }

  move( x ) {
    if ( x < this.sprite.x ) {
      switch ( this.position ) {
      case CarPosition.LEFT: this.position = CarPosition.CENTER; break
      case CarPosition.CENTER: this.position = CarPosition.RIGHT; break
      default: break
      }
    }
    else {
      switch ( this.position ) {
      case CarPosition.RIGHT: this.position = CarPosition.CENTER; break
      case CarPosition.CENTER: this.position = CarPosition.LEFT; break
      default: break
      }
    }
    this.sprite.destroy()
    this.create()
    return this
  }

  update() {
    if ( this.isEnemy()) return IncomingObject.move( this.sprite, speed )
    this.sprite.y = coordinate[ this.position ].y - Math.random() * roughness
    return true
  }

  get lane() {
    switch ( this.position ) {
    case CarPosition.RIGHT: case CarPosition.ENEMYLEFT: return 0
    case CarPosition.CENTER: case CarPosition.ENEMYCENTER: return 1
    case CarPosition.LEFT: case CarPosition.ENEMYRIGHT: return 2
    default: return -1
  }
  }

  isEnemy() {
    switch ( this.position ) {
    case CarPosition.LEFT: case CarPosition.CENTER: case CarPosition.RIGHT: return false
    default: return true
    }
  }

  checkCollision( enemy ) {
    if (
      enemy.sprite.y >= this.sprite.y &&
      ( enemy.sprite.y + enemy.sprite.height < this.sprite.y + this.sprite.height ) &&
      this.lane === enemy.lane 
    ) {
console.log( 'collision' )
      this.collidedWith = enemy
      this.sprite.emit( 'collision' )
    }
  }
}
