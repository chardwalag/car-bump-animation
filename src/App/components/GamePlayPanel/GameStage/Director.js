
import { Container } from 'pixi.js'


export class Director {
  constructor() {
    this.container = new Container()
    this.scene = null
  }

  start( scene ) {
    if ( this.scene ) this.scene.container.destroy()
    this.scene = scene
    this.container.addChild( this.scene.container )
  }

  update( dt ) {
    if ( this.scene ) this.scene.update( dt )
  }
}
