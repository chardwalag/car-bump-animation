
import { Container, Sprite } from 'pixi.js'

import { Globals } from '../Globals'
import { Road } from './Road'
import { Surroundings } from './Surroundings'
import { Car, CarPosition } from './Car'
import { Explosion } from './Explosion'
import {
  backgroundWidth, backgrounHeight, mountainX, mountainY, mountainWidth, mountainHeight,
  whenCarsExploded,
  restartTime,
} from './data'


export class Scene {
  constructor() {
console.log( 'starting...' )
    this.container = new Container()
    this.container.sortableChildren = true
    this.createBackground()
    this.createRoad()
    this.createSurroundings()
    this.createCar()
    this.enemyCars = []
    this.createEnemyCars()
  }

  createBackground() {
    const background = new Sprite( Globals.Resources.images.background.texture )
    background.width = backgroundWidth
    background.height = backgrounHeight
    this.container.addChild( background )

    const mountain = new Sprite( Globals.Resources.images.mountain.texture )
    mountain.x = mountainX
    mountain.y = mountainY
    mountain.height = mountainHeight
    mountain.width = mountainWidth
    this.container.addChild( mountain )
  }

  createRoad() {
    this.road = new Road()
    this.container.addChild( this.road.sprite )
  }

  createSurroundings() {
    this.surroundings = new Surroundings()
    this.surroundings.sprites.forEach( sprite => this.container.addChild( sprite ))
  }

  createCar() {
    this.car = new Car()
    this.container.addChild( this.car.sprite )
    this.container.interactive = true;
    this.container.on( 'pointerdown', this.onPointerDown )
    this.car.sprite.once( 'collision', async () => await this.onCollission( this ))
  }

  onPointerDown = e => {
    if ( this.stopped ) return

    const x1 = e.data.global.x, x2 = this.car.sprite.x, x3 = x2 + this.car.sprite.width
    if ( x1 < x2 || x1 > x3 ) {
      this.car = this.car.move( x1 )
      this.car.sprite.once( 'collision', async () => await this.onCollission( this ))
      this.container.addChild( this.car.sprite )
    }
  }

  async onCollission( self ) {
    self.road.sprite.stop()
    self.stopped = true
    await self.playExplosion()
  }

  async playExplosion() {
    const collisionSprite = await Explosion.create( this.car.collidedWith.position )
    collisionSprite.once( 'cars exploded', () => {
console.log( 'cars exploded' )
      this.car.collidedWith.sprite.destroy()
      this.car.sprite.destroy()
    })
    collisionSprite.onFrameChange = frameNum => {
      if ( whenCarsExploded === frameNum ) collisionSprite.emit( 'cars exploded' )
    }
    collisionSprite.onComplete = () => {
      setTimeout(() => Globals.director.start( new Scene()), restartTime )
    }
    this.container.addChild( collisionSprite )
    collisionSprite.play()
  }

  createEnemyCars() {
    const lanes = [ CarPosition.ENEMYLEFT, CarPosition.ENEMYCENTER, CarPosition.ENEMYRIGHT ]
    setInterval(() => {
      if ( !this.stopped )
        this.createEnemyCar( lanes[ parseInt( Math.random() * lanes.length )])
    }, restartTime );
  }

  createEnemyCar( position ) {
    const car = new Car( position )
    this.container.addChild( car.sprite )
    this.enemyCars.push( car )
  }

  update( dt ) {
    if ( this.stopped ) return

    this.car.update()
    this.surroundings.update( dt )
    for ( let i = 0, car; i < this.enemyCars.length; ++i ) {
      car = this.enemyCars[ i ]
      if ( car.update()) {
        this.car.checkCollision( car )
      }
      else {
        car.sprite.destroy()
        this.enemyCars.splice( i--, 1 )
      }
    }
  }
}
